import CodeDisplay from "./components/CodeDisplay";
import React, { useState } from 'react';
import MessagesDisplay from "./components/MessagesDisplay";
import DataDisplay from "./components/DataDisplay";
import { saveAs } from 'file-saver'; 


interface ChatData {
  role: string;
  content: string;
}



const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);
  const [dbData, setDbData] = useState<any[]>([]);

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      };

      const response = await fetch("http://localhost:8000/completions", options);
      const { gpt3Response, dbData: queriedData, error } = await response.json();

      if (error) {
        console.error(error);
        // Handle the error, if needed
        return;
      }

      console.log(gpt3Response);
      console.log(queriedData);

      const userMessage = {
        role: "user",
        content: value
      };
      setChat(oldChat => [...oldChat, gpt3Response, userMessage]);
      setDbData(queriedData || []);
    } catch (error) {
      console.error(error);
    }
  };
  const exportToCSV = () => {
    const csvData = dbData.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'queried_data.csv');
  };
  const clearChat = () => {
    setValue("");
    setChat([]);
    setDbData([]);
  };

  const filteredUserMessages = chat.filter(message => message.role === "user");
  const latestCode = chat.filter(message => message.role === "assistant").pop();

  return (
    <div className="app">
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input value={value} onChange={e => setValue(e.target.value)} />
      <CodeDisplay text={latestCode?.content || ""} />
      <DataDisplay data={dbData} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Get Query!</button>
        <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
        <button id="export-to-csv" onClick={exportToCSV}>Export to CSV</button>
      </div>
    </div>
  );
};

export default App;

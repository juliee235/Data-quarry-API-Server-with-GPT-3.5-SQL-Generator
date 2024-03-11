# Data query with GPT3.5 SQL Generator
During my internship at Krungthai Bank, I embarked on a project aimed at enhancing data accessibility and query capabilities within the organization. The primary objective of this initiative was to empower all members of the organization, irrespective of their background in data engineering or SQL proficiency, to efficiently access and extract insights from the bank's vast data repositories

## Key features of the project included:
1. User-Friendly Interface
2. Efficient SQL generator
![ภาพ](https://github.com/juliee235/Data-quarry-API-Server-with-GPT-3.5-SQL-Generator/assets/138569824/402e3aec-dc37-4172-92ca-f249f0d84f79)


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Method
1. Create React app using command npx create-react-app my-app
2. Build the app interface and config the layout on [index.ts](https://github.com/juliee235/Data-quarry-API-Server-with-GPT-3.5-SQL-Generator/blob/249d5c9dbbd7d9dc2eb196e093a5bf9c032992e5/index.ts)
3. Write a function to display the code, Data display and Message display on [CodeDisplay.tsx](src/components/CodeDisplay.tsx),[DataDisplay.tsx](src/components/DataDisplay.tsx) and [MessageDisplay.tsx](src/components/MessageDisplay.tsx)
4. Rendered components and managed state in [App.tsx](src/App.tsx). Sends a POST request to http://localhost:8000/completions with user input.Renders JSX elements including MessagesDisplay for chat history, an input field for user input, CodeDisplay for displaying code snippets, DataDisplay for showing queried data, and buttons for interaction such as "Get Query!", "Clear Chat", and "Export to CSV".
5. In the [index.ts](), receiving a POST request to "/completions", the application triggers an asynchronous function to handle the request.
#### 5.1 OpenAI Integration
  Utilizes OpenAI's GPT-3.5 Turbo model to generate SQL queries based on user prompts. It constructs a chat message with the user's input and sends it to the GPT-3 model for processing.
#### 5.2 SQL Query Processing
   Parses the GPT-3 response to extract the SQL query. It checks for the presence of a valid SQL SELECT statement and constructs a connection string for an IBM DB2 database.
#### 5.3 Response Handling
   Sends the GPT-3 response and database query results back to the client in JSON format.

## Result
Query data

![ภาพ](https://github.com/juliee235/Data-quarry-API-Server-with-GPT-3.5-SQL-Generator/assets/138569824/b9ddf683-4cd7-434d-b0c9-233fb613e1f8)

Query data with condition

![ภาพ](https://github.com/juliee235/Data-quarry-API-Server-with-GPT-3.5-SQL-Generator/assets/138569824/3a89e387-d75b-4ef1-af82-00a4f507f53e)

Join 2 tables

![ภาพ](https://github.com/juliee235/Data-quarry-API-Server-with-GPT-3.5-SQL-Generator/assets/138569824/63a742fa-3379-4453-9a58-85de53e8c203)

## Improvement
Leveraging an open-source pre-trained Transformer model for data querying can be a practical and efficient alternative to using proprietary APIs like GPT-3.5. By training the Transformer model with data from the database, including table names and column descriptions.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

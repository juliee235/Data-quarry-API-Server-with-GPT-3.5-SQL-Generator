import React from 'react';

interface DataDisplayProps {
  data: any[]; // Replace 'any' with the actual type of your queried data
}

const DataDisplay = ({ data }: DataDisplayProps) => {
  return (
    <div className="data-display">
      {data.length > 0 ? (
        <div>
          <h2>Query Results:</h2>
          <pre className="scrollable-pre">{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default DataDisplay;

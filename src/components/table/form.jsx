import React, { useState } from 'react';

import "../App/App.css"
import TransactionForm from './table';
import jsonData from './data.json';

  
function TableData() {
  const [transactionData, setTransactionData] = useState(jsonData);
  
  const tableRows = transactionData.map((info) => {
    return (
      <tr>
        <td>{info.id}</td>
        <td>{info.type}</td>
        <td>{info.amount}</td>
      </tr>
    );
  });
  
  const addRows = (data) => {
    const totaltransactions = transactionData.length;
    data.id = totaltransactions + 1;
    const updatedTransactionData = [...transactionData];
    updatedTransactionData.push(data);
    setTransactionData(updatedTransactionData);
    
  };
  
  return (
    <div>{/*
      <table id = "transactions">
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>*/}
      <TransactionForm func={addRows} />
    </div>
  );
}
  
export default TableData;
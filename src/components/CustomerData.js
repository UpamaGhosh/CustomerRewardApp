import React from "react";

const CustomerData = ({ customerData }) => {
  return (
    <tr>
      <td>{customerData.name}</td>
      <td>{customerData.month}</td>
      <td>{customerData.numTransactions}</td>
      <td>{customerData.amount}</td>
      <td>{customerData.rewardPoints}</td>
  
    </tr>
  );
};

export default CustomerData;

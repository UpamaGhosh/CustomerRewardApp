import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import CustomerData from "./components/CustomerData";
import fetch from './api/CustomerDataService';
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  const [customerData, setCustomerData] = useState([]);
  
  useEffect(() => { 
    fetch().then((data)=> {             
      //fetch data from service file and manupulate the data to display in table  
      setCustomerData(calculateCustomerData(data));
    });
   
  },[])
  return (
    <div className="app-container">
      <ErrorBoundary>
        <h1>Customer Reward Points Table</h1>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Month</th>
              <th>Num of Transactions</th>
              <th>Total Amount</th>
              <th>Reward Points</th>
             
            </tr>
          </thead>
          <tbody>
            {customerData.map((customerData) => (
              <Fragment>
                  <CustomerData
                    customerData={customerData}
                   
                  />
              </Fragment>
            ))}
          </tbody>
        </table>
        </ErrorBoundary> 
    </div>
  );
};

//Function to calculate reward points for customers
function calculateCustomerData(customerData) {
  const pointsPerTransaction = customerData.map( transaction => {
    let rewardPoints = calulateRewardPonits(transaction.amt);
    let amount = transaction.amt;
    const month = new Date(transaction.transactionDate).getMonth();
    return {...transaction, rewardPoints, amount, month};
  });
  let byCustomer = {};
  let totPointsByCustomer = {};
  pointsPerTransaction.forEach(pointsPerTransaction => {
    let {custid, name, month, rewardPoints, amount, transactionDate} = pointsPerTransaction;   
    if (!byCustomer[custid]) {
      byCustomer[custid] = [];      
    }    
    if (!totPointsByCustomer[custid]) {
      //Initialize total points per customer
      totPointsByCustomer[custid] = 0;
    }
   
    totPointsByCustomer[custid] += rewardPoints;
    //Calculate total data per month for each customer
    if (byCustomer[custid][month]) {
      byCustomer[custid][month].rewardPoints += rewardPoints;
      byCustomer[custid][month].amount += amount;
      byCustomer[custid][month].monthNumber = month;
      byCustomer[custid][month].numTransactions++;      
    } else {
      byCustomer[custid][month] = {
        custid,
        name,
        month:new Date(transactionDate).toLocaleString('en-us',{month:'long'}),
        numTransactions: 1,   
        amount,     
        rewardPoints
      }
    }    
  });
  
  return  customerDataSummary(byCustomer, totPointsByCustomer);
}
//function
function customerDataSummary(byCustomer, totPointsByCustomer){
  let customerData = [];
  for (var customerKey in byCustomer) {    
    byCustomer[customerKey].forEach(custRow=> {
      custRow.totPointsByCustomer = totPointsByCustomer[customerKey];
      customerData.push(custRow);
    });    
  }
  return customerData;
}

//Function to calculate reward ponits
function calulateRewardPonits(amount){
  let points = 0;
  if (amount > 100)   
    points = 2*(amount-100)+50;
  else if (amount > 50 && amount<=100) 
    points = amount - 50;      
  else{
    points = 0;
  }
  return points;
}


export default App;

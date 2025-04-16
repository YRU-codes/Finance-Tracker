import React from 'react'
import './TransactionList.css'
const TransactionList = ({ transactions, onEdit, onDelete }) => {
    if(transactions.length === 0 ){
        return <p className="no-transactions">No transactions yet.</p>;
    }
  return (
    <div className="transaction-list">
      {transactions.map((txn) => (
        <div key={txn._id} className="transaction-item">
          <div>
            <p>{txn?.category}</p>
            <p className="txn-desc">{txn.description}</p>
            <p className="txn-date">{new Date(txn.date).toLocaleDateString()}</p>
          </div>
          <div className="txn-right">
            <span className="txn-amount">₹{txn.amount}</span>
            <button onClick={() => onEdit(txn)} className="btn edit">Edit</button>
            <button onClick={() => onDelete(txn._id)} className="btn delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList

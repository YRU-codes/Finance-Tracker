import React from 'react'
import './DashboardSummary.css';
const DashboardSummary = ({transactions}) => {

    if(transactions.length === 0 ){
        return;
    }

    const total = transactions.reduce((sum, txn) => sum + Number(txn.amount), 0);

    const categoryTotals = transactions.reduce((acc, txn) => {
    const cat = txn.category || "Uncategorized";
        acc[cat] = (acc[cat] || 0) + Number(txn.amount);
        return acc;
    }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="dashboard-cards">
      <div className="card total">
        <h4>Total Expenses</h4>
        <p>₹ {total.toFixed(2)}</p>
      </div>

      <div className="card category">
        <h4>Top Categories</h4>
        <ul>
          {topCategories.map(([cat, amt]) => (
            <li key={cat}>
              {cat}: ₹ {amt.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="card recent">
        <h4>Recent Transactions</h4>
        <ul>
          {recentTransactions.map((txn) => (
            <li key={txn.id}>
              {txn.date} - ₹ {txn.amount} ({txn.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DashboardSummary

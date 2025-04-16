import React from 'react';
import './CategoryPieChart.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f",
  "#ffbb28", "#0088fe", "#d0ed57", "#a4de6c", "#ff8042"
];

const CategoryPieChart = ({budgets ,transactions}) => {
    if(transactions.length === 0 ){
        return;
    }
    const categoryTotals = transactions.reduce((acc, txn) => {
        const cat = txn.category || "Uncategorized";
        acc[cat] = (acc[cat] || 0) + Number(txn.amount);
        return acc;
      }, {});
    
      const data = Object.entries(categoryTotals).map(([category, total]) => ({
        name: category,
        value: total
      }));

      const budgetData = Object.entries(budgets).map(([category, amount]) => ({
        name: category,
        value: amount,
      }));

  return (
    <div className="pie-chart-section">
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Budget vs Actual Spending</h3>
      <div className="pie-row">
        <div className="pie-container">
          <h4 style={{ textAlign: "center" }}>Budget</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`budget-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-container">
          <h4 style={{ textAlign: "center" }}>📊 Category-wise Spending</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`actual-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default CategoryPieChart

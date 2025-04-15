import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f",
  "#ffbb28", "#0088fe", "#d0ed57", "#a4de6c", "#ff8042"
];

const CategoryPieChart = ({transactions}) => {
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

  return (
    <div >
      <h3>📊 Category-wise Expenses</h3>
      <PieChart width={320} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" />
      </PieChart>
    </div>
  )
}

export default CategoryPieChart

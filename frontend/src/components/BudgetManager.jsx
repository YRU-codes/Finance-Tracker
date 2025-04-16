import React, { useState } from 'react'
import './BudgetManager.css'

const BudgetManager = ({budgets, setBudgets}) => {
    const [newBudgets, setNewBudgets] = useState(budgets);

  const handleChange = (category, value) => {
    setNewBudgets({
      ...newBudgets,
      [category]: value,
    });
  };

  const handleSave = () => {
    setBudgets(newBudgets);
    alert("Budgets updated!");
  };

  const allCategories = Object.keys(budgets);
  return (
    <div className="budget-manager">
      <h3>Set Monthly Budgets</h3>
      {allCategories.map((cat) => (
        <div key={cat} className="budget-row">
          <label>{cat}</label>
          <input
            type="number"
            value={newBudgets[cat]}
            onChange={(e) => handleChange(cat, Number(e.target.value))}
          />
        </div>
      ))}
      <button onClick={handleSave}>Save Budgets</button>
    </div>
  )
}

export default BudgetManager

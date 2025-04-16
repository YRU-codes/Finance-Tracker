import { useState } from 'react';
import './App.css'
import Transactionform from './components/Transactionform';
import TransactionList from './components/TransactionList';
import CategoryPieChart from './components/CategoryPieChart';
import DashboardSummary from './components/DashboardSummary';
import BudgetManager from './components/BudgetManager';
import Model from './components/Model';
function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgets, setBudgets] = useState({
    Food: 2000,
    Shopping: 3000,
    Travel: 1500,
  });

  //Add and Update transaction
  const handleSave = (transaction) => {
    if (transaction.id) {
      // Edit mode
      console.log(transaction.id);
      console.log(transactions);
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? transaction : t))
      );
    } else {
      // Add mode
      const newTransaction = {
        ...transaction,
        id: crypto.randomUUID(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
    setEditingTransaction(null); 
  };

  // Edit transaction
  const handleEdit = (txn) => {
    setEditingTransaction(txn);
  };

  // Delete transaction
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };
  
  return (
    <div className='dashboard'>
      <div className='left-panel'>
        <Transactionform onSave={handleSave} editingTransaction = {editingTransaction}/>
        <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete}/>
        <DashboardSummary transactions={transactions}/>
      </div>
      <div className='right-panel'>
        <button className='model-btn' onClick={() => setShowBudgetModal(true)}>⚙️ Set Budgets</button>
        <Model isOpen={showBudgetModal} onClose={() => setShowBudgetModal(false)}>
          <BudgetManager budgets = {budgets} setBudgets = {setBudgets}/>
        </Model>
        <CategoryPieChart budgets = {budgets} transactions={transactions}/>
      </div>
     
    </div>
  )
}

export default App

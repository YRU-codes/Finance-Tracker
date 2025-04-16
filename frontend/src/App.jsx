import { useEffect, useState } from 'react';
import './App.css'
import Transactionform from './components/Transactionform';
import TransactionList from './components/TransactionList';
import CategoryPieChart from './components/CategoryPieChart';
import DashboardSummary from './components/DashboardSummary';
import BudgetManager from './components/BudgetManager';
import Model from './components/Model';
import axios from 'axios';
function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgets, setBudgets] = useState({
    Food: 2000,
    Shopping: 3000,
    Travel: 1500,
  });

  //fetch transactions from DB
  const fetchTransactions = async () =>{
    const resp = await axios.get('http://localhost:5000/api/transactions');
    setTransactions(resp.data);
  }

  useEffect(()=>{
    fetchTransactions();
  },[])

  //Add and Update transaction
  const handleSave = async (transaction) => {
    if (transaction._id) {
      // Edit mode
      console.log(transaction);
      const resp = await axios.put(`http://localhost:5000/api/transactions/${transaction._id}`, transaction);
      if(resp.data){
        fetchTransactions();
      }
    } else {
      // Add mode
      const resp = await axios.post('http://localhost:5000/api/transactions', transaction);
      if(resp.data){
        fetchTransactions();
      }
    }
    setEditingTransaction(null);
  };

  // Edit transaction
  const handleEdit = (txn) => {
    setEditingTransaction(txn);
  };

  // Delete transaction
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const resp = await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      console.log(resp);
      if(resp.status === 200){
        fetchTransactions();
      }
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

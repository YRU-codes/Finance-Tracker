import React from "react";
import './Transactionform.css'
import { useState, useEffect } from "react";

const CATEGORY = ["Food", "Transport", "Shopping", "Utilities", "Health", "Entertainment", "Rent", "Other"];

const Transactionform = ({ onSave, editingTransaction }) => {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    category : "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setForm(editingTransaction);
    }
  }, [editingTransaction]);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Enter a valid amount";
    
    if (!form.date) {
        newErrors.date = "Date is required";
      } else {
        const selectedDate = new Date(form.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
          newErrors.date = "Date cannot be in the future";
        }
      }

    if(!form.category)
      newErrors.category = "Please select the category";

    if (!form.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    setForm({
      amount: "",
      date: "",
      category:"",
      description: "",
    });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transaction-form"
    >
      <div>
        <label>Amount</label>
        <input type="number" value={form.amount} name="amount" onChange={handleForm}/>
        {errors.amount && <span className="error">{errors.amount}</span>}
      </div>
      <div>
        <label>Date</label>
        <input type="date" value={form.date} name="date" onChange={handleForm}/>
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      <div>
        <label>Category</label>
        <select value={form.category} onChange={handleForm} name="category">
        <option value="">-- Select Category --</option>
        {CATEGORY.map(
          (cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          )
        )}
      </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={form.description} name="description" onChange={handleForm}/>
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <button type="submit" >
        {editingTransaction ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
};

export default Transactionform;

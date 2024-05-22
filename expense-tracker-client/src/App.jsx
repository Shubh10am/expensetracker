import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: 0,
  });

  useEffect(() => {
    axios.get('/expenses').then((response) => {
      setExpenses(response.data);
    });
  }, []);

  const handleAddExpense = () => {
    axios.post('/expenses', newExpense).then((response) => {
      setExpenses([...expenses, response.data]);
      setNewExpense({ category: '', amount: 0 });
    });
  };

  return (
    <div className="App">
      <h1>Monthly Expense Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.category} - ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

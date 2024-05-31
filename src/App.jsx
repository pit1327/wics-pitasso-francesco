import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const addEntry = () => {
    if (label && amount && date) {
      const newEntry = { label, amount: parseFloat(amount), date };
      setEntries([...entries, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setLabel('');
      setAmount('');
      setDate('');
    }
  };

  const totalIncome = entries.reduce((sum, entry) => entry.amount > 0 ? sum + entry.amount : sum, 0);
  const totalExpense = entries.reduce((sum, entry) => entry.amount < 0 ? sum + entry.amount : sum, 0);
  const totalBalance = totalIncome + totalExpense;

  return (
    <div className="App">
      <div className="input-container">
        <h2>Aggiungi</h2>
        <label>
          Etichetta:
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
        </label>
        <label>
          Importo:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Data:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button onClick={addEntry}>Aggiungi</button>
      </div>
      <div className="summary-container">
        <div className="entries-container">
          <h2>Riepilogo Movimenti</h2>
          {entries.map((entry, index) => (
            <div key={index} className="entry">
              {entry.amount} € {entry.label} {new Date(entry.date).toLocaleDateString()}
            </div>
          ))}
          <button onClick={() => {}}>+</button>
        </div>
        <div className="total-container">
          <h2>Totale Movimenti</h2>
          <div>Entrate: {totalIncome} €</div>
          <div>Uscite: {totalExpense} €</div>
          <div className="balance">Saldo: {totalBalance} €</div>
        </div>
      </div>
    </div>
  );
};

export default App;

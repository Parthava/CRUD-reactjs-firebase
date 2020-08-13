import React from 'react';
//import logo from './logo.svg';
import './App.css';
import database from './Firebase';
import Record from './Record';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <h2>CRUD app</h2>
      <Record />
      <Form />
    </div>
  );
}

export default App;

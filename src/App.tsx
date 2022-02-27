import React from 'react';
import './App.css';
import Contact from './components/ListContact';
import AddContact from './components/AddContact';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rogger's Contact</h1>
        <AddContact/>
        <Contact/>
      </header>
     
    </div>
  );
}

export default App;

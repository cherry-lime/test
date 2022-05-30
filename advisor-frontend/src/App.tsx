import React from 'react';
import logo from '/src/logo.svg';
import './App.css';
import {Greetings} from './components/SampleText/SampleText';
import {Button} from './components/Button/Button';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
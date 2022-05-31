import React from 'react';
import logo from '/src/logo.svg';
import './App.css';
import {Greetings} from './components/SampleText/SampleText';
import {Button} from './components/Button/Button';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
    </div>
  );
}

export default App;
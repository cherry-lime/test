import React from 'react';
import logo from '/src/logo.svg';
import './App.css';
import {Greetings} from './components/SampleText/SampleText';
import {Button} from './components/Button/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World
        <Greetings name = "This is a test to test a component"></Greetings>
        <Button name = "Buttontext"></Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
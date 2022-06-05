import React from 'react';
import logo from './logo.svg';
import './App.css';
import Greetings from './components/SampleText/SampleText';
import Button from './components/Button/Button';

import AllGrid from './components/Grids/Specific/AllGrid';
import ExampleGrid from './components/Grids/Specific/ExampleGrid';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        Hello World
        <Greetings name='This is a test to test a component' />
        <Button name='Buttontext' />
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <AllGrid />
      </header>
    </div>
  );
}

export default App;

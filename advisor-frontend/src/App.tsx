import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Greetings from "./components/SampleText/SampleText";
import Button from "./components/Button/Button";
import ButtonRegular from "./components/ButtonRegular/ButtonRegular";
import ButtonInverted from "./components/ButtonInverted/ButtonInverted";
import Checkpoint from "./components/Checkpoint/Checkpoint";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonRegular name = "Regular ING Bold"/>
        <ButtonInverted name2 = "Inverted ING Bold"/>
        <Checkpoint description = "Checkpoint Description"/>
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

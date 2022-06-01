import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ButtonRegular from "./components/ButtonRegular/ButtonRegular";
import ButtonInverted from "./components/ButtonInverted/ButtonInverted";
import Checkpoint from "./components/Checkpoint/Checkpoint";
import TextfieldEdit from "./components/TextfieldEdit/TextfieldEdit";
import TextfieldRead from "./components/TextfieldRead/TextfieldRead";
import {Stack} from '@mui/material';
import Textbox from "./components/Textbox/Textbox";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing = {3}>
          <ButtonRegular name = "Regular ING Bold"/>
          <ButtonInverted name2 = "Inverted ING Bold"/>
          <Checkpoint description = "Checkpoint Description"/>
          <TextfieldEdit message = "Textfield Title Editable"/>
          <TextfieldRead message2 = "Textfield Title Read-only"/>
          <Textbox/>
        </Stack>
        
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

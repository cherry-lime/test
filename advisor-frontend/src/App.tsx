import logo from "./logo.svg";
import "./App.css";
import ButtonRegular from "./components/ButtonRegular/ButtonRegular";
import ButtonInverted from "./components/ButtonInverted/ButtonInverted";
import Checkpoint from "./components/Checkpoint/Checkpoint";
import TextfieldEdit from "./components/TextfieldEdit/TextfieldEdit";
import TextfieldRead from "./components/Textfield/Textfield";
import {Stack} from '@mui/material';

const longtextteststring = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing = {3}>
          <ButtonRegular name = "Regular ING Bold"/>
          <ButtonInverted name2 = "Inverted ING Bold"/>
          <Checkpoint description = "Checkpoint Description"/>
          <TextfieldEdit bodytext={longtextteststring}/>
          <TextfieldRead bodytext2={longtextteststring}/>
          <p></p>
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

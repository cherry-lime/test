import { Stack } from "@mui/material";
import logo from "./logo.svg";
import "./App.css";
import ButtonRegular from "./components/ButtonRegular/ButtonRegular";
import ButtonInverted from "./components/ButtonInverted/ButtonInverted";
import Checkpoint from "./components/Checkpoint/Checkpoint";
import TextfieldEdit from "./components/TextfieldEdit/TextfieldEdit";
import Textfield from "./components/Textfield/Textfield";
import PageCard from "./components/PageCard/PageCard";

//  this is a test string to be used for several components
const longtextteststring =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={3}>
          {/* all components are listed once as an example with parameters if applicable */}
          <ButtonRegular name="Regular Button" />
          <ButtonInverted name2="Inverted Button" />
          <Checkpoint description="Checkpoint Description" />
          <TextfieldEdit bodytext={longtextteststring} />
          <Textfield bodytext2={longtextteststring} />
          <p />
        </Stack>
        <PageCard bodytext3={longtextteststring} />
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

import { Stack } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import testimageFigma from "./components/PageCard/testimageFigma.png";
import logo from "./logo.svg";
import "./App.css";
import ButtonRegular from "./components/ButtonRegular/ButtonRegular";
import ButtonInverted from "./components/ButtonInverted/ButtonInverted";
import Checkpoint from "./components/Checkpoint/Checkpoint";
import TextfieldEdit from "./components/TextfieldEdit/TextfieldEdit";
import Textfield from "./components/Textfield/Textfield";
import PageCard from "./components/PageCard/PageCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={3}>
          {/* all components are listed once as an example with parameters if applicable */}
          <ButtonRegular text="Regular Button" />
          <ButtonInverted text="Inverted Button" />
          <Checkpoint description="Checkpoint Description" />
          <TextfieldEdit text="Here is some text that can be edited" />
          <Textfield text="Here is some text that can not be edited" />
          <p />
        </Stack>
        <PageCard
          bodyText="This is a description for the home page card"
          headerText="Title"
          cardHeight={125}
          icon={<AssessmentIcon color="primary" fontSize="small" />}
          image={testimageFigma}
          isImageLeft
          isImageRight
        />
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

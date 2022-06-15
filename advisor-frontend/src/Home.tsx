import ExampleButton from "./components/ExampleButton/ExampleButton";
import Greetings from "./components/SampleText/SampleText";
import logo from "./logo.svg";
import "./App.css";

function UserInterface() {
  return (
    <div className="App-header">
      <h1>This is the home page</h1>
      Hello World
      <Greetings name="This is a test to test a component" />
      <ExampleButton name="Buttontext" />
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
    </div>
  );
}

export default UserInterface;

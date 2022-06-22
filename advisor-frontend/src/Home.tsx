import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExampleButton from "./components/ExampleButton/ExampleButton";
import Greetings from "./components/SampleText/SampleText";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { resetUser, setUserID } from "./app/userDataSlice";

function UserInterface() {
  const { userID, userRole } = useSelector(
    (state: RootState) => state.userData
  );
  const dispatch = useDispatch();
  return (
    <div className="App-header">
      <h1>This is the home page with {userID}</h1>
      <h2> I am {userRole}</h2>
      Hello World
      <Greetings name="This is a test to test a component" />
      <ExampleButton name="Buttontext" />
      <button type="button" onClick={() => dispatch(setUserID("u1948234"))}>
        {" "}
        click to change ID
      </button>
      <button type="button" onClick={()=> dispatch(resetUser())}> reset</button>
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExampleButton from "./components/ExampleButton/ExampleButton";
import Greetings from "./components/SampleText/SampleText";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { setUserId } from "./app/userDataSlice";

function UserInterface() {
  const { userId, userRole } = useSelector(
    (state: RootState) => state.userData
  );
  const dispatch = useDispatch();
  return (
    <div className="App-header">
      <h1>This is the home page with {userId}</h1>
      <h2> I am {userRole}</h2>
      Hello World
      <Greetings name="This is a test to test a component" />
      <Link to="/user">
        <ExampleButton name="GOTO User" />{" "}
      </Link>
      <ExampleButton name="Buttontext" />
      <button type="button" onClick={() => dispatch(setUserId("u199999"))}>
        click to change ID
      </button>
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

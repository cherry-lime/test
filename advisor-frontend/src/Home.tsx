import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExampleButton from "./components/ExampleButton/ExampleButton";
import Greetings from "./components/SampleText/SampleText";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { resetUser, setUserId } from "./app/userDataSlice";
import { authProfile, useLogin, useLogout, useRegister } from "./api/LoginAPI";

function UserInterface() {
  const { userId, userRole } = useSelector(
    (state: RootState) => state.userData
  );
  // Import login API calls
  const login = useLogin();
  const auth = authProfile();
  const register = useRegister();
  const logout = useLogout();
  const dispatch = useDispatch();
  return (
    <div className="App-header">
      <h1>This is the home page with ID: {userId}</h1>
      <h2> I am role: {userRole}</h2>
      Hello World
      <Greetings name="This is a test to test a component" />
      <Link to="/user">
        <ExampleButton name="GOTO User" />{" "}
      </Link>
      <ExampleButton name="Buttontext" />
      <button type="button" onClick={() => dispatch(setUserId("u199999"))}>
        click to change ID
      </button>
      <button
        type="button"
        onClick={() => {
          auth.mutate();
          login.mutate({
            username: "bent_respect_hurt",
            password: "58f1928f-3b0c-40e7-9e98-a4dc22908153",
          });
        }}
      >
        Login
      </button>
      <button type="button" onClick={() => auth.mutate()}>
        Authenticate
      </button>
      <button
        type="button"
        onClick={() => {
          logout.mutate();
          dispatch(resetUser());
        }}
      >
        Logout now
      </button>
      <button type="button" onClick={() => register.mutate({ role: "USER" })}>
        Register new
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

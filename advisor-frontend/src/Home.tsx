import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExampleButton from "./components/ExampleButton/ExampleButton";
import Greetings from "./components/SampleText/SampleText";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { resetUser, setUserID } from "./app/userDataSlice";
import { authProfile, useLoginTwo, userLogout } from "./app/loginAPI";

function UserInterface() {
  const { userID, userRole } = useSelector(
    (state: RootState) => state.userData
  );
  const login = useLoginTwo();
  const auth = authProfile();
  const logout = userLogout();
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

      <button
        type="button"
        onClick={() =>
          login.mutate({
            username: "birth_taken",
            password: "994c801d-e32b-4281-9e83-f7937b4a1bff",
          })
        }
      >
        Login
      </button>
      <button type="button" onClick={() => auth.mutate()}> Authenticate</button>
      <button type="button"onClick={() => logout.mutate()}> Logout now</button>
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

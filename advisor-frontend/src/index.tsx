import React, { StrictMode } from "react";
// import ReactDOM from 'react-dom/client';
import "./index.css";
import createRoot from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!);

// const root = ReactDOM.createRoot(
// document.getElementById('root') as HTMLElement
// );
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

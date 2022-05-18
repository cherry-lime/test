import React from 'react';
import './index.css';
import App from './App';
import {createRoot} from 'react-dom/client';
import { StrictMode } from 'react';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerAllCommands } from '../core/commands';
import '../styles/base/global.css';

// Initialize CLI commands registry
registerAllCommands();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

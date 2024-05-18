import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ResetCss } from './ResetCss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResetCss />
    <App />
  </React.StrictMode>
);

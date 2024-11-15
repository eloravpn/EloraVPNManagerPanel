import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './assets/css/material-icons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mui from './Mui';
import ConfigProvider from 'configProvider';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Mui>
        <ConfigProvider />
      </Mui>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

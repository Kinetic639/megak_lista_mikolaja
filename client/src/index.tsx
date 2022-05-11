import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import 'normalize.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {BrowserRouter as Router} from 'react-router-dom'
import CssBaseline from "@mui/material/CssBaseline";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
        <Router>
            <CssBaseline/>
            <App/>
        </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

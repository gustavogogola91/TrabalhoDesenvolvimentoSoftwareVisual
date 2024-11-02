import { createRoot } from "react-dom/client";
import App from "./App";
import React from 'react';
import { ReactDOM } from "react";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);
//const rootDom = ReactDOM.createRoot(container);
//rootDom.render(<BrowserRouter><App/></BrowserRouter>);
root.render(<BrowserRouter><App/></BrowserRouter>);


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export { default as Navigation } from "./components/Navigation/Navigation";
export { default as Footer } from "./components/Footer/Footer";
export { default as Home } from "./components/Dashboard/Dashboard";
export { default as About } from "./components/About/About";
export { default as Contact } from "./components/Contact/Contact";

//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
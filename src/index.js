import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment/locale/fr";
import "./Components/Pages/Details/Details.scss";
import "./Reset/Reset.scss";
import "./Components/Layout/Header/Header.scss";
import "./Components/Layout/Footer/Footer.scss";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

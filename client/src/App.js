import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <div className="App">
        <Navbar />
        <Landing />
      </div>
    </Fragment>
  </Router>
);

export default App;

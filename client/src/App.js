import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/layout/About";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dairy from "./components/dairy/Dairy";
import UserDairy from "./components/dairy/UsersDairy";
import Posts from "./components/posts/Posts";
import CreatePost from "./components/posts/CreatePost";
import EditPost from "./components/posts/EditPost";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditStatus from "./components/dairy/EditStatus";
import SetStatus from "./components/dairy/SetStatus";

//Redux imports
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/diary" component={Dairy} />
            <PrivateRoute exact path="/edit-status" component={EditStatus} />
            <PrivateRoute exact path="/create-post" component={CreatePost} />
            <PrivateRoute exact path="/user/:id" component={UserDairy} />
            <PrivateRoute exact path="/post/:id" component={EditPost} />
            <Route exact path="/set-status" component={SetStatus} />
            <Route exact path="/explore" component={Posts} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

import React from "react";
import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AlwaysSafe from "./components/always-safe";
import ArrangeYourself from "./components/arrange-yourself/arrange-yourself";
import Home from "./components/Home";
import StartPage from "./components/StartPage";
import { history } from "./store/helpers";
function App() {
  return (
    <Router history={history}>
      <div className="content">
        <Switch>
          <Route exact path="/" component={ArrangeYourself} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/alwaysSafe" component={AlwaysSafe} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/startPage" component={StartPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

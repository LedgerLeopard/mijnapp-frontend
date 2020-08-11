import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AlwaysSafe from "./components/always-safe"
import ArrangeYourself from "./components/arrange-yourself/arrange-yourself";
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Switch>
          <Route exact path="/" component={ArrangeYourself} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/alwaysSafe" component={AlwaysSafe} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

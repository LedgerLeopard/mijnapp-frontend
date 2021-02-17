import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import ContextProvider from './context/Context';
import './App.css';
import Steps from './components/steps/Steps';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';


const App = () => {
    return (
        <div className="app-container">
            <Router>
                <ContextProvider>
                    <Switch>
                        <Route path="/steps" component={Steps}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Layout}/>
                        <Redirect to="/steps"/>
                    </Switch>
                </ContextProvider>
            </Router>
        </div>
    );
};

export default App;

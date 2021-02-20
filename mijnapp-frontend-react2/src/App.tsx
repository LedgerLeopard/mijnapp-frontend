import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import ContextProvider from './context/Context';
import './App.css';
import Steps from './components/Steps/Steps';
import Login from './components/Login/Login';
import PrivateRouter from './PrivateRouter';
import Main from './components/Main/Main';


const App = () => {
    return (
        <div className="app-container">
            <Router>
                <ContextProvider>
                    <Switch>
                        <Route path="/steps" component={Steps}/>
                        <Route path="/login" component={Login}/>
                        <PrivateRouter path="/main" component={Main}/>
                        <Redirect to="/steps"/>
                    </Switch>
                </ContextProvider>
            </Router>
        </div>
    );
};

export default App;

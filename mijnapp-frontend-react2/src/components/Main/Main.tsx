import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Search from './Search/Search';


const Main = () => {

    return (
        <Switch>
            <Route path='/main/dashboard' component={Dashboard}/>
            <Route path='/main/search' component={Search}/>
            <Redirect from='/main' to='/main/dashboard'/>
        </Switch>
    );
};

export default Main;

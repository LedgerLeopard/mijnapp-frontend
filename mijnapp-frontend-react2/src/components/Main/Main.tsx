import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import PersonalData from './PersonalData/PersonalData';
import Search from './share/Search/Search';
import SharedDataList from './SharedData/SharedDataList';
import Success from './share/Success/Success';


const Main = () => {
    return (
        <>
            <Switch>
                <Route path='/main/dashboard' component={Dashboard}/>
                <Route path='/main/personal' component={PersonalData}/>
                <Route path='/main/share' component={SharedDataList}/>
                <Redirect from='/main' to='/main/dashboard'/>
            </Switch>
            <Search/>
            <Success/>
        </>
    );
};

export default Main;

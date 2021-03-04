import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import PersonalData from './PersonalData/PersonalData';
import Search from './share/Search/Search';
import SharedInfoList from './SharedInfo/SharedInfoList';
import Success from './share/Success/Success';
import CreatingSharedInfo from './share/CreatingSharedInfo/CreatingSharedInfo';
import {inject, observer} from 'mobx-react';
import Stores from '../../models/Stores';
import SharedDataSingle from './SharedInfo/SharedInfoSingle';


const Main =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore}))
    (observer(({popupUiStore}: Stores) => {
        return (
            <>
                <Switch>
                    <Route path='/main/dashboard' component={Dashboard}/>
                    <Route path='/main/personal' component={PersonalData}/>
                    <Route exact path='/main/share' component={SharedInfoList}/>
                    <Route exact path='/main/share/:id' component={SharedDataSingle}/>
                    <Redirect from='/main' to='/main/dashboard'/>
                </Switch>
                {popupUiStore.destroySearch.get() && <Search/>}
                {popupUiStore.destroySuccess.get() && <Success/>}
                {popupUiStore.destroyCreateSharedData.get() && <CreatingSharedInfo/>}
            </>
        );
    }));

export default Main;

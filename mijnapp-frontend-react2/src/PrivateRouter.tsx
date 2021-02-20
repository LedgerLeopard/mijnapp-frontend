import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {inject, Observer} from 'mobx-react';
import Loader from './components/ui/Loader';
import Stores from './models/Stores';


const PrivateRouter =
    inject((stores: Stores) => ({authStore: stores.authStore}))
    (({component: Component, authStore, ...rest}: any) => {
        useEffect(() => authStore.checkToken(), []);

        return <Route {...rest} render={props =>
            <Observer>{() =>
                authStore.isLoading.get()
                    ? <Loader/>
                    : authStore.token.get()
                    ? <Component {...props}/>
                    : <Redirect to={'/login/signIn'}/>}
            </Observer>
        }/>;
    });

export default PrivateRouter;

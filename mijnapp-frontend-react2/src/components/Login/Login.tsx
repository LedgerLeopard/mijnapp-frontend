import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LockScreen from './pages/LockScreen/LockScreen';
import VariantLogin from './pages/VarianLogin/VariantLogin';
import SignIn from './pages/SignIn/SignIn';


const Login = () => {

    return (
        <Switch>
            <Route exact path='/login/lock-screen' component={LockScreen}/>
            {/*<Route exact path='/login/variant-login' component={VariantLogin}/>*/}
            {/*<Route exact path='/login/signin' component={SignIn}/>*/}
            <Redirect from='/login' to='/login/lock-screen'/>
        </Switch>
    );
};

export default Login;


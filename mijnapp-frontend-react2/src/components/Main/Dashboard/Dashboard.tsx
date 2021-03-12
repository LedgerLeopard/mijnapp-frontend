import React from 'react';
import {makeStyles} from '@material-ui/core';
import Header from '../../ui/Header';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {colors} from '../../../assets/colors';
import TabBar from '../share/TabBar';
import Start from './pages/Start';
import Notification from './pages/Notification';
import Settings from './pages/Settings';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import MatIconButton from '../../ui/MatIconButton';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '60px 1fr 84px'
    },
    wrapper: {
        height: '100%',
        padding: '15px',
        boxSizing: 'border-box',
        overflow: 'auto',
        backgroundColor: colors.background
    },
    avatarButton: {
        height: '32px',
        width: '32px',
        padding: 0,
        borderRadius: '50%',
        backgroundColor: colors.white,
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: '100%',
        objectFit: 'contain',
    }
});

const Dashboard =
    inject((stores: Stores) => ({authStore: stores.authStore, uiStore: stores.uiStore}))
    (observer(({authStore, uiStore}: Stores) => {
        const classes = useStyles();
        const history = useHistory();

        const goToPersonalData = () => history.push('/main/personal');

        return (
            <div className={classes.root}>
                <Header label={uiStore.dashboardHeader.get()}
                        endComponent={
                            <MatIconButton customClasses={classes.avatarButton}
                                           label={<img className={classes.img} src={`${authStore.user.avatar}`} alt='Avatar'/>}
                                           onClick={goToPersonalData}/>
                        }/>
                <div className={classes.wrapper}>
                    <Switch>
                        <Route exact path='/main/dashboard/start' component={Start}/>
                        <Route exact path='/main/dashboard/notification' component={Notification}/>
                        <Route exact path='/main/dashboard/settings' component={Settings}/>
                        <Redirect from='/main/dashboard' to='/main/dashboard/start'/>
                    </Switch>
                </div>
                <TabBar/>
            </div>
        );
    }));


export default Dashboard;

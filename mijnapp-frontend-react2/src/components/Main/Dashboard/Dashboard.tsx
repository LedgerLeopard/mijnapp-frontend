import React from 'react';
import {makeStyles} from '@material-ui/core';
import Header from '../../ui/Header';
import {Redirect, Route, Switch} from 'react-router-dom';
import {colors} from '../../../assets/colors';
import TabBar from '../../TabBar/TabBar';
import Empty from '../../Empty';
import Start from './pages/Start';
import {inject} from 'mobx-react';
import Stores from '../../../models/Stores';
import {useTranslation} from 'react-i18next';
import MatIconButton from '../../ui/MatIconButton';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '60px 1fr 84px'
    },
    wrapper: {
        height: '100%',
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
    inject((stores: Stores) => ({authStore: stores.authStore}))
    (({authStore}: Stores) => {
        const classes = useStyles();
        const {t} = useTranslation();

        return (
            <div className={classes.root}>
                <Header label={t('main.dashboard.header') + authStore.user.firstName}
                        button={
                            <MatIconButton customClasses={classes.avatarButton}
                                           label={<img className={classes.img} src={`${authStore.user.avatar}`} alt='Avatar'/>}/>
                        }/>
                <div className={classes.wrapper}>
                    <Switch>
                        <Route exact path='/main/dashboard/start' component={Start}/>
                        <Route exact path='/main/dashboard/notification' component={Empty}/>
                        <Route exact path='/main/dashboard/settings' component={Empty}/>
                        <Redirect from='/main/dashboard' to='/main/dashboard/start'/>
                    </Switch>
                </div>
                <TabBar/>
            </div>
        );
    });


export default Dashboard;

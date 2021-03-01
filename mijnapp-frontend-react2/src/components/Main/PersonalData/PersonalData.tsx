import React from 'react';
import Header from '../../ui/Header';
import MatIconButton from '../../ui/MatIconButton';
import {useTranslation} from 'react-i18next';
import {List, ListItem, makeStyles, Paper} from '@material-ui/core';
import {colors} from '../../../assets/colors';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '78px 1fr',
    },
    wrapper: {
        height: '100%',
        overflow: 'auto',
        boxSizing: 'border-box',
        padding: '24px 15px 15px 15px',
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
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '16px'
    },
    content: {
        maxWidth: '1000px',
        margin: 'auto'
    },
    paper: {
        borderRadius: '8px',

        '& .MuiList-root': {
            padding: 0,
        }
    },
    listItem: {
        height: '72px',
        display: 'block'
    },
    field: {
        margin: 'auto'
    },
    header: {
        fontSize: '14px',
        color: colors.grey,
        margin: '6px 0',
    },
    subheader: {
        fontSize: '16px',
        color: colors.black,
        margin: '6px 0',
    }
});

const PersonalData =
    inject((stores: Stores) => ({authStore: stores.authStore}))
    (observer(({authStore}: Stores) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const history = useHistory();

        const goBack = () => {
            history.push('/main/dashboard/start');
        };

        return (
            <div className={classes.root}>
                <Header label={authStore.user.firstName + ' ' + authStore.user.lastName}
                        backButtonLabel={t('main.personalData.header')}
                        backButtonAction={goBack}
                        endComponent={
                            <MatIconButton customClasses={classes.avatarButton}
                                           label={<img className={classes.img} src={`${authStore.user.avatar}`} alt='Avatar'/>}/>
                        }/>
                <div className={classes.wrapper}>
                    <div className={classes.content}>
                        <div className={classes.title}>{t('main.personalData.title')}</div>
                        <Paper className={classes.paper}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.firstName')}</div>
                                    <div className={classes.subheader}>{authStore.user.firstName}</div>
                                </ListItem>

                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.lastName')}</div>
                                    <div className={classes.subheader}>{authStore.user.lastName}</div>
                                </ListItem>

                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.birthday')}</div>
                                    <div className={classes.subheader}>{authStore.user.birthday}</div>
                                </ListItem>

                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.serviceNumber')}</div>
                                    <div className={classes.subheader}>{authStore.user.serviceNumber}</div>
                                </ListItem>

                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.birthplace')}</div>
                                    <div className={classes.subheader}>{authStore.user.birthplace}</div>
                                </ListItem>

                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.countryBirth')}</div>
                                    <div className={classes.subheader}>{authStore.user.countryBirth}</div>
                                </ListItem>

                                <ListItem className={classes.listItem} divider>
                                    <div className={classes.header}>{t('main.personalData.marriage')}</div>
                                    <div className={classes.subheader}>{authStore.user.marriage}</div>
                                </ListItem>

                                <ListItem className={classes.listItem}>
                                    <div className={classes.header}>{t('main.personalData.children')}</div>
                                    <div className={classes.subheader}>{authStore.user.children}</div>
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }));

export default PersonalData;

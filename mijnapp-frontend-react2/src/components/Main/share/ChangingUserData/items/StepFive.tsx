import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {List, ListItem, makeStyles, Paper} from '@material-ui/core';
import {colors} from '../../../../../assets/colors';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';
import {formatDate} from '../../../../../share/utils';
import Person from '../../../../../stores/ChangingUserData/Person';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    paper: {
        borderRadius: '8px',
        boxShadow: `0px 8px 16px ${colors.lightGrey}`,

        '& .MuiList-root': {
            padding: 0,
        }
    },
    listItem: {
        display: 'block',
        padding: '8px 16px'
    },
    listItemHeader: {
        fontSize: '14px',
        lineHeight: '18px',
        color: colors.grey,
        marginBottom: '4px'
    },
    listItemSubheader: {
        minHeight: '22px',
        fontSize: '16px',
        lineHeight: '22px',
        color: colors.black,
        marginBottom: '4px'
    }
});

const StepFive =
    inject((stores: Stores) => ({
        authStore: stores.authStore,
        popupUiStore: stores.popupUiStore,
        dataStore: stores.dataStore,
        dataUiStore: stores.dataUiStore
    }))
    (observer(({authStore, popupUiStore, dataStore, dataUiStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();

        useEffect(() => {
            const people = dataUiStore.people.filter((person: Person) => person.checked);
            dataStore.setChangingUserData({people});
        }, []);

        const getAddress = (): { _id: string, data: string } | undefined => {
            return dataUiStore.addresses.find((address: any) => address._id === dataStore.addressId);
        };

        return (
            <div>
                <div className={classes.header}>{t('main.changingUserData.stepFive.header')}</div>
                <Paper className={classes.paper}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem className={classes.listItem} divider>
                            <div className={classes.listItemHeader}>{t('main.changingUserData.stepFive.submitter')}</div>
                            <div className={classes.listItemSubheader}>{authStore.user.firstName + ' ' + authStore.user.lastName}</div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.listItemHeader}>{t('main.changingUserData.stepFive.oldAddress')}</div>
                            <div className={classes.listItemSubheader}>{popupUiStore.additionalUserData.get().address}</div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.listItemHeader}>{t('main.changingUserData.stepFive.newAddress')}</div>
                            <div className={classes.listItemSubheader}>{getAddress()?.data}</div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.listItemHeader}>{t('main.changingUserData.stepFive.movingDate')}</div>
                            <div className={classes.listItemSubheader}>{formatDate(dataStore.movingDate, true)}</div>
                        </ListItem>

                        {(dataStore.people && dataStore.people.length > 0) &&
                        <ListItem className={classes.listItem} divider>
                            <div className={classes.listItemHeader}>{t('main.changingUserData.stepFive.people')}</div>
                            {dataStore.people.map((person: Person, index: number) => (
                                <div key={'key-' + index + '-' + person._id} className={classes.listItemSubheader}>
                                    {person.name + ' ' + formatDate(person.date, true)}
                                </div>)
                            )}
                        </ListItem>}

                        <ListItem className={classes.listItem}>
                            <div className={classes.listItemHeader}>{t('main.changingUserData.stepFive.contacts')}</div>
                            <div className={classes.listItemSubheader}>{dataStore.email}</div>
                            <div className={classes.listItemSubheader}>{dataStore.phone}</div>
                        </ListItem>
                    </List>
                </Paper>
            </div>
        );
    }));

export default StepFive;

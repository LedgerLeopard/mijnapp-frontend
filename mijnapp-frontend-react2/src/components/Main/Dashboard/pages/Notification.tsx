import React, {useEffect, useState} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../assets/colors';
import Notifications from '../../../../models/Notifications';
import {formatDate} from '../../../../share/utils';
import Loader from '../../../ui/Loader';
import notificationService from '../../../../services/notificationService';
import documentService from '../../../../services/documentService';
import {Organization} from '../../../../stores/SharedInformation/Organization';
import {Info} from '../../../../stores/SharedInformation/Info';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';
import {ModeForSharedData} from '../../../../share/constants/popUpModifiers';


const useStyles = makeStyles({
    root: {
        height: '100%',
        maxWidth: '1000px',
        margin: 'auto',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'auto'
    },
    header: {
        margin: '9px 0 16px 0',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    card: {
        width: '100%',
        padding: '0',
        border: `1px solid ${colors.lightGrey}`,
        backgroundColor: colors.white,
        marginBottom: '15px',
        borderRadius: '8px',
    },
    cardOld: {
        opacity: '0.6'
    },
    cardContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '5px 0'
    },
    cardImg: {
        height: '40px',
        width: '40px',
        margin: 'auto',
        marginTop: '10px',
    },
    cardTextContent: {
        width: 'calc(100% - 74px)',
        margin: '1px',
        padding: '5px 10px',
        boxSizing: 'border-box',
        textTransform: 'none',
        textAlign: 'initial',
        borderRadius: '0 8px 8px 0',
    },
    cardHeader: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    cardSubheader: {
        display: 'flex',
        width: 'fit-content',
        color: colors.grey
    }
});

const Notification =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, sharedInfoStore: stores.sharedInfoStore}))
    (observer(({popupUiStore, sharedInfoStore}: any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const [loadingAdditionalData, setLoadingAdditionalData] = useState(false);
        const [newNotifications, setNewNotifications] = useState<Notifications[]>([]);
        const [oldNotifications, setOldNotifications] = useState<Notifications[]>([]);

        const loadData = () => {
            setLoading(true);
            notificationService.getNotifications()
                .then(notifications => {
                    setNewNotifications(notifications.filter((n: any) => n.status === 'new'));
                    setOldNotifications(notifications.filter((n: any) => n.status === 'old'));
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        useEffect(() => {
            loadData();
        }, []);

        const loadAdditionalData = (id: string) => {
            setLoadingAdditionalData(true);
            documentService.getDocument(id)
                .then(data => {
                    openPopup(data);
                    setLoadingAdditionalData(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingAdditionalData(false);
                });
        };

        const openPopup = (data: any) => {
            data.organizations.map((organization: any) => sharedInfoStore.addOrganization(new Organization(organization)));
            sharedInfoStore.setSharedData({
                _id: data._id,
                infoId: data.info._id,
                info: new Info(data.info),
                uploadDate: data.uploadDate
            });
            popupUiStore.openCreateSharedData(ModeForSharedData.Edit).then();
        };

        return (
            <div className={classes.root}>
                {(loading || loadingAdditionalData) && <Loader/>}
                {!loading && newNotifications.length > 0 && <>
                    <div className={classes.header}>{t('Nieuw (1)')}</div>
                    {newNotifications.map(notification => (
                        <Button key={'key-' + notification._id}
                                className={classes.card}
                                variant='contained'
                                onClick={() => loadAdditionalData(notification.dataId)}
                                disableElevation>
                            <div className={classes.cardContent}>
                                <img className={classes.cardImg} src={notification.logo} alt={'Organization logo'}/>
                                <div className={classes.cardTextContent}>
                                    <div className={classes.cardHeader}>{notification.text}</div>
                                    <div className={classes.cardSubheader}>{formatDate(notification.date)}</div>
                                </div>
                            </div>
                        </Button>
                    ))}
                </>}
                {!loading && oldNotifications.length > 0 && <>
                    <div className={classes.header}>{t('Eerder')}</div>
                    {oldNotifications.map(notification => (
                        <Button key={'key-' + notification._id}
                                className={classes.card + ' ' + classes.cardOld}
                                variant='contained'
                                onClick={() => loadAdditionalData(notification.dataId)}
                                disableElevation>
                            <div className={classes.cardContent}>
                                <img className={classes.cardImg} src={notification.logo} alt={'Organization logo'}/>
                                <div className={classes.cardTextContent}>
                                    <div className={classes.cardHeader}>{notification.text}</div>
                                    <div className={classes.cardSubheader}>{formatDate(notification.date)}</div>
                                </div>
                            </div>
                        </Button>
                    ))}
                </>}
            </div>
        );
    }));

export default Notification;

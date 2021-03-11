import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {List, ListItem, makeStyles, Paper} from '@material-ui/core';
import {LinkButton} from '../../../../ui/SimpleComponents';
import Icon from '../../../../ui/Icon';
import {ReactComponent as Plus} from '../../../../../assets/icons/plus.svg';
import {ReactComponent as User} from '../../../../../assets/icons/user.svg';
import {ReactComponent as BSN} from '../../../../../assets/icons/bsn.svg';
import {ReactComponent as Document} from '../../../../../assets/icons/document.svg';
import {ReactComponent as CheckMark} from '../../../../../assets/icons/check-mark.svg';
import {colors} from '../../../../../assets/colors';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';
import {SearchType} from '../../../../../share/constants/searchType';
import Loader from '../../../../ui/Loader';
import shareInfoService from '../../../../../services/shareInfoService';
import {Info} from '../../../../../stores/SharedInformation/Info';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    addButton: {
        height: '24px',
        width: 'fit-content',
        display: 'flex',
        color: colors.tertiary
    },
    buttonText: {
        margin: 'auto 8px'
    },
    wrapper: {
        height: 'calc(100% - 35px)',
        position: 'relative'
    },
    paper: {
        borderRadius: '8px',
        boxShadow: `0px 8px 16px ${colors.lightGrey}`,

        '& .MuiList-root': {
            padding: 0,
        }
    },
    listItem: {
        height: '78px',
        display: 'block',
        padding: '16px'
    },
    customListItem: {
        height: '78px',
        display: 'flex',
        padding: '16px'
    },
    itemHeader: {
        fontSize: '14px',
        color: colors.grey,
    },
    itemContent: {
        display: 'flex',
        width: 'fit-content',
        marginTop: '5px'
    },
    customItemContent: {
        margin: 'auto 16px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    itemData: {
        margin: 'auto 10px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    customItemData: {
        marginTop: '5px',
        fontSize: '18px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
});

const ViewSharedData =
    inject((stores: Stores) => ({sharedDataStore: stores.sharedInfoStore}))
    (observer(({sharedDataStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const info = sharedDataStore.info;

        const loadData = () => {
            if (!!info._id) return;
            setLoading(true);
            shareInfoService.getDataToShare(sharedDataStore.infoId)
                .then(data => {
                    sharedDataStore.setSharedData({info: new Info(data)});
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        };

        useEffect(() => {
            loadData();
        }, []);

        return (
            <div className={classes.wrapper}>
                {loading && <Loader/>}
                {!loading && <Paper className={classes.paper}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem className={classes.customListItem} divider>
                            <img src={`${info.organizationLogo}`} alt={'Organization Logo'}/>
                            <div className={classes.customItemContent}>
                                <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepOne.organizationName')}</div>
                                <div className={classes.customItemData}>{info.organizationName}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepOne.name')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={User}/>
                                <div className={classes.itemData}>{info.name}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepOne.bsn')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={BSN}/>
                                <div className={classes.itemData}>{info.BSN}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepOne.typeVerification')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={Document}/>
                                <div className={classes.itemData}>{info.verificationType}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem}>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepOne.status')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={CheckMark} color={colors.success}/>
                                <div className={classes.itemData}>{info.status}</div>
                            </div>
                        </ListItem>
                    </List>
                </Paper>}
            </div>
        );
    }));

const StepOne =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, sharedDataStore: stores.sharedInfoStore}))
    (observer(({popupUiStore, sharedDataStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();

        return (
            <div>
                <div className={classes.header}>{t('main.creatingSharedInfo.stepOne.header')}</div>
                {!sharedDataStore.infoId
                    ? <LinkButton className={classes.addButton} onClick={() => popupUiStore.openSearch(SearchType.Data)}>
                        <Icon icon={Plus} color={colors.tertiary}/>
                        <div className={classes.buttonText}>{t('main.creatingSharedInfo.stepOne.select')}</div>
                    </LinkButton>
                    : <ViewSharedData/>
                }
            </div>
        );
    }));

export default StepOne;

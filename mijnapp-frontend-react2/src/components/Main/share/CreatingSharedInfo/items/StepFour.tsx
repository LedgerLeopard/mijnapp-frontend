import React from 'react';
import {List, ListItem, makeStyles, Paper} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import Icon from '../../../../ui/Icon';
import {ReactComponent as Calendar} from '../../../../../assets/icons/calendar.svg';
import {ReactComponent as BSN} from '../../../../../assets/icons/bsn.svg';
import {ReactComponent as Document} from '../../../../../assets/icons/document.svg';
import {ReactComponent as CheckMark} from '../../../../../assets/icons/check-mark.svg';
import {colors} from '../../../../../assets/colors';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';
import {Organization} from '../../../../../stores/SharedInformation/Organization';
import {formatDate} from '../../../../../share/utils';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    subheader: {
        marginTop: '16px'
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

const StepFour =
    inject((stores: Stores) => ({sharedDataStore: stores.sharedInfoStore}))
    (observer(({sharedDataStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const organizations = sharedDataStore.organizations;
        const uploadDate = sharedDataStore.uploadDate;
        const info = sharedDataStore.info;

        return (
            <div>
                <div className={classes.header}>{t('main.creatingSharedInfo.stepFour.header')}</div>
                <div className={classes.header}>{t('main.creatingSharedInfo.stepFour.subheaderOne')}</div>
                <Paper className={classes.paper}>
                    {organizations
                        .filter((organizations: Organization) => organizations.use)
                        .map((organization: Organization, index: number) =>
                            (<ListItem key={'key-' + index + '-' + organization._id} className={classes.customListItem} divider>
                                <img src={`${organization.logo}`} alt={'Organization Logo'}/>
                                <div className={classes.customItemContent}>
                                    <div className={classes.customItemData}>{organization.name}</div>
                                </div>
                            </ListItem>))
                    }

                    <ListItem className={classes.listItem}>
                        <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepFour.subheaderTwo')}</div>
                        <div className={classes.itemContent}>
                            <Icon icon={Calendar}/>
                            <div className={classes.itemData}>{formatDate(uploadDate, true)}</div>
                        </div>
                    </ListItem>
                </Paper>

                <div className={classes.header + ' ' + classes.subheader}>{t('main.creatingSharedInfo.stepFour.date')}</div>
                <Paper className={classes.paper}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem className={classes.customListItem} divider>
                            <img src={`${info.organizationLogo}`} alt={'Organization Logo'}/>
                            <div className={classes.customItemContent}>
                                <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepFour.organizationName')}</div>
                                <div className={classes.customItemData}>{info.organizationName}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepFour.bsn')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={BSN}/>
                                <div className={classes.itemData}>{info.BSN}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem} divider>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepFour.typeVerification')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={Document}/>
                                <div className={classes.itemData}>{info.verificationType}</div>
                            </div>
                        </ListItem>

                        <ListItem className={classes.listItem}>
                            <div className={classes.itemHeader}>{t('main.creatingSharedInfo.stepFour.status')}</div>
                            <div className={classes.itemContent}>
                                <Icon icon={CheckMark} color={colors.success}/>
                                <div className={classes.itemData}>{info.status}</div>
                            </div>
                        </ListItem>
                    </List>
                </Paper>
            </div>
        );
    }));

export default StepFour;

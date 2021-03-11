import React, {useEffect, useState} from 'react';
import Header from '../../ui/Header';
import {List, ListItem, makeStyles, Paper} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useHistory, withRouter} from 'react-router-dom';
import {colors} from '../../../assets/colors';
import shareInfoService from '../../../services/shareInfoService';
import Icon from '../../ui/Icon';
import {ReactComponent as Calendar} from '../../../assets/icons/calendar.svg';
import {formatDate} from '../../../share/utils';
import {ReactComponent as BSN} from '../../../assets/icons/bsn.svg';
import {ReactComponent as Document} from '../../../assets/icons/document.svg';
import {ReactComponent as CheckMark} from '../../../assets/icons/check-mark.svg';
import Loader from '../../ui/Loader';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import {Organization} from '../../../stores/SharedInformation/Organization';
import {Info} from '../../../stores/SharedInformation/Info';
import {TrackingData} from '../../../stores/SharedInformation/TrackingData';
import MatIconButton from '../../ui/MatIconButton';
import {ReactComponent as ArrowLeft} from '../../../assets/icons/arrow-left.svg';
import Stepper from '@material-ui/core/Stepper';
import {CustomConnector, CustomStepContent} from '../../ui/SimpleComponents';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {CleaningMode} from '../../../share/constants/popUpModifiers';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '78px 1fr',
    },
    wrapper: {
        height: '100%',
        padding: '24px 15px',
        boxSizing: 'border-box',
        overflow: 'auto',
        backgroundColor: colors.background,
    },
    content: {
        height: '100%',
        margin: 'auto',
        maxWidth: '1000px',
        position: 'relative',
    },
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
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
    },
    blockButton: {
        marginTop: '24px'
    },
    terminateButton: {
        backgroundColor: colors.error,

        '&:hover': {
            backgroundColor: '#F22626',
        },
    },
    backButton: {
        marginTop: '15px',
        color: colors.grey,
        backgroundColor: colors.background,

        '&:hover': {
            backgroundColor: colors.background,
        },
    },
    stepper: {
        borderRadius: '8px',
        boxShadow: `0px 8px 16px ${colors.lightGrey}`,
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: colors.black,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    icon: {
        height: '12px',
        width: '12px',
        borderRadius: '50%',
        border: `2px solid ${colors.lightGrey}`,
        backgroundColor: colors.lightGrey
    },
    date: {
        paddingTop: '5px',
        color: colors.grey
    }
});

const SharedInfoSingle =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, sharedInfoStore: stores.sharedInfoStore}))
    (observer(({popupUiStore, sharedInfoStore, ...props}: any) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(true);
        const [actionLoading, setActionLoading] = useState(false);
        const organizations: Organization[] = sharedInfoStore.organizations;
        const info: Info = sharedInfoStore.info;
        const trackingData: TrackingData[] = sharedInfoStore.trackingData;

        const loadData = () => {
            setLoading(true);
            const id = props.match.params.id;
            shareInfoService.getSharedData(id)
                .then(information => {
                    sharedInfoStore.setSharedData({
                        organizations: information.organizations.map((organization: any) => new Organization(organization)),
                        trackingData: information.trackingData.map((data: any) => new TrackingData(data)),
                        ...information
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        const onDestroy = () => {
            sharedInfoStore.clearStore();
            popupUiStore.clearResultValue(CleaningMode.Terminate);
        };

        useEffect(() => {
            loadData();
            return onDestroy;
        }, []);

        const openDialog = () => {
            popupUiStore.openTerminate()
                .then((value: boolean) => {
                    if (!value) return;
                    setActionLoading(true);
                    const id = props.match.params.id;
                    shareInfoService.terminateSharingInfo(id)
                        .then(() => {
                            setActionLoading(false);
                            popupUiStore.openSuccess(t('main.sharedInfoSingle.successHeader')).then();
                        })
                        .catch(error => {
                            setActionLoading(false);
                            console.log(error);
                        });
                });
        };

        const goBack = () => {
            history.goBack();
        };

        return (
            <div className={classes.root}>
                <Header label={organizations.length !== 0 && !!organizations[0].name ? organizations[0].name : ' '}
                        backButtonLabel={t('main.sharedInfoSingle.backButtonTop')}
                        backButtonAction={goBack}/>
                <div className={classes.wrapper}>
                    <div className={classes.content}>
                        {(loading || actionLoading) && <Loader/>}
                        {!loading &&
                        <>
                            <div className={classes.header}>{t('main.sharedInfoSingle.headerOne')}</div>
                            <Paper className={classes.paper}>
                                {organizations.map((organization, index: number) =>
                                    (<ListItem key={'key-' + index + '-' + organization._id} className={classes.customListItem} divider>
                                        <img src={`${organization.logo}`} alt={'Organization Logo'}/>
                                        <div className={classes.customItemContent}>
                                            <div className={classes.customItemData}>{organization.name}</div>
                                        </div>
                                    </ListItem>))
                                }
                                <ListItem className={classes.listItem}>
                                    <div className={classes.itemHeader}>{t('main.sharedInfoSingle.uploadDate')}</div>
                                    <div className={classes.itemContent}>
                                        <Icon icon={Calendar}/>
                                        <div className={classes.itemData}>{formatDate(sharedInfoStore.uploadDate, true)}</div>
                                    </div>
                                </ListItem>
                            </Paper>

                            <div className={classes.header + ' ' + classes.subheader}>{t('main.sharedInfoSingle.headerTwo')}</div>
                            <Paper className={classes.paper}>
                                <List component="nav" aria-label="mailbox folders">
                                    <ListItem className={classes.customListItem} divider>
                                        <img src={`${info.organizationLogo}`} alt={'Organization Logo'}/>
                                        <div className={classes.customItemContent}>
                                            <div
                                                className={classes.itemHeader}>{t('main.sharedInfoSingle.organizationName')}</div>
                                            <div className={classes.customItemData}>{info.organizationName}</div>
                                        </div>
                                    </ListItem>

                                    <ListItem className={classes.listItem} divider>
                                        <div className={classes.itemHeader}>{t('main.sharedInfoSingle.bsn')}</div>
                                        <div className={classes.itemContent}>
                                            <Icon icon={BSN}/>
                                            <div className={classes.itemData}>{info.BSN}</div>
                                        </div>
                                    </ListItem>

                                    <ListItem className={classes.listItem} divider>
                                        <div className={classes.itemHeader}>{t('main.sharedInfoSingle.typeVerification')}</div>
                                        <div className={classes.itemContent}>
                                            <Icon icon={Document}/>
                                            <div className={classes.itemData}>{info.verificationType}</div>
                                        </div>
                                    </ListItem>

                                    <ListItem className={classes.listItem}>
                                        <div className={classes.itemHeader}>{t('main.sharedInfoSingle.status')}</div>
                                        <div className={classes.itemContent}>
                                            <Icon icon={CheckMark} color={colors.success}/>
                                            <div className={classes.itemData}>{info.status}</div>
                                        </div>
                                    </ListItem>
                                </List>
                            </Paper>

                            <div className={classes.header + ' ' + classes.subheader}>{t('main.sharedInfoSingle.headerThree')}</div>

                            <Stepper className={classes.stepper} orientation="vertical" connector={<CustomConnector/>}>
                                {trackingData.map(data => (
                                    <Step key={`key-${data._id}`} active={true}>
                                        <StepLabel StepIconComponent={() => <div className={classes.icon}/>}>
                                            <div className={classes.label}>{data.name}</div>
                                        </StepLabel>
                                        <CustomStepContent>
                                            <div>{data.action}</div>
                                            <div className={classes.date}>{formatDate(data.date)}</div>
                                        </CustomStepContent>
                                    </Step>
                                ))}
                            </Stepper>

                            <div className={classes.blockButton}>
                                <MatIconButton customClasses={classes.terminateButton}
                                               label={t('main.sharedInfoSingle.terminateShareButton')}
                                               onClick={openDialog}/>
                                <MatIconButton label={t('main.sharedInfoSingle.backButtonBottom')}
                                               customClasses={classes.backButton}
                                               startIcon={ArrowLeft}
                                               startIconColor={colors.grey}
                                               onClick={goBack}/>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        );
    }));

export default withRouter(SharedInfoSingle);

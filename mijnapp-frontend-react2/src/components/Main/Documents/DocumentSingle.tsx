import React, {useEffect, useState} from 'react';
import Header from '../../ui/Header';
import MatIconButton from '../../ui/MatIconButton';
import Icon from '../../ui/Icon';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {List, ListItem, makeStyles, Paper} from '@material-ui/core';
import {colors} from '../../../assets/colors';
import Loader from '../../ui/Loader';
import {ReactComponent as User} from '../../../assets/icons/user.svg';
import {ReactComponent as BSN} from '../../../assets/icons/bsn.svg';
import {ReactComponent as Document} from '../../../assets/icons/document.svg';
import {ReactComponent as CheckMark} from '../../../assets/icons/check-mark.svg';
import {Info} from '../../../stores/SharedInformation/Info';
import documentService from '../../../services/documentService';
import {ReactComponent as ArrowLeft} from '../../../assets/icons/arrow-left.svg';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import {Organization} from '../../../stores/SharedInformation/Organization';
import {ModeForSharedData} from '../../../share/constants/popUpModifiers';


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
    info: {
        height: '100%',
        display: 'grid',
    },
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
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
        marginTop: '20px'
    },
    backButton: {
        marginTop: '15px',
        color: colors.grey,
        backgroundColor: colors.background,

        '&:hover': {
            backgroundColor: colors.background,
        },
    },
});

const DocumentSingle =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, sharedInfoStore: stores.sharedInfoStore}))
    (observer(({popupUiStore, sharedInfoStore, ...props}: any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const history = useHistory();
        const [loading, setLoading] = useState(true);
        const [info, setInfo] = useState<Info>(Object(null));
        const [sharedData, setSharedData]: any = useState(null);

        const loadData = () => {
            setLoading(true);
            const id = props.match.params.id;
            documentService.getDocument(id)
                .then(sharedInfo => {
                    setSharedData(sharedInfo);
                    setInfo(sharedInfo.info);
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

        const goBack = () => {
            history.goBack();
        };

        const goToStart = () => {
            history.push('/main/start');
        };

        const openPopup = () => {
            sharedData.organizations.map((organization: any) => sharedInfoStore.addOrganization(new Organization(organization)));
            sharedInfoStore.setSharedData({
                _id: sharedData._id,
                infoId: sharedData.info._id,
                info: new Info(sharedData.info),
                uploadDate: sharedData.uploadDate
            });
            popupUiStore.openCreateSharedData(ModeForSharedData.Edit).then();
        };

        return (
            <div className={classes.root}>
                <Header label={!!info && !!info.verificationType ? info.verificationType : ' '}
                        backButtonLabel={t('main.documentSingle.backButton')}
                        backButtonAction={goBack}/>
                <div className={classes.wrapper}>
                    <div className={classes.content}>
                        {loading && <Loader/>}
                        {!loading &&
                        <div className={classes.info}>
                            <div>
                                <div className={classes.header}>{t('main.documentSingle.header')}</div>
                                <Paper className={classes.paper}>
                                    <List component="nav" aria-label="mailbox folders">
                                        <ListItem className={classes.customListItem} divider>
                                            <img src={`${info.organizationLogo}`} alt={'Organization Logo'}/>
                                            <div className={classes.customItemContent}>
                                                <div className={classes.itemHeader}>{t('main.documentSingle.organizationName')}</div>
                                                <div className={classes.customItemData}>{info.organizationName}</div>
                                            </div>
                                        </ListItem>

                                        <ListItem className={classes.listItem} divider>
                                            <div className={classes.itemHeader}>{t('main.documentSingle.name')}</div>
                                            <div className={classes.itemContent}>
                                                <Icon icon={User}/>
                                                <div className={classes.itemData}>{info.name}</div>
                                            </div>
                                        </ListItem>

                                        <ListItem className={classes.listItem} divider>
                                            <div className={classes.itemHeader}>{t('main.documentSingle.bsn')}</div>
                                            <div className={classes.itemContent}>
                                                <Icon icon={BSN}/>
                                                <div className={classes.itemData}>{info.BSN}</div>
                                            </div>
                                        </ListItem>

                                        <ListItem className={classes.listItem} divider>
                                            <div className={classes.itemHeader}>{t('main.documentSingle.typeVerification')}</div>
                                            <div className={classes.itemContent}>
                                                <Icon icon={Document}/>
                                                <div className={classes.itemData}>{info.verificationType}</div>
                                            </div>
                                        </ListItem>

                                        <ListItem className={classes.listItem}>
                                            <div className={classes.itemHeader}>{t('main.documentSingle.status')}</div>
                                            <div className={classes.itemContent}>
                                                <Icon icon={CheckMark} color={colors.success}/>
                                                <div className={classes.itemData}>{info.status}</div>
                                            </div>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </div>
                            <div className={classes.blockButton}>
                                <MatIconButton label={t('main.documentSingle.backButtonTop')}
                                               onClick={openPopup}/>
                                <MatIconButton label={t('main.documentSingle.backButtonBottom')}
                                               customClasses={classes.backButton}
                                               startIcon={ArrowLeft}
                                               startIconColor={colors.grey}
                                               onClick={goToStart}/>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }));

export default DocumentSingle;

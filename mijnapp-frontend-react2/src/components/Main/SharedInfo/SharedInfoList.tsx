import React, {useEffect, useState} from 'react';
import Header from '../../ui/Header';
import MatIconButton from '../../ui/MatIconButton';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button, makeStyles} from '@material-ui/core';
import {colors} from '../../../assets/colors';
import Icon from '../../ui/Icon';
import {ReactComponent as Add} from '../../../assets/icons/plus.svg';
import shareInfoService from '../../../services/shareInfoService';
import Loader from '../../ui/Loader';
import {formatDate} from '../../../share/utils';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import {CleaningMode} from '../../../share/constants/popUpModifiers';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '78px 1fr',
    },
    addButton: {
        height: '32px',
        width: '32px',
        padding: 0,
        borderRadius: '50%',
        backgroundColor: colors.white,

        '&:hover': {
            backgroundColor: colors.midGrey,
        },
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
    textContent: {
        fontSize: '16px',
        lineHeight: '22px',
        marginBottom: '20px',
        color: colors.grey
    },
    card: {
        height: '80px',
        width: '100%',
        padding: '0',
        border: `1px solid ${colors.lightGrey}`,
        backgroundColor: colors.white,
        marginBottom: '15px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    cardContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    cardIcon: {
        height: '40px',
        width: '40px',
        margin: 'auto',
        boxSizing: 'border-box',
        borderRadius: '100%',
    },
    cardTextContent: {
        width: 'calc(100% - 74px)',
        margin: 'auto 0',
        padding: '10px 10px 10px 0',
        boxSizing: 'border-box',
        textTransform: 'none',
        textAlign: 'initial',
        borderRadius: '0 8px 8px 0',
    },
    cardHeader: {
        fontSize: '16px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    cardSubheader: {
        color: colors.grey,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
});

const SharedInfoList =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore}))
    (observer(({popupUiStore}: Stores) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const [organizations, setOrganizations] = useState<any>([]);

        const loadData = () => {
            setLoading(true);
            shareInfoService.getOrganizationsWithAccess()
                .then(organizations => {
                    setLoading(false);
                    setOrganizations(organizations);
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        };

        const onDestroy = () => {
            setLoading(false);
            popupUiStore.clearResultValue(CleaningMode.SharedData);
        }

        useEffect(() => {
            loadData();
            return onDestroy;
        }, []);

        const goBack = () => {
            history.goBack();
        };

        const goTo = (id: string) => {
            history.push('/main/share/' + id);
        };

        return (
            <div className={classes.root}>
                <Header label={t('main.sharedInfoList.header')}
                        backButtonLabel={t('main.sharedInfoList.backButton')}
                        backButtonAction={goBack}
                        endComponent={
                            <MatIconButton customClasses={classes.addButton}
                                           label={<Icon icon={Add}/>}
                                           onClick={popupUiStore.openCreateSharedData}/>
                        }/>
                <div className={classes.wrapper}>
                    <div className={classes.content}>
                        {loading && <Loader/>}
                        {(!loading && organizations.length === 0) &&
                        <div className={classes.textContent}>{t('main.sharedInfoList.textWhenEmpty')}</div>}
                        {organizations.map((organization: any) => (
                            <Button key={'key-' + organization._id}
                                    className={classes.card}
                                    variant='contained'
                                    onClick={() => goTo(organization._id)}
                                    disableElevation>
                                <div className={classes.cardContent}>
                                    {<img className={classes.cardIcon} src={`${organization.logo}`} alt='Avatar'/>}
                                    <div className={classes.cardTextContent}>
                                        <div className={classes.cardHeader}>{organization.organizationName}</div>
                                        {organization.createAt &&
                                        <div className={classes.cardSubheader}>
                                            {t('main.sharedInfoList.dateText') + ' ' + formatDate(organization.createAt, true)}
                                        </div>
                                        }
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }));

export default SharedInfoList;

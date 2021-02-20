import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import MatInput from '../../../ui/MatInput';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Icon from '../../../ui/Icon';
import {ReactComponent as User} from '../../../../assets/icons/user.svg';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import {colors} from '../../../../assets/colors';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        maxWidth: '1000px',
        padding: '15px',
        margin: 'auto',
    },
    searchBlock: {
        width: '100%'
    },
    search: {
        width: '100%',
        marginBottom: '20px'
    },
    header: {
        margin: '9px 0 16px 0',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    card: {
        height: '100px',
        width: '100%',
        padding: '0',
        border: `1px solid ${colors.lightGrey}`,
        backgroundColor: colors.background,
        marginBottom: '15px'
    },
    cardContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    cardIcon: {
        height: '100px',
        width: '100px',
        margin: 0,
        padding: '10px',
        boxSizing: 'border-box'
    },
    cardTextContent: {
        width: 'calc(100% - 100px)',
        margin: '1px',
        padding: '10px 20px',
        boxSizing: 'border-box',
        textTransform: 'none',
        textAlign: 'initial',
        borderRadius: '0 4px 4px 0',
        backgroundColor: colors.white
    },
    cardHeader: {
        fontSize: '16px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    cardSubheader: {
        color: colors.primary
    }
});

const menuItems = [
    {header: 'personal', subheader: '', route: '/main/dashboard/start', icon: User},
    {header: 'notification', subheader: '', route: '/main/dashboard/notification', icon: NotificationsNoneOutlinedIcon},
    {header: 'documents', subheader: '', route: '/main/dashboard/start', icon: FolderOpenIcon},
    {header: 'sharedData', subheader: '', route: '/main/dashboard/start', icon: ShareOutlinedIcon},
];

const Start = () => {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();

    const goTo = (route: string) => {
        history.push(route);
    };

    return (
        <div className={classes.root}>
            <div className={classes.searchBlock}>
                <div className={classes.header}>{t('main.dashboard.start.searchHeader')}</div>
                <MatInput className={classes.search}
                          placeholder={t('main.dashboard.start.searchPlaceholder')}
                          startAdornment={<Icon icon={SearchRoundedIcon}/>}
                          onFocus={() => goTo('/main/search')}/>
            </div>
            <div>
                <div className={classes.header}>{t('main.dashboard.start.menuHeader')}</div>
                {menuItems.map(item => (
                    <Button key={'key-' + item.header}
                            className={classes.card}
                            variant='contained'
                            onClick={() => goTo(item.route)}
                            disableElevation>
                        <div className={classes.cardContent}>
                            <Icon className={classes.cardIcon} fullWidthIcon={true} icon={item.icon}/>
                            <div className={classes.cardTextContent}>
                                <div className={classes.cardHeader}>
                                    {t('main.dashboard.start.' + item.header)}
                                </div>
                                {item.subheader &&
                                <div className={classes.cardSubheader}>
                                    {t('main.dashboard.start.' + item.subheader)}
                                </div>}
                            </div>
                        </div>
                    </Button>
                ))}

            </div>
        </div>
    );
};

export default Start;

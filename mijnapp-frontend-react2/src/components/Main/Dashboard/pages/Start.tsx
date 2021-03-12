import React, {useRef} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import MatInput from '../../../ui/MatInput';
import {ReactComponent as SearchIcon} from '../../../../assets/icons/search.svg';
import Icon from '../../../ui/Icon';
import {ReactComponent as User} from '../../../../assets/icons/user.svg';
import {ReactComponent as Notification} from '../../../../assets/icons/notifications.svg';
import {ReactComponent as Folder} from '../../../../assets/icons/folder.svg';
import {ReactComponent as Share} from '../../../../assets/icons/share.svg';
import {colors} from '../../../../assets/colors';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';


const useStyles = makeStyles({
    root: {
        maxWidth: '1000px',
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
    {key: 'personal', subheader: '', route: '/personal', icon: User},
    {key: 'notification', subheader: '', route: '/dashboard/notification', icon: Notification},
    {key: 'documents', subheader: '', route: '/documents', icon: Folder},
    {key: 'sharedInfo', subheader: '', route: '/share', icon: Share},
];

const Start =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, countNotification: stores.countNotification}))
    (observer(({popupUiStore, countNotification}: Stores) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();
        const input = useRef<HTMLInputElement>(null);

        const goTo = (route: string) => {
            history.push('/main' + route);
        };

        const focus = () => {
            input.current?.blur();
            popupUiStore.openSearch();
        };

        const getMenuItems = () => {
            return menuItems.map(item => {
                if (item.key === 'notification' && countNotification.count.get()) {
                    item.subheader = countNotification.count.get() + t('main.dashboard.start.subheaderNotification');
                }
                return item;
            });
        };

        return (
            <div className={classes.root}>
                <div className={classes.searchBlock}>
                    <div className={classes.header}>{t('main.dashboard.start.searchHeader')}</div>
                    <MatInput id='test'
                              inputRef={input}
                              className={classes.search}
                              placeholder={t('main.dashboard.start.searchPlaceholder')}
                              startAdornment={<Icon icon={SearchIcon}/>}
                              onFocus={focus}/>
                </div>
                <div>
                    <div className={classes.header}>{t('main.dashboard.start.menuHeader')}</div>
                    {getMenuItems().map(item => (
                        <Button key={'key-' + item.key}
                                className={classes.card}
                                variant='contained'
                                onClick={() => goTo(item.route)}
                                disableElevation>
                            <div className={classes.cardContent}>
                                <Icon className={classes.cardIcon} fullWidthIcon={true} icon={item.icon}/>
                                <div className={classes.cardTextContent}>
                                    <div className={classes.cardHeader}>
                                        {t('main.dashboard.start.' + item.key)}
                                    </div>
                                    {item.subheader && <div className={classes.cardSubheader}>{item.subheader}</div>}
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        );
    }));

export default Start;

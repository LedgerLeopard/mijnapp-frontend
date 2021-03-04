import React, {useEffect, useState} from 'react';
import {Badge, makeStyles, Tab, Tabs} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../assets/colors';
import Icon from '../../../ui/Icon';
import {ReactComponent as Home} from '../../../../assets/icons/home.svg';
import {ReactComponent as Search} from '../../../../assets/icons/search.svg';
import {ReactComponent as Notification} from '../../../../assets/icons/notifications.svg';
import {ReactComponent as Settings} from '../../../../assets/icons/settings.svg';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';


const useStyles = makeStyles({
    tabs: {
        height: '100%',
        boxShadow: `0 -1px 4px ${colors.lightGrey}`
    },
    indicator: {
        top: 0,
        height: '4px'
    },
    tab: {
        height: '100%',
        margin: '0 10px',
        padding: '15px 6px',
        textTransform: 'none',
        fontSIze: '14px',
    },
    badge: {
        color: colors.white
    }
});

const menuItems: { key: string, route: string, icon: any }[] = [
    {key: 'start', route: '/main/dashboard/start', icon: Home},
    {key: 'search', route: '/main/search', icon: Search},
    {key: 'notification', route: '/main/dashboard/notification', icon: Notification},
    {key: 'settings', route: '/main/dashboard/settings', icon: Settings}
];

const TabBar =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore}))
    (observer(({popupUiStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const history = useHistory();

        const onRouteChange = (url: string): number => {
            const index = menuItems.findIndex(item => url.includes(item.key));
            return index !== -1 ? index : 0;
        };

        const [tab, setTab] = useState(onRouteChange(history.location.pathname));

        useEffect(() => {
            const unListen = history.listen(route => {
                setTab(onRouteChange(route.pathname));
            });
            return () => unListen();
        }, []);

        const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
            if (menuItems[newValue].key === 'search') return popupUiStore.openSearch();
            history.push(menuItems[newValue].route);
        };

        return (
            <Tabs classes={{root: classes.tabs, indicator: classes.indicator}}
                  value={tab}
                  onChange={handleChange}
                  variant="fullWidth"
                  scrollButtons="desktop"
                  indicatorColor="primary"
                  aria-label="icon label tabs example">
                {menuItems.map(item => (
                    <Tab key={item.key}
                         className={classes.tab}
                         label={t('tabBar.' + item.key)}
                         icon={
                             item.key === 'notification'
                                 ? <Badge classes={{badge: classes.badge}}
                                          badgeContent={1}
                                          color='primary'
                                          children={<Icon icon={item.icon}/>}/>
                                 : <Icon icon={item.icon}/>
                         }/>
                ))}
            </Tabs>
        );
    }));

export default TabBar;

import React, {useEffect, useState} from 'react';
import {makeStyles, Tab, Tabs} from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import {useHistory, withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {colors} from '../../assets/colors';


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
    }
});

const menuItems: { key: string, route: string, icon: any }[] = [
    {key: 'start', route: '/main/dashboard/start', icon: <HomeOutlinedIcon/>},
    {key: 'search', route: '/main/search', icon: <SearchOutlinedIcon/>},
    {key: 'notification', route: '/main/dashboard/notification', icon: <NotificationsNoneOutlinedIcon/>},
    {key: 'settings', route: '/main/dashboard/settings', icon: <SettingsOutlinedIcon/>}
];

const TabBar = () => {
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
            {menuItems.map(item => (<Tab key={item.key} className={classes.tab} icon={item.icon} label={t('tabBar.' + item.key)}/>))}
        </Tabs>
    );
};

export default withRouter(TabBar);

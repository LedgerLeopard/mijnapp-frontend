import React from 'react';
import {makeStyles} from '@material-ui/core';
import Icon from './Icon';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    root: {
        minWidth: '100px',
        display: 'flex',
        padding: '10px 15px',
        boxShadow: `inset 0px -1px 0px ${colors.lightGrey}`,
        boxSizing: 'border-box'
    },
    icon: {
        height: '30px',
        width: '30px',
        display: 'flex',
        borderRadius: '50%',
        backgroundColor: colors.lightGrey,
        margin: 'auto 10px auto 0'
    },
    header: {
        width: 'calc(100% - 70px)',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        margin: 'auto 0',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '26px',
        lineHeight: '30px',
        boxSizing: 'border-box'
    },
    button: {
        minWidth: 'fit-content',
        margin: 'auto 0 auto auto',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
});

interface HeaderData {
    label: string | undefined;
    icon?: any;
    button?: any;
}

const Header = ({label, icon, button}: HeaderData) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {icon && <div className={classes.icon}><Icon icon={icon}/></div>}
            <div className={classes.header}>{label}</div>
            <div className={classes.button}>{button}</div>
        </div>
    );
};

export default Header;

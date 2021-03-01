import React from 'react';
import {makeStyles} from '@material-ui/core';
import Icon from './Icon';
import {colors} from '../../assets/colors';
import {LinkButton} from './SimpleComponents';
import {ReactComponent as ArrowLeft} from '../../assets/icons/arrow-left.svg';


const useStyles = makeStyles({
    root: {
        display: 'grid',
        padding: '10px 15px',
        boxSizing: 'border-box',
        boxShadow: `inset 0px -1px 0px ${colors.lightGrey}`,
    },
    icon: {
        height: '30px',
        width: '30px',
        display: 'flex',
        borderRadius: '50%',
        backgroundColor: colors.lightGrey,
        margin: 'auto 10px auto 0'
    },
    title: {
        minWidth: '100px',
        display: 'flex',
        margin: 'auto 0',
        boxSizing: 'border-box',
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
    endComponent: {
        minWidth: 'fit-content',
        margin: 'auto 0 auto auto',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    backButton: {
        height: '24px',
        width: '160px',
        display: 'flex',
        margin: 'auto auto auto 0',
        color: colors.black,
    },
    backIcon: {
        marginLeft: 0
    },
    buttonText: {
        margin: 'auto'
    }
});

interface HeaderData {
    label: string | undefined;
    icon?: any;
    endComponent?: any;
    backButtonLabel?: string;
    backButtonAction?: any;
}

const Header = ({label, icon, endComponent, backButtonLabel, backButtonAction}: HeaderData) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {backButtonLabel && <LinkButton className={classes.backButton} onClick={backButtonAction}>
                <Icon className={classes.backIcon} icon={ArrowLeft}/>
                <div className={classes.buttonText}>{backButtonLabel}</div>
            </LinkButton>}

            <div className={classes.title}>
                {icon && <div className={classes.icon}><Icon icon={icon}/></div>}
                <div className={classes.header}>{label}</div>
                {endComponent && <div className={classes.endComponent}>{endComponent}</div>}
            </div>
        </div>
    );
};

export default Header;

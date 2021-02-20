import React from 'react';
import {makeStyles, SvgIcon} from '@material-ui/core';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: 'auto'
    },
    svg: {
        height: '100%',
        width: '100%'
    }
});

interface CustomSvgIconData {
    icon: any;
    color?: string;
    className?: any;
    fullWidthIcon?: boolean;
    disabled?: boolean;
}

const Icon = ({icon, color, className, fullWidthIcon, disabled}: CustomSvgIconData) => {
    const classes = useStyles();

    return (
        <div className={classes.root + ' ' + (className ? className : '')}>
            <SvgIcon classes={{root: fullWidthIcon ? classes.svg : ''}}
                     style={{fill: disabled ? colors.midGrey : color ? color : colors.black}}
                     component={icon}/>
        </div>
    );
};

export default Icon;

import React from 'react';
import {makeStyles, SvgIcon} from '@material-ui/core';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: 'auto'
    }
});

class CustomSvgIconData {
    icon: any;
    color?: string;
    className?: any;
    disabled?: boolean;
}

const Icon = ({icon, color, className, disabled}: CustomSvgIconData) => {
    const classes = useStyles();

    return (
        <div className={classes.root + ' ' + (className ? className : '')}>
            <SvgIcon style={{fill: disabled ? colors.midGrey : color ? color : colors.black}}
                     component={icon}/>
        </div>
    );
};

export default Icon;

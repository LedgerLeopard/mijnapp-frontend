import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import Icon from './Icon';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    root: {
        height: '48px',
        width: '100%',
        minWidth: 'auto',
        borderRadius: '8px',
        color: colors.white,
        backgroundColor: colors.primary,
        textTransform: 'none',
        fontSize: '16px',

        '&:hover': {
            backgroundColor: colors.primary,
        },
        '&:disabled': {
            color: colors.midGrey,
            backgroundColor: colors.lightGrey,
        }
    }
});

class MatIconButtonData {
    label: any | undefined;
    variant?: any;
    customClasses?: any;
    startIcon?: any;
    startIconColor?: string;
    endIcon?: any;
    endIconColor?: string;
    onClick?: any;
    disabled?: boolean;
}

const MatIconButton =
    ({
         label,
         variant = 'contained',
         customClasses,
         startIcon,
         startIconColor,
         endIcon,
         endIconColor,
         onClick,
         disabled
     }: MatIconButtonData) => {
        const classes = useStyles();

        const getIcon = (icon?: any, iconColor?: string, disabled?: boolean) => {
            return <Icon icon={icon} color={iconColor} disabled={disabled}/>;
        };

        return (
            <Button variant={variant}
                    className={classes.root + ' ' + (customClasses ? customClasses : '')}
                    startIcon={startIcon ? getIcon(startIcon, startIconColor, disabled) : ''}
                    endIcon={endIcon ? getIcon(endIcon, endIconColor, disabled) : ''}
                    onClick={onClick}
                    disabled={disabled}
                    disableElevation>
                {label}
            </Button>
        );
    };

export default MatIconButton;

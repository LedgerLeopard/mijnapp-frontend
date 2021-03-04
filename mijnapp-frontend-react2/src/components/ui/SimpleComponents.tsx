import {createStyles, Link, StepConnector, Switch, Tabs, Theme, withStyles} from '@material-ui/core';
import {colors} from '../../assets/colors';
import React from 'react';


export const LinkButton = withStyles({
    root: {
        color: colors.tertiary,
        cursor: 'pointer'
    }
})(Link);

export const MatTabs = withStyles({
    root: {
        height: '100%',
        minHeight: 'auto'
    },
    indicator: {
        width: '100%',
        backgroundColor: colors.primary,
    }
})(Tabs);

export const CustomConnector = withStyles({
    vertical: {
        padding: 0,
        marginLeft: '7px'
    },
    lineVertical: {
        borderColor: colors.lightGrey,
        borderLeftWidth: '2px'
    }
})(StepConnector);

export const CustomSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 42,
            height: 22,
            padding: 0,
            paddingBottom: '2px',
            margin: theme.spacing(1),
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(20px)',
                color: colors.white,
                '& + $track': {
                    backgroundColor: colors.success,
                    border: `1px solid ${colors.success}`,
                    opacity: 1,
                },
            },
            '&$focusVisible $thumb': {
                color: colors.success,
                border: '6px solid #fff',
            },
        },
        thumb: {
            height: '18px',
            width: '18px',
            margin: '1px'
        },
        track: {
            borderRadius: '20px',
            border: `1px solid ${colors.midGrey}`,
            backgroundColor: colors.lightGrey,
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    })
)(({classes, ...props}: any) => (
    <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
        }}
        {...props}
    />
));

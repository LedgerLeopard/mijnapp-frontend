import React from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core';
import {colors} from '../../assets/colors';

const useStyles = makeStyles({
    root: {
        height: '100%',
        'z-index': '1000',
        width: '100%',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
    },
    top: {
        position: 'absolute',
        left: 0,
        marginLeft: 'calc(50% - 15px)',
        color: colors.primary,
        animationDuration: '550ms',
    },
    bottom: {
        marginLeft: 'calc(50% - 15px)',
        color: colors.lightGrey,
    },
    circle: {
        strokeLinecap: 'round',
    }
});

interface LoaderData {
    size?: number;
    thickness?: number;
}

const Loader = ({size = 40, thickness = 3.5}: LoaderData) => {
    const classes = useStyles();

    return (<div className={classes.root}>
        <CircularProgress
            variant="determinate"
            className={classes.bottom}
            size={size}
            thickness={thickness}
            value={100}
        />
        <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{circle: classes.circle}}
            size={size}
            thickness={thickness}
        />
    </div>);
};

export default Loader;

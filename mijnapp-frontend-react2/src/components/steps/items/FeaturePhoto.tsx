import React from 'react';
import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
    },
    photo: {
        height: '276px',
        overflow: 'hidden',
        width: 'fit-content',
        margin: 'auto',
        marginBottom: 0
    }
});

const FeaturePhoto = ({photo}: any) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.photo}>
                <img src={photo} alt={'Feature Photos'}/>
            </div>
        </div>
    );
};

export default FeaturePhoto;

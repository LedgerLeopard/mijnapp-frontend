import React from 'react';
import {makeStyles} from '@material-ui/core';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    root: {
        height: '4px',
        width: '100%',
        display: 'flex',
    },
    step: {
        width: '100%',
        margin: '0 2px',
        background: `linear-gradient(to right, ${colors.success}, ${colors.success} 50%, ${colors.background} 50%)`,
        backgroundSize: '205% 100%',
        backgroundPosition: '100%',
        transition: 'background-position 275ms ease',

        '&:first-child': {
            marginLeft: '0',
        },

        '&:last-child': {
            marginRight: '0',
        }
    },
    highlightedStep: {
        backgroundPosition: '0 100%',
    },
});

interface StepperData {
    steps: number | any[] | undefined;
    activeSteps: any[] | undefined;
}

const Stepper = ({steps = 0, activeSteps = []}: StepperData) => {
    const classes = useStyles();

    const getSteps = () => {
        return Array.isArray(steps) ? steps : Array.from({length: steps}, (v, i) => i);
    };

    return (
        <div className={classes.root}>
            {getSteps().map((step, index) =>
                <div key={'step-' + index}
                     className={classes.step + ' ' + (activeSteps.includes(step) ? classes.highlightedStep : '')}/>
            )}
        </div>
    );
};

export default Stepper;

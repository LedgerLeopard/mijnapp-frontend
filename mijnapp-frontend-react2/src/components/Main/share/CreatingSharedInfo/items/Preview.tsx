import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Ellipse from '../../../../../assets/icons/ellipse.svg';
import {CustomConnector} from '../../../../ui/SimpleComponents';
import {colors} from '../../../../../assets/colors';
import {useTranslation} from 'react-i18next';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    stepper: {
        borderRadius: '8px',
        boxShadow: `0px 8px 16px ${colors.lightGrey}`,
    },
    label: {
        color: colors.black
    },
    icon: {
        height: '16px',
        width: '16px',
        background: `url(${Ellipse}) no-repeat`,
    }
});

const Preview = () => {
    const classes = useStyles();
    const steps: string[] = ['what', 'whom', 'when', 'confirm'];
    const {t} = useTranslation();

    return (
        <div>
            <div className={classes.header}>{t('main.creatingSharedInfo.preview.header')}</div>
            <Stepper className={classes.stepper} activeStep={-1} orientation="vertical" connector={<CustomConnector/>}>
                {steps.map(label => (
                    <Step key={`key-${label}`}>
                        <StepLabel StepIconComponent={() => <div className={classes.icon}/>}>
                            <div className={classes.label}>{t(`main.creatingSharedInfo.preview.${label}`)}</div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default Preview;

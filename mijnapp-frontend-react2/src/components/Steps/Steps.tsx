import React, {useEffect, useState} from 'react';
import Stepper from '../ui/Stepper';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import StepOne from './items/StepOne';
import StepTwo from './items/StepTwo';
import StepThree from './items/StepThree';
import Header from '../ui/Header';
import {makeStyles} from '@material-ui/core';
import {ReactComponent as ArrowRight} from '../../assets/icons/arrow-right.svg';
import MatIconButton from '../ui/MatIconButton';
import {LinkButton} from '../ui/SimpleComponents';
import {useTranslation} from 'react-i18next';
import {colors} from '../../assets/colors';


const useStyles = makeStyles({
    root: {
        height: '100%',
        minHeight: '500px'
    },
    headerContainer: {
        minHeight: '50px'
    },
    wrapper: {
        height: 'calc(100% - 182px)',
        display: 'grid',
        backgroundColor: colors.background,
        padding: '28px 15px 0',
        boxSizing: 'border-box',
        overflow: 'auto'
    },
    buttonBlock: {
        minHeight: '98px',
        padding: '15px',
        boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.04)'
    }
});

const Steps = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();
    const [activeSteps, setActiveSteps]: any[] = useState([0]);
    const steps = ['step-one', 'step-two', 'step-three'];

    useEffect(() => {
        onRouteChange(history.location.pathname);
        const unListen = history.listen(route => {
            onRouteChange(route.pathname);
        });
        return () => unListen();
    }, []);

    const onRouteChange = (url: string) => {
        const path = url.substr(1);
        const step = steps.findIndex(step => path.includes(step));
        const array = Array.from({length: step + 1}, (v, i) => i);
        setActiveSteps(array);
    };

    const goToNextStep = () => {
        const step = (activeSteps.length - 1) + 1;
        if (step >= steps.length) return goToLogin();
        history.push(`/steps/${steps[step]}`);
    };

    const goToLogin = () => {
        history.push('/login');
    };

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <Header label={t('steps.header')}
                        button={<LinkButton onClick={goToLogin}>{t('steps.linkButton')}</LinkButton>}/>
                <Stepper steps={3} activeSteps={activeSteps}/>
            </div>
            <div className={classes.wrapper}>
                <Switch>
                    <Route exact path='/steps/step-one' component={StepOne}/>
                    <Route exact path='/steps/step-two' component={StepTwo}/>
                    <Route exact path='/steps/step-three' component={StepThree}/>
                    <Redirect from='/steps' to='/steps/step-one'/>
                </Switch>
            </div>
            <div className={classes.buttonBlock}>
                <MatIconButton label={activeSteps.length !== 3 ? t('steps.buttons.firstStep') : t('steps.buttons.lastStep')}
                               endIcon={ArrowRight}
                               endIconColor={'white'}
                               onClick={goToNextStep}/>
            </div>
        </div>
    );
};

export default Steps;

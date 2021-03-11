import React, {forwardRef, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Header from '../../../ui/Header';
import Stepper from '../../../ui/Stepper';
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import {colors} from '../../../../assets/colors';
import Loader from '../../../ui/Loader';
import MatIconButton from '../../../ui/MatIconButton';
import {ReactComponent as ArrowRight} from '../../../../assets/icons/arrow-right.svg';
import {ReactComponent as ArrowLeft} from '../../../../assets/icons/arrow-left.svg';
import {ReactComponent as Moving} from '../../../../assets/icons/truck.svg';
import StepOne from './items/StepOne';
import StepTwo from './items/StepTwo';
import StepThree from './items/StepThree';
import StepFour from './items/StepFour';
import StepFive from './items/StepFive';
import Preview from '../../../ui/Preview';
import dataChangeService from '../../../../services/dataChangeService';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '78px 1fr',
    },
    wrapper: {
        height: '100%',
        padding: '24px 15px',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
        overflow: 'auto'
    },
    content: {
        height: '100%',
        maxWidth: '1000px',
        position: 'relative',
        display: 'grid',
        gridTemplateRows: '1fr 168px',
        gridTemplateColumns: '100%',
        margin: 'auto',
    },
    blockButton: {
        marginTop: '24px'
    },
    backButton: {
        marginTop: '15px',
        color: colors.grey,
        backgroundColor: colors.background,

        '&:hover': {
            backgroundColor: colors.background,
        },
    }
});

enum Steps {
    Preview,
    One,
    Two,
    Three,
    Four,
    Five
}

const Transition = forwardRef(
    function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
        return <Slide direction="left" ref={ref} {...props} />;
    }
);

const ChangingUserData =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, dataUiStore: stores.dataUiStore, dataStore: stores.dataStore}))
    (observer(({popupUiStore, dataUiStore, dataStore}: Stores | any) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const [step, setStep] = useState<Steps>(Steps.Preview);
        const stepsName = ['newAddress', 'movingDate', 'withWhom', 'communicationData', 'confirmChanging'];
        const [activeSteps] = useState<Steps[]>([]);

        const onDestroy = () => {
            dataUiStore.clearData();
            dataStore.clearData();
        };

        useEffect(() => {
            return onDestroy;
        }, []);

        const changeUserData = () => {
            setLoading(true);
            dataChangeService.changeUserData(dataStore.getChangedUserData())
                .then(() => {
                    setLoading(false);
                    popupUiStore.openSuccess(t('main.changingUserData.success'));
                    popupUiStore.closeChangingUserData();
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        const close = () => {
            popupUiStore.closeChangingUserData();
        };

        const goToStart = () => {
            history.push('/main/dashboard/start');
            setTimeout(() => popupUiStore.closeChangingUserData());
        };

        const getHeaderIcon = () => {
            switch (popupUiStore.additionalUserData.get().type) {
                case 'moving':
                    return Moving;
            }
        };

        const goToNextStep = () => {
            const newStep = step + 1;
            if (newStep > Steps.Five) return changeUserData();
            setStep(newStep);
            activeSteps.push(step);
        };

        const goToBack = () => {
            const newStep = step - 1;
            if (newStep < Steps.Preview) return popupUiStore.closeChangingUserData();
            setStep(newStep);
            activeSteps.pop();
        };

        const getComponent = () => {
            switch (step) {
                case Steps.Preview:
                    return <Preview steps={stepsName}/>;
                case Steps.One:
                    return <StepOne changeStep={goToNextStep}/>;
                case Steps.Two:
                    return <StepTwo/>;
                case Steps.Three:
                    return <StepThree/>;
                case Steps.Four:
                    return <StepFour/>;
                case Steps.Five:
                    return <StepFive/>;
            }
        };

        const getNextLabelButton = (): string => {
            switch (step) {
                case Steps.Preview:
                    return 'nextFirst';
                case Steps.Four:
                    return 'nextLast';
                default:
                    return 'nextDefault';
            }
        };

        const getBackLabelButton = (): string => {
            switch (step) {
                case Steps.Preview:
                    return 'backFirst';
                default:
                    return 'backDefault';
            }
        };

        const disabled = (): boolean => {
            switch (step) {
                case Steps.Two:
                    return !dataStore.movingDate;
                case Steps.Four:
                    return !(dataUiStore.email.value && dataUiStore.email.valid && dataUiStore.phone.value && dataUiStore.phone.valid);
                default:
                    return false;
            }
        };

        return (
            <Dialog fullScreen
                    open={popupUiStore.changingUserData.get()}
                    onClose={close}
                    TransitionComponent={Transition}>
                <div className={classes.root}>
                    <div>
                        <Header label={popupUiStore.additionalUserData.get().header}
                                backButtonLabel={t('main.changingUserData.backButton')}
                                backButtonAction={goToStart}
                                icon={getHeaderIcon()}/>
                        <Stepper steps={5} activeSteps={activeSteps}/>
                    </div>
                    <div className={classes.wrapper}>
                        <div className={classes.content}>
                            {loading && <Loader/>}
                            {getComponent()}
                            <div className={classes.blockButton}>
                                {step !== Steps.One &&
                                <MatIconButton label={t('main.changingUserData.buttonNames.' + getNextLabelButton())}
                                               endIcon={ArrowRight}
                                               endIconColor={'white'}
                                               onClick={goToNextStep}
                                               disabled={disabled()}/>}
                                <MatIconButton label={t('main.changingUserData.buttonNames.' + getBackLabelButton())}
                                               customClasses={classes.backButton}
                                               startIcon={ArrowLeft}
                                               startIconColor={colors.grey}
                                               onClick={goToBack}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }));

export default ChangingUserData;

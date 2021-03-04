import React, {forwardRef, useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';
import Header from '../../../ui/Header';
import {makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {ReactComponent as Share} from '../../../../assets/icons/share.svg';
import {useHistory} from 'react-router-dom';
import Preview from './items/Preview';
import StepOne from './items/StepOne';
import StepTwo from './items/StepTwo';
import StepThree from './items/StepThree';
import StepFour from './items/StepFour';
import Stepper from '../../../ui/Stepper';
import MatIconButton from '../../../ui/MatIconButton';
import {ReactComponent as ArrowRight} from '../../../../assets/icons/arrow-right.svg';
import {ReactComponent as ArrowLeft} from '../../../../assets/icons/arrow-left.svg';
import {colors} from '../../../../assets/colors';
import {Organization} from '../../../../stores/SharedInformation/Organization';
import shareInfoService from '../../../../services/shareInfoService';
import Loader from '../../../ui/Loader';


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
    Four
}

const Transition = forwardRef(
    function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
        return <Slide direction="left" ref={ref} {...props} />;
    }
);

const CreatingSharedInfo =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, sharedDataStore: stores.sharedInformationStore}))
    (observer(({popupUiStore, sharedDataStore}: Stores | any) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const [step, setStep] = useState<Steps>(Steps.Preview);
        const [activeSteps] = useState<Steps[]>([]);

        useEffect(() => {
            return sharedDataStore.clearStore;
        }, []);

        const createSharedData = () => {
            setLoading(true);
            shareInfoService.createShareData(sharedDataStore.getShareData())
                .then(() => {
                    setLoading(false);
                    popupUiStore.openSuccess(
                        t('main.creatingSharedInfo.success.header'),
                        t('main.creatingSharedInfo.success.subheader')
                    );
                    popupUiStore.closeCreateSharedData();
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        };

        const close = () => {
            popupUiStore.closeCreateSharedData();
        };

        const goToStart = () => {
            history.push('/main/dashboard/start');
            setTimeout(() => popupUiStore.closeCreateSharedData());
        };

        const goToNextStep = () => {
            const newStep = step + 1;
            if (newStep > Steps.Four) return createSharedData();
            setStep(newStep);
            activeSteps.push(step);
        };

        const goToBack = () => {
            const newStep = step - 1;
            if (newStep < Steps.Preview) return popupUiStore.closeCreateSharedData();
            setStep(newStep);
            activeSteps.pop();
        };

        const getComponent = () => {
            switch (step) {
                case Steps.Preview:
                    return <Preview/>;
                case Steps.One:
                    return <StepOne/>;
                case Steps.Two:
                    return <StepTwo/>;
                case Steps.Three:
                    return <StepThree/>;
                case Steps.Four:
                    return <StepFour/>;
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
            return (step === Steps.One && !sharedDataStore.info._id)
                || (step === Steps.Two && (sharedDataStore.organizations.length === 0
                    || !sharedDataStore.organizations.some((o: Organization) => o.use)))
                || (step === Steps.Three && !sharedDataStore.uploadDate);
        };

        return (
            <Dialog fullScreen
                    open={popupUiStore.createSharedData.get()}
                    onClose={close}
                    TransitionComponent={Transition}>
                <div className={classes.root}>
                    <div>
                        <Header label={t('main.creatingSharedInfo.header')}
                                backButtonLabel={t('main.creatingSharedInfo.backButton')}
                                backButtonAction={goToStart}
                                icon={Share}/>
                        <Stepper steps={4} activeSteps={activeSteps}/>
                    </div>
                    <div className={classes.wrapper}>
                        <div className={classes.content}>
                            {loading && <Loader/>}
                            {getComponent()}
                            <div className={classes.blockButton}>
                                <MatIconButton label={t('main.creatingSharedInfo.buttonNames.' + getNextLabelButton())}
                                               endIcon={ArrowRight}
                                               endIconColor={'white'}
                                               onClick={goToNextStep}
                                               disabled={disabled()}/>
                                <MatIconButton label={t('main.creatingSharedInfo.buttonNames.' + getBackLabelButton())}
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

export default CreatingSharedInfo;

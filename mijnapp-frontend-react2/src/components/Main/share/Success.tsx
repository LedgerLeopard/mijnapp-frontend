import React, {forwardRef} from 'react';
import {makeStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import MatIconButton from '../../ui/MatIconButton';
import {ReactComponent as ArrowRight} from '../../../assets/icons/arrow-right.svg';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import {useTranslation} from 'react-i18next';
import {ReactComponent as CheckMark} from '../../../assets/icons/check-mark.svg';
import Icon from '../../ui/Icon';
import {colors} from '../../../assets/colors';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    dialog: {
        boxSizing: 'border-box',
    },
    root: {
        height: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateRows: '0.4fr 1fr 80px 140px',
        margin: 'auto',
    },
    wrapper: {
        height: '100%',
        padding: '15px',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
        overflow: 'auto'
    },
    header: {
        marginTop: 'auto',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '26px'
    },
    imgContainer: {
        height: '255px',
        width: '255px',
        margin: '64px auto 20px auto',
        backgroundColor: '#E1EDDB',
        borderRadius: '100%',
        textAlign: 'center'
    },
    img: {
        height: 'calc(100% - 8px)',
        width: '100px',
        margin: 'auto'
    },
    subheader: {
        textAlign: 'center',
        color: colors.black
    },
    button: {
        margin: '20px 0'
    }
});

const Transition = forwardRef(
    function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
        return <Slide direction="left" ref={ref} {...props} />;
    }
);

const Success =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore}))
    (observer(({popupUiStore}: Stores | any) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();

        const close = () => {
            history.replace('main/dashboard/start');
            popupUiStore.closeSuccess();
        };

        return (
            <Dialog fullScreen
                    className={classes.dialog}
                    open={popupUiStore.success.get()}
                    onClose={close}
                    TransitionComponent={Transition}>
                <div className={classes.wrapper}>
                    <div className={classes.root}>
                        <div className={classes.header}>{popupUiStore.successHeader.get()}</div>
                        <div className={classes.imgContainer}>
                            <Icon className={classes.img} fullWidthIcon icon={CheckMark} color={colors.success}/>
                        </div>
                        <div className={classes.subheader}>{popupUiStore.successSubheader.get()}</div>
                        <MatIconButton customClasses={classes.button}
                                       label={t('main.success.button')}
                                       endIcon={ArrowRight}
                                       onClick={close}
                                       endIconColor={'white'}/>
                    </div>
                </div>
            </Dialog>
        );
    }));

export default Success;

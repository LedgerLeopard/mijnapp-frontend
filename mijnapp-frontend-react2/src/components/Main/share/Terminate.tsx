import React, {forwardRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Icon from '../../ui/Icon';
import {colors} from '../../../assets/colors';
import MatIconButton from '../../ui/MatIconButton';
import {DialogContent, makeStyles} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import {inject, observer} from 'mobx-react';
import Stores from '../../../models/Stores';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {useTranslation} from 'react-i18next';
import {ReactComponent as ArrowLeft} from '../../../assets/icons/arrow-left.svg';


const useStyles = makeStyles({
    root: {
        boxSizing: 'border-box',
        backgroundColor: colors.background,

        '&:first-child': {
            padding: '5px'
        }
    },
    dialog: {
        margin: '10px'
    },
    header: {
        width: '100%',
        display: 'flex'
    },
    title: {
        margin: 'auto auto auto 10px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    closeButton: {
        height: 'auto',
        width: 'auto',
        padding: 0,
        paddingLeft: '2px',
        margin: 'auto 0 auto auto',
        color: colors.grey,
        backgroundColor: colors.background,
        borderRadius: 0,
        borderLeft: `1px dashed ${colors.black}`,

        '&:hover': {
            backgroundColor: colors.midGrey,
        },
    },
    closeButtonContent: {
        height: '40px',
        width: '40px',
        textAlign: 'center',
        fontSize: '12px'
    },
    icon: {
        justifyContent: 'center'
    },
    text: {
        margin: '14px 10px 10px 10px',
        fontSize: '16px',
        lineHeight: '22px',
    },
    blockButton: {
        padding: '10px'
    },
    terminateButton: {
        backgroundColor: colors.error,

        '&:hover': {
            backgroundColor: '#F22626',
        },
    },
    backButton: {
        marginTop: '15px',
        color: colors.grey,
        backgroundColor: colors.background,

        '&:hover': {
            backgroundColor: colors.background,
        },
    },
});

const Transition = forwardRef(
    function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

const Terminate =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore}))
    (observer(({popupUiStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();

        const confirmTerminate = () => popupUiStore.closeTerminate(true);

        const close = () => popupUiStore.closeTerminate();

        return (
            <Dialog classes={{paper: classes.dialog}}
                    open={popupUiStore.terminate.get()}
                    onClose={close}
                    TransitionComponent={Transition}>
                <DialogContent className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.title}>{t('main.terminate.header')}</div>
                        <MatIconButton customClasses={classes.closeButton}
                                       onClick={close}
                                       label={
                                           <div className={classes.closeButtonContent}>
                                               <Icon className={classes.icon} icon={CloseOutlinedIcon} color={colors.grey}/>
                                               SLUT
                                           </div>
                                       }/>
                    </div>
                    <div className={classes.text}>{t('main.terminate.text')}</div>
                    <div className={classes.blockButton}>
                        <MatIconButton customClasses={classes.terminateButton}
                                       label={t('main.terminate.confirm')}
                                       onClick={confirmTerminate}/>
                        <MatIconButton customClasses={classes.backButton}
                                       label={t('main.terminate.cancel')}
                                       startIcon={ArrowLeft}
                                       startIconColor={colors.grey}
                                       onClick={close}/>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }));

export default Terminate;

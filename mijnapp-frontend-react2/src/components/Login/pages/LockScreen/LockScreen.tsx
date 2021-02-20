import MatIconButton from '../../../ui/MatIconButton';
import React from 'react';
import {makeStyles} from '@material-ui/core';
import Fingerprint from '../../../../assets/icons/fingerprint.png';
import {colors} from '../../../../assets/colors';
import {useTranslation} from 'react-i18next';
import {LinkButton} from '../../../ui/SimpleComponents';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: '15px',
        display: 'grid',
        gridTemplateRows: '1fr 182px',
        background: `url(${Fingerprint}) no-repeat left bottom`,
        boxSizing: 'border-box'
    },
    title: {
        margin: 'auto',
        marginLeft: '0'
    },
    header: {
        fontSize: '26px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: colors.black
    },
    subheader: {
        marginTop: '16px',
        fontStyle: 'italic',
        fontWeight: 'normal',
        fontSize: '23px',
        color: colors.black
    },
    buttonsBlock: {
        display: 'flex',
        marginTop: '10px'
    },
    blackButton: {
        height: '40px',
        width: '40px',
        padding: 0,
        margin: 'auto',
        marginLeft: '10px',
        backgroundColor: colors.black,

        '&:hover': {
            backgroundColor: colors.black,
        },
    },
    text: {
        marginTop: '30px'
    },
    logo: {
        display: 'flex',
        marginTop: '10px',
        fontSize: '14px',
        padding: '4px',
        boxSizing: 'border-box'
    },
    firstText: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: colors.black
    },
    additionalText: {
        marginTop: '5px',
    },
});

const LockScreen = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();

    const goTo = () => {
        history.push('/login/variant-login');
    };

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <div className={classes.header}>{t('login.lockScreen.header')}</div>
                <div className={classes.subheader}>{t('login.lockScreen.subheader')}</div>
            </div>
            <div>
                <div className={classes.buttonsBlock}>
                    <MatIconButton label={t('login.lockScreen.button')} onClick={goTo}/>
                    <MatIconButton customClasses={classes.blackButton}
                                   label={
                                       <div className={classes.logo}>
                                           <div>Dig</div>
                                           <div style={{color: colors.primary}}>iD</div>
                                       </div>
                                   }/>
                </div>
                <div className={classes.text}>
                    <div className={classes.firstText}>{t('login.lockScreen.firstText')}</div>
                    <div className={classes.additionalText}>
                        {t('login.lockScreen.additionalText')}
                        <LinkButton href='https://www.digid.nl/' target='_blank' rel='noreferrer'>www.digid.nl</LinkButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LockScreen;

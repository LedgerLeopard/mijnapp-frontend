import React, {useState} from 'react';
import {makeStyles, Tab} from '@material-ui/core';
import Logo from '../../../../assets/icons/coat-of-arms-logo.png';
import {ReactComponent as WarningIcon} from '../../../../assets/icons/warning.svg';
import {ReactComponent as ArrowLeft} from '../../../../assets/icons/direction-to-the-left.svg';
import {ReactComponent as ArrowRight} from '../../../../assets/icons/direction-to-the-right.svg';
import Hand from '../../../../assets/icons/hand-with-phone.svg';
import {colors} from '../../../../assets/colors';
import {LinkButton, MatTabs} from '../../../ui/SimpleComponents';
import Icon from '../../../ui/Icon';
import MatIconButton from '../../../ui/MatIconButton';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        overflow: 'auto',
        padding: '0 15px 0 15px',
        boxSizing: 'border-box',
        color: colors.white,
        backgroundColor: '#1E1E1E',
        gridTemplateRows: '15px 40px 1fr 12px'
    },
    picture: {
        height: '128px',
        background: `url(${Logo}) no-repeat center top`,
    },
    languageTabs: {
        height: '36px'
    },
    tab: {
        height: '40px',
        minHeight: 'auto',
        minWidth: '10px',
        padding: '5px',
        marginLeft: '15px',

        '&:first-child': {
            marginLeft: 0
        }
    },
    container: {
        width: 'fit-content',
        display: 'grid',
        margin: '0 auto',
        gridTemplateRows: '160px 1fr 90px 70px'
    },
    logoBlock: {
        display: 'flex',
        margin: 'auto auto 0px 0'
    },
    logo: {
        height: '40px',
        width: '40px',
        marginRight: '10px',
        borderRadius: '8px',
        display: 'flex',
        fontSize: '14px',
        padding: '4px',
        backgroundColor: 'black',
        boxSizing: 'border-box'
    },
    textLogo: {
        display: 'flex',
        margin: 'auto auto 3px auto'
    },
    logoHeader: {
        fontWeight: 'bold'
    },
    logoSubheader: {
        paddingTop: '5px',
        fontSize: '14px'
    },
    contentWrapper: {
        padding: '40px 0'
    },
    header: {
        marginBottom: '10px',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    warningBlock: {
        display: 'flex',
        backgroundColor: colors.black,
        borderRadius: '4px',
        padding: '10px',
        boxSizing: 'border-box',
        marginBottom: '20px'
    },
    warningIcon: {
        height: '18px',
        width: '18px',
        padding: '3px',
        margin: '0 !important'
    },
    warningText: {
        fontSize: '14px',
        lineHeight: '20px',
        marginLeft: '10px',
        padding: '3px 0',
    },
    oneTimeLoginButton: {
        height: 'auto',
        textAlign: 'start',
        border: `1px solid ${colors.primary}`,
        backgroundColor: colors.black,
        paddingLeft: '82px',
        background: `url(${Hand}) no-repeat left bottom`,
        backgroundSize: '68px 92px'
    },
    textBlock: {
        lineHeight: '24px',
        padding: '16px 0',
        boxSizing: 'border-box'
    },
    headerButton: {
        fontSize: '18px',
        fontWeight: 'bold'
    },
    subheaderButton: {
        fontSize: '14px',
    },
    loginButton: {
        marginTop: '20px',
        border: `1px solid ${colors.white}`,
        backgroundColor: colors.black,

        '&:hover': {
            backgroundColor: colors.white,
            color: colors.black
        }
    },
    backButton: {
        height: '24px',
        width: '98px',
        display: 'flex',
        color: colors.white
    },
    buttonText: {
        margin: 'auto'
    },
    tailLogo: {
        width: '48px',
        margin: '0 auto 0 auto',
        backgroundColor: colors.secondary
    },
});

const VariantLogin = () => {
    const classes = useStyles();
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const languageTabs = ['en', 'nl'];

    const getCurrentLanguage = (): number => {
        const language = localStorage.getItem('i18nextLng') || 'en';
        return languageTabs.findIndex(tab => tab === language);
    };

    const [language, setLanguage] = useState(getCurrentLanguage());

    const changeLanguage = (event: React.ChangeEvent<{}>, newValue: number) => {
        setLanguage(newValue);
        i18n.changeLanguage(languageTabs[newValue]).then();
        localStorage.setItem('i18nextLng', languageTabs[newValue]);
    };

    const goToLogin = () => {
        history.push('/login/signIn');
    };

    const goBack = () => {
        history.push('/login/lock-screen');
    };

    return (
        <div className={classes.root}>
            <div className={classes.picture}/>
            <MatTabs className={classes.languageTabs} value={language} onChange={changeLanguage} aria-label="Languages">
                {languageTabs.map(item => <Tab key={item} className={classes.tab} label={item}/>)}
            </MatTabs>
            <div className={classes.container}>
                <div className={classes.logoBlock}>
                    <div className={classes.logo}>
                        <div className={classes.textLogo}>
                            <div>Dig</div>
                            <div style={{color: colors.primary}}>iD</div>
                        </div>
                    </div>
                    <div>
                        <div className={classes.logoHeader}>{t('login.variantLogin.logoHeader')}</div>
                        <div className={classes.logoSubheader}>{t('login.variantLogin.logoSubheader')}</div>
                    </div>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.header}>{t('login.variantLogin.header')}</div>
                    <div className={classes.warningBlock}>
                        <Icon className={classes.warningIcon} icon={WarningIcon}/>
                        <div className={classes.warningText}>
                            {t('login.variantLogin.warningTextPart1')}
                            {t('login.variantLogin.warningTextPart2')}
                        </div>
                    </div>
                    <MatIconButton customClasses={classes.oneTimeLoginButton}
                                   label={
                                       <div className={classes.textBlock}>
                                           <div className={classes.headerButton}>
                                               {t('login.variantLogin.alternateLoginButtonTitle')}
                                           </div>
                                           <div className={classes.subheaderButton}>
                                               {t('login.variantLogin.alternateLoginButtonText')}
                                           </div>
                                       </div>}
                                   endIcon={ArrowRight}
                                   endIconColor={colors.white}/>

                    <MatIconButton customClasses={classes.loginButton}
                                   label={t('login.variantLogin.loginButtonText')}
                                   endIcon={ArrowRight}
                                   endIconColor={colors.white}
                                   onClick={goToLogin}/>
                </div>
                <LinkButton className={classes.backButton} onClick={goBack}>
                    <Icon icon={ArrowLeft} color={colors.white}/>
                    <div className={classes.buttonText}>{t('login.variantLogin.cancel')}</div>
                </LinkButton>
                <div>
                    <LinkButton>{t('login.variantLogin.linkText')}</LinkButton>
                </div>
            </div>
            <div className={classes.tailLogo}/>
        </div>
    );
};

export default VariantLogin;

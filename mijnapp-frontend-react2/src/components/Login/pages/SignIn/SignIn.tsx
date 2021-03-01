import React, {useState} from 'react';
import {Checkbox, FormControlLabel, makeStyles} from '@material-ui/core';
import Logo from '../../../../assets/icons/coat-of-arms-logo.png';
import {ReactComponent as ArrowLeft} from '../../../../assets/icons/direction-to-the-left.svg';
import {ReactComponent as ArrowRight} from '../../../../assets/icons/direction-to-the-right.svg';
import {colors} from '../../../../assets/colors';
import {LinkButton} from '../../../ui/SimpleComponents';
import Icon from '../../../ui/Icon';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import MatIconButton from '../../../ui/MatIconButton';
import MatInput from '../../../ui/MatInput';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';
import Loader from '../../../ui/Loader';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        position: 'relative',
        overflow: 'auto',
        padding: '0 15px 0 15px',
        boxSizing: 'border-box',
        color: colors.white,
        backgroundColor: '#1E1E1E',
        gridTemplateRows: '55px 1fr 12px'
    },
    picture: {
        height: '128px',
        background: `url(${Logo}) no-repeat center top`,
    },
    container: {
        width: 'fit-content',
        display: 'grid',
        margin: '0 auto',
        gridTemplateRows: '160px 1fr 100px'
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
    input: {
        height: '75px',
        width: '100%',
        marginTop: '20px'
    },
    checkBox: {
        color: colors.primary,
        '&$checked': {
            color: colors.primary,
        },
    },
    buttonBlock: {
        display: 'flex',
        marginTop: '35px'
    },
    loginButton: {
        width: '150px',
        margin: 'auto 0 auto auto',
        backgroundColor: colors.black,

        '&:disabled': {
            backgroundColor: colors.grey,
        }
    },
    backButton: {
        height: '24px',
        width: '98px',
        display: 'flex',
        margin: 'auto auto auto 0',
        color: colors.white
    },
    buttonText: {
        margin: 'auto'
    },
    link: {
        width: 'fit-content',
        display: 'block',
        marginBottom: '10px'
    },
    tailLogo: {
        width: '48px',
        margin: '0 auto 0 auto',
        backgroundColor: colors.secondary
    },
    checked: {},
});

const SignIn =
    inject((stores: Stores) => ({authStore: stores.authStore}))
    (observer(({authStore}: Stores) => {
        const classes = useStyles();
        const history = useHistory();
        const {t} = useTranslation();
        const [loader, setLoader] = useState(false);
        const [authData, setAuthData] = useState({
            login: '',
            password: '',
            remember: false
        });

        const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
            setAuthData({...authData, remember: event.target.checked});
        };

        const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            setAuthData({...authData, [event.target.id]: event.target.value});
        };

        const login = () => {
            setLoader(true);
            authStore.login(authData.login, authData.password)
                .then(() => {
                    setLoader(false);
                    history.push('/main/dashboard/notification');
                })
                .catch(error => console.log(error));
        };

        const goBack = () => {
            history.push('/login/variant-login');
        };

        return (
            <div className={classes.root}>
                <div className={classes.picture}/>
                {loader && <Loader/>}
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
                        <div className={classes.header}>{t('login.signIn.header')}</div>
                        <MatInput id='login'
                                  className={classes.input}
                                  label={t('login.signIn.loginField')}
                                  value={authData.login}
                                  onChange={handleChangeInput}
                                  required/>
                        <MatInput id='password'
                                  className={classes.input}
                                  isSecret
                                  label={t('login.signIn.passwordField')}
                                  value={authData.password}
                                  onChange={handleChangeInput}
                                  required/>
                        <FormControlLabel
                            control={<Checkbox classes={{root: classes.checkBox, checked: classes.checked}}
                                               color='default'
                                               checked={authData.remember}
                                               onChange={handleChangeCheckbox}/>}
                            label={t('login.signIn.rememberField')}/>

                        <div className={classes.buttonBlock}>
                            <LinkButton className={classes.backButton} onClick={goBack}>
                                <Icon icon={ArrowLeft} color={colors.white}/>
                                <div className={classes.buttonText}>{t('login.signIn.cancel')}</div>
                            </LinkButton>

                            <MatIconButton customClasses={classes.loginButton}
                                           label={t('login.signIn.loginButton')}
                                           endIcon={ArrowRight}
                                           endIconColor={colors.white}
                                           onClick={login}
                                           disabled={!authData.login || !authData.password}/>
                        </div>
                    </div>
                    <div>
                        <LinkButton className={classes.link}>{t('login.signIn.firstLink')}</LinkButton>
                        <LinkButton className={classes.link}>{t('login.signIn.secondLink')}</LinkButton>
                    </div>
                </div>
                <div className={classes.tailLogo}/>
            </div>
        );
    }));

export default SignIn;

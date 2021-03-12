import React, {useState} from 'react';
import MatIconButton from '../../../ui/MatIconButton';
import {ReactComponent as Logout} from '../../../../assets/icons/logout.svg';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {FormControl, InputLabel, makeStyles, MenuItem} from '@material-ui/core';
import {colors} from '../../../../assets/colors';
import {MatSelect} from '../../../ui/SimpleComponents';


const useStyles = makeStyles({
    root: {
        height: '100%',
        maxWidth: '1000px',
        margin: 'auto',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'auto'
    },
    logout: {
        backgroundColor: colors.error,

        '&:hover': {
            backgroundColor: '#F22626',
        },
    },
    select: {
        width: '100%',
        margin: '16px 0',
        backgroundColor: colors.white
    }
});

const Settings = () => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const history = useHistory();
    const languages = ['en', 'nl'];

    const getCurrentLanguage = (): number => {
        const language = localStorage.getItem('i18nextLng') || 'en';
        return languages.findIndex(l => l === language);
    };

    const [language, setLanguage] = useState(getCurrentLanguage());

    const changeLanguage = (event: React.ChangeEvent<any>) => {
        const value = event.target.value;
        setLanguage(value);
        i18n.changeLanguage(languages[value]).then();
        localStorage.setItem('i18nextLng', languages[value]);
    };

    const logout = () => history.replace('/login');

    return (
        <div className={classes.root}>
            <FormControl className={classes.select} variant="outlined">
                <InputLabel id='select-language-label'>{t('main.dashboard.settings.label')}</InputLabel>
                <MatSelect id='select-language'
                        labelId='select-language-label'
                        value={language}
                        onChange={changeLanguage}
                        label={t('main.dashboard.settings.label')}>
                    <MenuItem value={0}>{t('main.dashboard.settings.english')}</MenuItem>
                    <MenuItem value={1}>{t('main.dashboard.settings.dutch')}</MenuItem>
                </MatSelect>
            </FormControl>
            <MatIconButton label={t('main.dashboard.settings.logout')}
                           customClasses={classes.logout}
                           endIcon={Logout}
                           endIconColor={'white'}
                           onClick={logout}/>
        </div>
    );
};

export default Settings;

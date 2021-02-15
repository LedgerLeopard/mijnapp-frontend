import React, {useState} from 'react';
import {makeStyles, Tab} from '@material-ui/core';
import Logo from '../../../../assets/icons/coat-of-arms-logo.png';
import {colors} from '../../../../assets/colors';
import {MatTabs} from '../../../ui/SimpleComponents';


const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: '15px',
        display: 'grid',
        gridTemplateRows: '40px 20%',
        background: `url(${Logo}) no-repeat center top`,
        backgroundColor: colors.black,
        boxSizing: 'border-box',
        color: colors.white
    },
    languageTabs: {
        height: '36px',
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
    logoBlock: {
        height: '40px',
        width: '40px',
        display: 'flex',
        borderRadius: '8px',
        margin: 'auto',
    },

    logo: {
        display: 'flex',
        margin: 'auto',
        marginBottom: 0,
        fontSize: '14px',
        padding: '4px',
        backgroundColor: 'black',
        boxSizing: 'border-box'
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
    container: {},
    button: {},
    tailLogo: {},
});

const VariantLogin = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState(1);
    const languageTabs = ['EN', 'Nl'];

    const changeLanguage = (event: React.ChangeEvent<{}>, newValue: number) => {
        setLanguage(newValue);
    };

    return (
        <div className={classes.root}>
            <MatTabs className={classes.languageTabs} value={language} onChange={changeLanguage} aria-label="Languages">
                {languageTabs.map(item => <Tab key={item} className={classes.tab} label={item}/>)}
            </MatTabs>
            <div className={classes.logoBlock}>
                <div className={classes.logo}>
                    <div>Dig</div>
                    <div style={{color: colors.primary}}>iD</div>
                </div>
            </div>
            <div className={classes.container}>
                <div>Hoe wilt u inloggen</div>
                <div>picture 1</div>
                <div>picture 2</div>
                <div>button</div>
            </div>
            <div className={classes.button}>Annuleren</div>
            <div>Nog geen</div>
            <div className={classes.tailLogo}/>

        </div>
    );
};

export default VariantLogin;

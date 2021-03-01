import React from 'react';
import Header from '../../ui/Header';
import MatIconButton from '../../ui/MatIconButton';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core';
import {colors} from '../../../assets/colors';
import Icon from '../../ui/Icon';
import {ReactComponent as Add} from '../../../assets/icons/plus.svg';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '78px 1fr',
    },
    addButton: {
        height: '32px',
        width: '32px',
        padding: 0,
        borderRadius: '50%',
        backgroundColor: colors.white,

        '&:hover': {
            backgroundColor: colors.midGrey,
        },
    },
    wrapper: {
        height: '100%',
        padding: '24px 15px',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
    },
    content: {
        height: '100%',
        margin: 'auto',
        maxWidth: '1000px',
    },
    textContent: {
        fontSize: '16px',
        lineHeight: '22px',
        color: colors.grey
    }
});

const SharedDataList = () => {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();

    const goBack = () => {
        history.goBack();
    };

    return (
        <div className={classes.root}>
            <Header label={t('Gedeelde gegevens')}
                    backButtonLabel={t('Terug naar Start')}
                    backButtonAction={goBack}
                    endComponent={<MatIconButton customClasses={classes.addButton} label={<Icon icon={Add}/>}/>}/>
            <div className={classes.wrapper}>

                <div className={classes.content}>
                    <div className={classes.textContent}>
                        {t('Je hebt op dit moment nog niets gedeeld. Druk op het plusje om te beginnen met het delen van je gegevens.')}
                    </div>

                    {/*{items.map((item, index) => (*/}
                    {/*    <Button key={'key-' + index + '-' + item._id}*/}
                    {/*            className={classes.card}*/}
                    {/*            variant='contained'*/}
                    {/*            onClick={() => goTo(item._id)}*/}
                    {/*            disableElevation>*/}
                    {/*        <div className={classes.cardContent}>*/}
                    {/*            <Icon className={classes.cardIcon} fullWidthIcon={true} icon={Truck}/>*/}
                    {/*            <div className={classes.cardTextContent}>*/}
                    {/*                <div className={classes.cardHeader}>{item.header}</div>*/}
                    {/*                {item.subheader && <div className={classes.cardSubheader}>{item.subheader}</div>}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Button>))}*/}

                </div>
            </div>
        </div>
    );
};

export default SharedDataList;

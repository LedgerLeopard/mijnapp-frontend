import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core';
import {colors} from '../../../../../assets/colors';
import MatInput from '../../../../ui/MatInput';
import {ValidatedValue} from '../../../../../models/ValidatedValue';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    text: {
        color: colors.black,
        lineHeight: '22px',
        marginBottom: '16px'
    },
    content: {
        marginTop: '16px'
    },
    input: {
        width: '100%',
        marginBottom: '16px'
    }
});

const StepFour =
    inject((stores: Stores) => ({dataStore: stores.dataStore, dataUiStore: stores.dataUiStore}))
    (observer(({dataStore, dataUiStore}: any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const email: ValidatedValue = dataUiStore.email;
        const phone: ValidatedValue = dataUiStore.phone;

        const setValue = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
            dataUiStore.setValidatedUiData(field, event.target.value);
            if (email.valid) dataStore.setChangingUserData({email: email.value});
            if (phone.valid) dataStore.setChangingUserData({phone: phone.value});
        };

        return (
            <div>
                <div className={classes.header}>{t('main.changingUserData.stepFour.header')}</div>
                <div className={classes.text}>{t('main.changingUserData.stepFour.text')}</div>
                <div className={classes.content}>
                    <MatInput className={classes.input}
                              label={t('main.changingUserData.stepFour.email')}
                              placeholder={t('main.changingUserData.stepFour.emailPlaceholder')}
                              value={email.value}
                              valid={!email.valid}
                              required={email.required}
                              onChange={(event: any) => setValue(event, 'email')}/>
                    <MatInput className={classes.input}
                              label={t('main.changingUserData.stepFour.phone')}
                              placeholder={t('main.changingUserData.stepFour.phonePlaceholder')}
                              value={phone.value}
                              valid={!phone.valid}
                              required={phone.required}
                              onChange={(event: any) => setValue(event, 'phone')}/>
                </div>
            </div>
        );
    }));

export default StepFour;

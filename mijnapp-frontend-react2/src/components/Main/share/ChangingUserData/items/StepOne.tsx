import React, {useState} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../../assets/colors';
import MatInput from '../../../../ui/MatInput';
import WarningIcon from '@material-ui/icons/Warning';
import Icon from '../../../../ui/Icon';
import {delay} from '../../../../../share/utils';
import Loader from '../../../../ui/Loader';
import dataChangeService from '../../../../../services/dataChangeService';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';
import {ValidatedValue} from '../../../../../models/ValidatedValue';


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
    dataBlock: {
        flexWrap: 'wrap',
        marginBottom: '14px'
    },
    input: {
        minWidth: '90px',
        width: 'calc(30% - 16px)',
        marginRight: '16px',
        marginBottom: '10px',

        '&:first-child': {
            width: 'calc(40% - 16px)'
        },
        '&:last-child': {
            marginRight: 'auto',
        }
    },
    inputLabel: {
        fontStyle: 'italic',
        color: colors.grey,
    },
    errorMessage: {
        display: 'flex',
        marginBottom: '10px'
    },
    icon: {
        height: '100%',
        width: '80px',
        margin: '0px 10px 0px 0px'
    },
    warningText: {
        margin: 'auto'
    },
    addresses: {
        height: 'calc(100% - 186px)',
        position: 'relative',
    },
    paper: {
        width: '100%',
        padding: '16px',
        lineHeight: '22px',
        marginBottom: '16px',
        borderRadius: '8px',
        border: `1px solid ${colors.lightGrey}`,
        backgroundColor: colors.white,
        textTransform: 'none',
        fontSize: '16px',
        textAlign: 'initial',
        justifyContent: 'initial',

        '&:hover': {
            backgroundColor: colors.midGrey,
        },
    }
});

const StepOne =
    inject((stores: Stores) => ({dataStore: stores.dataStore, dataUiStore: stores.dataUiStore}))
    (observer(({changeStep, dataStore, dataUiStore}: any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const [warning, setWarning] = useState(false);
        const postcode: ValidatedValue = dataUiStore.postcode;
        const houseNumber: ValidatedValue = dataUiStore.houseNumber;
        const additionalData: ValidatedValue = dataUiStore.additionalData;
        const addresses: { _id: string, data: string }[] = dataUiStore.addresses;

        const searchAddress = () => {
            if (!postcode.value) dataUiStore.setUiData({addresses: []});
            if (!postcode.value || !postcode.valid || !houseNumber.value || !houseNumber.valid) return;
            setLoading(true);
            delay(() => {
                dataChangeService.searchAddress(postcode.value, houseNumber.value, additionalData.value)
                    .then(addresses => {
                        dataUiStore.setUiData({addresses: addresses});
                        setLoading(false);
                        setWarning(!(addresses.length > 0));
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
            }, 500);
        };

        const selectAddress = (id: string) => {
            dataStore.setChangingUserData({addressId: id});
            changeStep();
        };

        const setValue = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
            dataUiStore.setValidatedUiData(field, event.target.value);
            searchAddress();
        };

        return (
            <div>
                <div className={classes.header}>{t('main.changingUserData.stepOne.headerOne')}</div>
                <div className={classes.text}>{t('main.changingUserData.stepOne.text')}</div>
                <div className={classes.dataBlock}>
                    <MatInput className={classes.input}
                              label={t('main.changingUserData.stepOne.postcode')}
                              labelClass={classes.inputLabel}
                              value={postcode.value}
                              valid={!postcode.valid}
                              required={postcode.required}
                              onChange={(event: any) => setValue(event, 'postcode')}/>
                    <MatInput className={classes.input}
                              label={t('main.changingUserData.stepOne.houseNumber')}
                              labelClass={classes.inputLabel}
                              value={houseNumber.value}
                              valid={!houseNumber.valid}
                              required={houseNumber.required}
                              onChange={(event: any) => setValue(event, 'houseNumber')}/>
                    <MatInput className={classes.input}
                              label={t('main.changingUserData.stepOne.additionalData')}
                              labelClass={classes.inputLabel}
                              value={additionalData.value}
                              valid={!additionalData.valid}
                              required={additionalData.required}
                              onChange={(event: any) => setValue(event, 'additionalData')}/>
                </div>
                {warning && !loading && <div className={classes.errorMessage}>
                    <Icon className={classes.icon} icon={WarningIcon} color={colors.error} fullWidthIcon/>
                    <div className={classes.warningText}>
                        {t('main.changingUserData.stepOne.warningText')}
                    </div>
                </div>}
                <div className={classes.addresses}>
                    {loading && <Loader/>}
                    {addresses.length > 0 && <>
                        <div className={classes.header}>{t('main.changingUserData.stepOne.headerTwo')}</div>
                        {addresses.map((address: { _id: string, data: string }, index: number) => (
                            <Button key={'key-' + index + '-' + address._id}
                                    className={classes.paper}
                                    onClick={() => selectAddress(address._id)}>
                                {address.data}
                            </Button>
                        ))}
                    </>}
                </div>
            </div>
        );
    }));

export default StepOne;

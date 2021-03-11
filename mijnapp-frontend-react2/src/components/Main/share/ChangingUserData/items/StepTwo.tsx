import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core';
import {colors} from '../../../../../assets/colors';
import MatInput from '../../../../ui/MatInput';
import {DatePicker} from '@material-ui/pickers';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px'
    },
    text: {
        color: colors.black,
        lineHeight: '22px',
        marginBottom: '16px'
    },
    subheader: {
        fontSize: '18px',
        marginBottom: '8px'
    },
    dataBlock: {
        flexWrap: 'wrap',
        marginBottom: '14px'
    },
    input: {
        width: '48px',
        minWidth: '48px',
        marginRight: '16px',
        marginBottom: '10px',

        '&:last-child': {
            width: '70px',
            marginRight: 'auto',
        }
    },
    inputLabel: {
        fontStyle: 'italic',
        color: colors.grey,
    },
    datePicker: {
        display: 'none'
    }
});

const StepTwo =
    inject((stores: Stores) => ({dataStore: stores.dataStore, dataUiStore: stores.dataUiStore}))
    (observer(({dataStore, dataUiStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [isOpenDate, setIsOpenDate] = useState(false);
        const [isOpenMonth, setIsOpenMonth] = useState(false);
        const [isOpenYear, setIsOpenYear] = useState(false);
        const inputDate = useRef<HTMLInputElement>(null);
        const inputMonth = useRef<HTMLInputElement>(null);
        const inputYear = useRef<HTMLInputElement>(null);
        const date: Date | string = dataUiStore.date;
        const month: Date | string = dataUiStore.month;
        const year: Date | string = dataUiStore.year;

        const openDatePicker = (inputRef: any, mode: 'date' | 'month' | 'year', state: any) => {
            state(true);
            inputRef.current?.blur();
        };

        const setDate = (mode: 'date' | 'month' | 'year', date: Date | null) => {
            dataUiStore.setUiDate(mode, date, dataStore);
        };

        return (
            <div>
                <div className={classes.header}>{t('main.changingUserData.stepTwo.header')}</div>
                <div className={classes.text}>{t('main.changingUserData.stepTwo.text')}</div>
                <div className={classes.subheader}>{t('main.changingUserData.stepTwo.subheader')}</div>
                <div className={classes.dataBlock}>
                    <MatInput id='date'
                              className={classes.input}
                              label={t('main.changingUserData.stepTwo.day')}
                              inputRef={inputDate}
                              labelClass={classes.inputLabel}
                              value={date instanceof Date ? date.getDate() : date}
                              onFocus={() => openDatePicker(inputDate, 'date', setIsOpenDate)}/>
                    <MatInput id='month'
                              className={classes.input}
                              label={t('main.changingUserData.stepTwo.month')}
                              inputRef={inputMonth}
                              labelClass={classes.inputLabel}
                              value={month instanceof Date ? month.getMonth() + 1 : month}
                              onFocus={() => openDatePicker(inputMonth, 'month', setIsOpenMonth)}/>
                    <MatInput id='year'
                              className={classes.input}
                              label={t('main.changingUserData.stepTwo.year')}
                              inputRef={inputYear}
                              labelClass={classes.inputLabel}
                              value={year instanceof Date ? year.getFullYear() : year}
                              onFocus={() => openDatePicker(inputYear, 'year', setIsOpenYear)}/>
                </div>

                <DatePicker className={classes.datePicker}
                            open={isOpenDate}
                            onOpen={() => setIsOpenDate(true)}
                            onClose={() => setIsOpenDate(false)}
                            format='dd-MM-yyyy'
                            minDate={new Date()}
                            openTo='year'
                            views={['date']}
                            value={date}
                            onChange={date => setDate('date', date)}
                            autoOk/>
                <DatePicker className={classes.datePicker}
                            open={isOpenMonth}
                            onOpen={() => setIsOpenMonth(true)}
                            onClose={() => setIsOpenMonth(false)}
                            format='dd-MM-yyyy'
                            minDate={new Date()}
                            openTo='year'
                            views={['month']}
                            value={month}
                            onChange={month => setDate('month', month)}
                            autoOk/>
                <DatePicker className={classes.datePicker}
                            open={isOpenYear}
                            onOpen={() => setIsOpenYear(true)}
                            onClose={() => setIsOpenYear(false)}
                            format='dd-MM-yyyy'
                            minDate={new Date()}
                            openTo='year'
                            views={['year']}
                            value={year}
                            onChange={year => setDate('year', year)}
                            autoOk/>
            </div>
        );
    }));

export default StepTwo;

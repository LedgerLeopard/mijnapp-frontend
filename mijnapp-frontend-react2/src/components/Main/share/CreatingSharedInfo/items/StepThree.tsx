import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, makeStyles} from '@material-ui/core';
import {colors} from '../../../../../assets/colors';
import {DatePicker} from '@material-ui/pickers';
import {ReactComponent as Calendar} from '../../../../../assets/icons/calendar.svg';
import Icon from '../../../../ui/Icon';
import {formatDate} from '../../../../../share/utils';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    card: {
        height: '78px',
        padding: '10px 16px',
        boxSizing: 'border-box',
        border: `1px solid ${colors.lightGrey}`,
        backgroundColor: colors.white,
        marginBottom: '15px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textTransform: 'initial',
        display: 'block',
        width: '100%',
        textAlign: 'initial'
    },
    cardHeader: {
        fontSize: '14px',
        color: colors.grey,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    cardContent: {
        display: 'flex',
        fontSize: '16px',
    },
    icon: {
        width: '24px',
        margin: 0,
        marginRight: '8px'
    },
    datePicker: {
        display: 'none'
    }
});

const StepThree =
    inject((stores: Stores) => ({sharedDataStore: stores.sharedInformationStore}))
    (observer(({sharedDataStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [isOpen, setIsOpen] = useState(false);
        const uploadDate = sharedDataStore.uploadDate;

        return (
            <div>
                <div className={classes.header}>{t('main.creatingSharedInfo.stepThree.header')}</div>
                <Button variant='contained'
                        className={classes.card}
                        onClick={() => setIsOpen(true)}
                        disableElevation>
                    <div className={classes.cardHeader}>{t('main.creatingSharedInfo.stepThree.subheader')}</div>
                    <div className={classes.cardContent}>
                        <Icon className={classes.icon} icon={Calendar}/>
                        <div>{formatDate(uploadDate ? uploadDate.toISOString() : '', true)}</div>
                    </div>
                </Button>

                <DatePicker className={classes.datePicker}
                            open={isOpen}
                            onOpen={() => setIsOpen(true)}
                            onClose={() => setIsOpen(false)}
                            format='dd-MM-yyyy'
                            minDate={new Date()}
                            openTo='year'
                            views={['year', 'month', 'date']}
                            value={uploadDate}
                            onChange={sharedDataStore.setUploadDate}/>
            </div>
        );
    }));

export default StepThree;

import React from 'react';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';
import {useTranslation} from 'react-i18next';
import {CustomSwitch, LinkButton} from '../../../../ui/SimpleComponents';
import {SearchType} from '../../../../../share/constants/searchType';
import Icon from '../../../../ui/Icon';
import {ReactComponent as Plus} from '../../../../../assets/icons/plus.svg';
import {colors} from '../../../../../assets/colors';
import {FormControlLabel, makeStyles} from '@material-ui/core';
import {Organization} from '../../../../../stores/SharedInformation/Organization';


const useStyles = makeStyles({
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    addButton: {
        height: '24px',
        width: 'fit-content',
        display: 'flex',
        color: colors.tertiary
    },
    buttonText: {
        margin: 'auto 8px'
    },
    cardSwitch: {
        display: 'flex',
        padding: '16px',
        margin: 0,
        marginBottom: '16px',
        borderRadius: '8px',
        backgroundColor: colors.white,
        boxShadow: `0px 8px 16px ${colors.lightGrey}`,
    },
    switchLabel: {
        width: 'calc(100% - 60px)'
    },
    cardSwitchContent: {
        display: 'flex',
    },
    cardSwitchText: {
        width: '100%',
        margin: 'auto 10px',
        fontSize: '18px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
});

const StepTwo =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, sharedDataStore: stores.sharedInformationStore}))
    (observer(({popupUiStore, sharedDataStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const organizations = sharedDataStore.organizations;

        return (
            <div>
                <div className={classes.header}>{t('main.creatingSharedInfo.stepTwo.header')}</div>
                {(organizations && organizations.length > 0)
                && organizations.map((organization: Organization, index: number) =>
                    (<FormControlLabel key={'key-' + index + '-' + organization._id}
                                       className={classes.cardSwitch}
                                       classes={{label: classes.switchLabel}}
                                       control={<CustomSwitch name={organization.name}
                                                              checked={organization.use}
                                                              onChange={(event: any) => organization.markOrganization(event.target.checked)}/>}
                                       label={<div className={classes.cardSwitchContent}>
                                           <img src={`${organization.logo}`} alt={'Organization Logo'}/>
                                           <div className={classes.cardSwitchText}>{organization.name}</div>
                                       </div>}
                                       labelPlacement="start"
                    />))
                }
                <LinkButton className={classes.addButton} onClick={() => popupUiStore.openSearch(SearchType.Organization)}>
                    <Icon icon={Plus} color={colors.tertiary}/>
                    <div className={classes.buttonText}>{t('main.creatingSharedInfo.stepTwo.select')}</div>
                </LinkButton>
            </div>
        );
    }));

export default StepTwo;

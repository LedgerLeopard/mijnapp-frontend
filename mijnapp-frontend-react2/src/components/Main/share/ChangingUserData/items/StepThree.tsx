import React, {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../../models/Stores';
import {useTranslation} from 'react-i18next';
import {Checkbox, List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {colors} from '../../../../../assets/colors';
import Loader from '../../../../ui/Loader';
import dataChangeService from '../../../../../services/dataChangeService';
import Person from '../../../../../stores/ChangingUserData/Person';
import {formatDate} from '../../../../../share/utils';


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
    wrapper: {
        height: 'calc(100% - 110px)',
        position: 'relative',
    },
    list: {
        padding: 0,
        borderRadius: '8px',
        backgroundColor: colors.white,
        boxShadow: `0px 8px 16px ${colors.lightGrey}`,
    },
    listItem: {
        padding: '8px 16px'
    },
    listItemIcon: {
        minWidth: '35px'
    }
});

const StepThree =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore, dataUiStore: stores.dataUiStore}))
    (observer(({popupUiStore, dataUiStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const people: Person[] = dataUiStore.people;

        const loadData = () => {
            if (people.length > 0) return;
            setLoading(true);
            dataChangeService.getListPeople(popupUiStore.additionalUserData._id)
                .then(people => {
                    dataUiStore.setUiData({people: people.map((person: any) => new Person(person))});
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        useEffect(() => {
            loadData();
        }, []);

        return (
            <div>
                <div className={classes.header}>{t('main.changingUserData.stepThree.header')}</div>
                <div className={classes.text}>{t('main.changingUserData.stepThree.text')}</div>
                <div className={classes.wrapper}>
                    {loading && <Loader/>}
                    {!loading && <List className={classes.list}>
                        {people.map((person, index) => {
                            const labelId = `checkbox-list-label-${person._id}`;

                            return (
                                <ListItem key={'listKey-' + index + '-' + person._id}
                                          className={classes.listItem}
                                          onClick={() => person.markPerson()}
                                          divider={(people.length - 1) < index}
                                          button>
                                    <ListItemIcon classes={{root: classes.listItemIcon}}>
                                        <Checkbox edge="start"
                                                  checked={person.checked}
                                                  tabIndex={-1}
                                                  color='secondary'
                                                  disableRipple
                                                  inputProps={{'aria-labelledby': labelId}}/>
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={person.name + ' ' + formatDate(person.date, true)}/>
                                </ListItem>
                            );
                        })}
                    </List>}
                </div>
            </div>
        );
    }));

export default StepThree;

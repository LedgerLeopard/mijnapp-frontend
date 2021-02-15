import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import Icon from '../../ui/Icon';
import {ReactComponent as CheckMark} from '../../../assets/icons/check-mark.svg';
import React from 'react';
import {colors} from '../../../assets/colors';


const useStyles = makeStyles({
    list: {
        width: 'fit-content',
        margin: 'auto',
        marginTop: 0
    },
    header: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: colors.black
    },
    listItem: {
        padding: 0,
        alignItems: 'start',
        margin: '10px 0'
    },
    listIcon: {
        display: 'block',
        minWidth: 'auto',
        margin: '3px 20px 0px 0px'
    },
    listText: {
        color: colors.black
    }
});

class FeatureListData {
    items: string[] | undefined;
    header: string | undefined;
}

const FeatureList = ({items = [], header = ''}: FeatureListData) => {
    const classes = useStyles();

    return (
        <div className={classes.list}>
            <div className={classes.header}>{header}</div>
            <List component="nav" aria-label="contacts">
                {items.map((item, index) => (
                    <ListItem key={'item-' + index} className={classes.listItem}>
                        <ListItemIcon className={classes.listIcon}>
                            <Icon icon={CheckMark}/>
                        </ListItemIcon>
                        <ListItemText className={classes.listText} primary={item}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FeatureList;

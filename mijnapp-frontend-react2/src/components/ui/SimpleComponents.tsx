import {Link, Tabs, withStyles} from '@material-ui/core';
import {colors} from '../../assets/colors';


export const LinkButton = withStyles({
    root: {
        color: colors.tertiary,
        cursor: 'pointer'
    }
})(Link);

export const MatTabs = withStyles({
    root: {
        height: '100%',
        minHeight: 'auto'
    },
    indicator: {
        width: '100%',
        backgroundColor: colors.primary,
    }
})(Tabs);

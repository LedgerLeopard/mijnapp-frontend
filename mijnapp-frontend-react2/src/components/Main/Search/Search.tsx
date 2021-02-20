import React, {useState} from 'react';
import MatInput from '../../ui/MatInput';
import Icon from '../../ui/Icon';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import {makeStyles} from '@material-ui/core';
import {colors} from '../../../assets/colors';
import {useTranslation} from 'react-i18next';
import MatIconButton from '../../ui/MatIconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {useHistory} from 'react-router-dom';
import Loader from '../../ui/Loader';
import {delay} from '../../../share/utils';


const useStyles = makeStyles({
    root: {
        height: '100%',
        maxWidth: '1000px',
        padding: '15px',
        margin: 'auto',
        display: 'grid',
        gridTemplateRows: '50px 65px 1fr',
        boxSizing: 'border-box',
        backgroundColor: colors.background
    },
    searchBar: {
        width: '100%',
        display: 'flex'
    },
    header: {
        margin: 'auto auto auto 0',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    search: {
        width: '100%',
        marginTop: '20px',
    },
    closeButton: {
        height: 'auto',
        width: 'auto',
        padding: 0,
        paddingLeft: '2px',
        margin: 'auto 0 auto auto',
        color: colors.grey,
        backgroundColor: colors.background,
        borderRadius: 0,
        borderLeft: `1px dashed ${colors.black}`,

        '&:hover': {
            backgroundColor: colors.midGrey,
        },
    },
    closeButtonContent: {
        height: '45px',
        width: '45px',
        textAlign: 'center'
    },
    icon: {
        justifyContent: 'center'
    },
    searchContent: {
        marginTop: '20px',
        position: 'relative'
    }
});

const Search = () => {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const closeSearch = () => {
        history.push('/main/dashboard/start');
    };

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        delay(() => {
            setLoading(false);
        }, 500);
    };

    return (
        <div className={classes.root}>
            <div className={classes.searchBar}>
                <div className={classes.header}>{t('main.search.searchHeader')}</div>
                <MatIconButton customClasses={classes.closeButton}
                               onClick={closeSearch}
                               label={
                                   <div className={classes.closeButtonContent}>
                                       <Icon className={classes.icon} icon={CloseOutlinedIcon} color={colors.grey}/>
                                       SLUT
                                   </div>
                               }/>
            </div>
            <MatInput className={classes.search}
                      placeholder={t('main.search.searchPlaceholder')}
                      startAdornment={<Icon icon={SearchRoundedIcon}/>}
                      onChange={search}
            />
            <div className={classes.searchContent}>
                {loading && <Loader/>}
            </div>
        </div>
    );
};

export default Search;

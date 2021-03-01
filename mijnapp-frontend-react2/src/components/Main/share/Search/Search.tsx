import React, {forwardRef, useRef, useState} from 'react';
import MatInput from '../../../ui/MatInput';
import Icon from '../../../ui/Icon';
import {Button, makeStyles} from '@material-ui/core';
import {colors} from '../../../../assets/colors';
import {useTranslation} from 'react-i18next';
import MatIconButton from '../../../ui/MatIconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Loader from '../../../ui/Loader';
import {delay} from '../../../../share/utils';
import {ReactComponent as Truck} from '../../../../assets/icons/truck.svg';
import {ReactComponent as SearchIcon} from '../../../../assets/icons/search.svg';
import searchService from '../../../../services/searchService';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {inject, observer} from 'mobx-react';
import Stores from '../../../../models/Stores';


const useStyles = makeStyles({
    root: {
        height: '100%',
        maxWidth: '1000px',
        margin: 'auto',
        display: 'grid',
        gridTemplateRows: '50px 65px 1fr',
    },
    wrapper: {
        height: '100%',
        padding: '15px',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
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
    blockContent: {
        marginTop: '20px',
        position: 'relative',
        overflow: 'hidden'
    },
    searchContent: {
        height: 'calc(100% - 38px)',
        overflow: 'auto'
    },
    contentHeader: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    card: {
        height: '72px',
        width: '100%',
        padding: '0',
        border: `1px solid ${colors.lightGrey}`,
        backgroundColor: colors.white,
        marginBottom: '15px',
        borderRadius: '8px',
    },
    cardContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    cardIcon: {
        margin: '14px',
        padding: '10px',
        boxSizing: 'border-box',
        borderRadius: '100%',
        backgroundColor: colors.lightGrey
    },
    cardTextContent: {
        width: 'calc(100% - 74px)',
        margin: '1px',
        padding: '10px',
        boxSizing: 'border-box',
        textTransform: 'none',
        textAlign: 'initial',
        borderRadius: '0 8px 8px 0',
    },
    cardHeader: {
        fontSize: '16px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    cardSubheader: {
        color: colors.primary
    }
});

const Transition = forwardRef(
    function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

class SearchItems {
    _id: string | undefined;
    header: string | undefined;
    subheader?: string | undefined;
}

const Search =
    inject((stores: Stores) => ({popupUiStore: stores.popupUiStore}))
    (observer(({popupUiStore}: Stores | any) => {
        const classes = useStyles();
        const {t} = useTranslation();
        const [loading, setLoading] = useState(false);
        const [items, setItems] = useState<SearchItems[]>([]);
        const input = useRef<HTMLInputElement>(null);

        const search = (event: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);
            const value = event.target.value;
            delay(() => {
                if (!value) {
                    setLoading(false);
                    return setItems([]);
                }
                searchService.search(value).then(items => {
                    setItems(items);
                    setLoading(false);
                });
            }, 500);
        };

        const goTo = (_id: string | undefined) => {
            console.log(_id);
        };

        const close = () => {
            setItems([]);
            setLoading(false);
            popupUiStore.closeSearch();
        };

        return (
            <Dialog fullScreen
                    open={popupUiStore.search.get()}
                    onEnter={() => input.current?.focus()}
                    onClose={close}
                    TransitionComponent={Transition}>
                <div className={classes.wrapper}>
                    <div className={classes.root}>
                        <div className={classes.searchBar}>
                            <div className={classes.header}>{t('main.search.searchHeader')}</div>
                            <MatIconButton customClasses={classes.closeButton}
                                           onClick={close}
                                           label={
                                               <div className={classes.closeButtonContent}>
                                                   <Icon className={classes.icon} icon={CloseOutlinedIcon} color={colors.grey}/>
                                                   SLUT
                                               </div>
                                           }/>
                        </div>
                        <MatInput id='searchInput'
                                  inputRef={input}
                                  className={classes.search}
                                  placeholder={t('main.search.searchPlaceholder')}
                                  startAdornment={<Icon icon={SearchIcon}/>}
                                  onChange={search}/>
                        <div className={classes.blockContent}>
                            {loading && <Loader/>}
                            {items.length > 0 && <div className={classes.contentHeader}>{t('main.search.contentHeader')}</div>}
                            <div className={classes.searchContent}>
                                {items.map((item, index) => (
                                    <Button key={'key-' + index + '-' + item._id}
                                            className={classes.card}
                                            variant='contained'
                                            onClick={() => goTo(item._id)}
                                            disableElevation>
                                        <div className={classes.cardContent}>
                                            <Icon className={classes.cardIcon} fullWidthIcon={true} icon={Truck}/>
                                            <div className={classes.cardTextContent}>
                                                <div className={classes.cardHeader}>{item.header}</div>
                                                {item.subheader && <div className={classes.cardSubheader}>{item.subheader}</div>}
                                            </div>
                                        </div>
                                    </Button>))}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }));

export default Search;

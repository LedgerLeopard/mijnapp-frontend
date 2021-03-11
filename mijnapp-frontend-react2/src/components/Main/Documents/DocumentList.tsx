import React, {useEffect, useState} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import Header from '../../ui/Header';
import MatIconButton from '../../ui/MatIconButton';
import Icon from '../../ui/Icon';
import {ReactComponent as Add} from '../../../assets/icons/plus.svg';
import {colors} from '../../../assets/colors';
import {useHistory} from 'react-router-dom';
import {ReactComponent as Document} from '../../../assets/icons/document.svg';
import Loader from '../../ui/Loader';
import documentsService from '../../../services/documentService';
import {ConfirmationStatus} from '../../../share/constants/confirmationStatus';
import {ReactComponent as CheckMark} from '../../../assets/icons/check-mark.svg';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';


const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: '78px 1fr',
    },
    addButton: {
        height: '32px',
        width: '32px',
        padding: 0,
        borderRadius: '50%',
        backgroundColor: colors.white,

        '&:hover': {
            backgroundColor: colors.midGrey,
        },
    },
    wrapper: {
        height: '100%',
        padding: '24px 15px',
        boxSizing: 'border-box',
        overflow: 'auto',
        backgroundColor: colors.background,
    },
    content: {
        height: '100%',
        margin: 'auto',
        maxWidth: '1000px',
        position: 'relative',
    },
    card: {
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
        padding: '5px 0'
    },
    cardIcon: {
        height: '40px',
        width: '40px',
        margin: '14px',
        padding: '10px',
        boxSizing: 'border-box',
        borderRadius: '100%',
        backgroundColor: colors.lightGrey
    },
    cardTextContent: {
        width: 'calc(100% - 74px)',
        margin: '1px',
        padding: '5px 10px',
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
        display: 'flex',
        width: 'fit-content',
        color: colors.black
    },
    customTextStatus: {
        color: colors.grey
    }
});

const DocumentList = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);

    const loadData = () => {
        setLoading(true);
        documentsService.getDocuments()
            .then(documents => {
                setDocuments(documents);
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

    const goBack = () => {
        history.goBack();
    };

    const goTo = (id: string) => {
        history.push('/main/documents/' + id);
    };

    return (
        <div className={classes.root}>
            <Header label={t('main.documentList.header')}
                    backButtonLabel={t('main.documentList.backButton')}
                    backButtonAction={goBack}
                    endComponent={
                        <MatIconButton customClasses={classes.addButton}
                                       label={<Icon icon={Add}/>}/>
                    }/>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    {loading && <Loader/>}
                    {documents.map((document: any) => (
                        <Button key={'key-' + document._id}
                                className={classes.card}
                                variant='contained'
                                onClick={() => goTo(document._id)}
                                disableElevation>
                            <div className={classes.cardContent}>
                                <Icon className={classes.cardIcon} fullWidthIcon={true} icon={Document}/>
                                <div className={classes.cardTextContent}>
                                    <div className={classes.cardHeader}>{document.name}</div>

                                    {document.additionalName &&
                                    <div className={classes.cardSubheader}>{document.additionalName}</div>}

                                    {document.status && <div className={classes.cardSubheader + '  ' + classes.customTextStatus}>
                                        {document.status === ConfirmationStatus.Active
                                            ? <Icon icon={CheckMark} color={colors.success}/>
                                            : <Icon icon={CloseOutlinedIcon} color={'red'}/>}
                                        {t(`${document.status}`)}
                                    </div>}
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentList;

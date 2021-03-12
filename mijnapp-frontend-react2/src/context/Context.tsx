import Http from '../api/api';
import React, {useEffect} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useTranslation} from 'react-i18next';


const {Provider} = React.createContext('current');

const ContextProvider = ({children}: any) => {
    const history = useHistory();
    const {addToast} = useToasts();
    const {t} = useTranslation();

    useEffect(() => {
        Http.errorMessage = (error: any) => {
            const messageKey = `errors.${error.status}`
            const message = t(messageKey);
            if (message !== messageKey) addToast(message, {appearance: 'error'});
            console.log('ERROR', error);
        }
        Http.unauthorized = () => history.replace('/login');
    }, []);

    return <Provider value={'current'}>{children}</Provider>;
};

export default withRouter(ContextProvider);

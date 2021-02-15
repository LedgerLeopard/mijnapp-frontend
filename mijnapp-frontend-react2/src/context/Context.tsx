import Http from '../api/api';
import React, {useEffect} from 'react';
import {useHistory, withRouter} from 'react-router-dom';


const {Provider} = React.createContext('current');

const ContextProvider = ({children}: any) => {
    const history = useHistory();

    useEffect(() => {
        Http.errorMessage = (error: Error) => console.log('ERROR', error);
        Http.unauthorized = () => history.push('/login');
    }, []);

    return <Provider value={'current'}>{children}</Provider>;
};

export default withRouter(ContextProvider);

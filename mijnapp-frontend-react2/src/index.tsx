import React from 'react';
import {Provider} from 'mobx-react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import './i18';
import Stores from './models/Stores';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {ToastProvider} from 'react-toast-notifications';


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FF9E52',
            main: '#FF6F00',
            dark: '#E06200'
        },
        secondary: {
            light: '#154273',
            main: '#005EA5',
            dark: '#2B2B2B'
        }
    },
    typography: {
        fontFamily: 'RijksoverheidSansWebText, sans-serif',
    }
});

const stores: Stores = new Stores();

ReactDOM.render(
    <Provider {...stores}>
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ToastProvider autoDismiss={true} autoDismissTimeout={3000} placement='top-center'>
                    <App/>
                </ToastProvider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

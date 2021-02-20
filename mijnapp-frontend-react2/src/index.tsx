import React from 'react';
import {Provider} from 'mobx-react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import './i18';
import Stores from './models/Stores';


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FF9E52',
            main: '#FF6F00',
            dark: '#E06200'
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
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

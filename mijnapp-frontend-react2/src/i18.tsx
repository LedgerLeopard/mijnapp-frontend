import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import translationEN from './assets/i18n/en.json';
import translationNL from './assets/i18n/nl.json';

const resources = {
    en: {
        translation: translationEN
    },
    nl: {
        translation: translationNL
    }
};

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('i18nextLng') || 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    })
    .then();

export default i18n;

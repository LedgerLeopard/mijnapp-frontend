import React from 'react';
import {useTranslation} from 'react-i18next';
import FeatureList from './FeatureList';
import FeaturePhoto from './FeaturePhoto';
import Photo from '../../../assets/icons/photo-step-two.png';


const StepTwo = () => {
    const {t} = useTranslation();
    const items: string[] = ['1', '2', '3', '4'];

    const getItems = () => items.map(item => (t('steps.stepTwo.' + item)));

    return (
        <>
            <FeatureList items={getItems()} header={t('steps.stepTwo.header')}/>
            <FeaturePhoto photo={Photo}/>
        </>
    );
};

export default StepTwo;

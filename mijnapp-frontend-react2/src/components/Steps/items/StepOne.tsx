import React from 'react';
import FeatureList from './FeatureList';
import {useTranslation} from 'react-i18next';
import Photo from '../../../assets/icons/photo-step-one.png';
import FeaturePhoto from './FeaturePhoto';


const StepOne = () => {
    const {t} = useTranslation();
    const items: string[] = ['1', '2', '3'];

    const getItems = () => items.map(item => (t('steps.stepOne.' + item)));

    return (
        <>
            <FeatureList items={getItems()} header={t('steps.stepOne.header')}/>
            <FeaturePhoto photo={Photo}/>
        </>
    );
};

export default StepOne;

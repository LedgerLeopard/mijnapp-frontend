import React from 'react';
import {useTranslation} from 'react-i18next';
import FeatureList from './FeatureList';
import FeaturePhoto from './FeaturePhoto';
import Photo from '../../../assets/icons/photo-step-three.png';


const StepThree = () => {
    const {t} = useTranslation();
    const items: string[] = ['1', '2', '3'];

    const getItems = () => items.map(item => (t('steps.stepThree.' + item)));

    return (
        <>
            <FeatureList items={getItems()} header={t('steps.stepThree.header')}/>
            <FeaturePhoto photo={Photo}/>
        </>
    );
};

export default StepThree;

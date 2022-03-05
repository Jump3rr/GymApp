import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-design-utility';
import SwitchSelector from 'react-native-switch-selector';
import MyRecords from './MyRecords';

const ResultsMain = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('lr');

    const options = [
        {label: t("Results.LastResults"), value: 'lr'},
        {label: t("Results.Records"), value: 'records'},
        {label: t("Results.Measurements"), value: 'measurements'},
    ]

    return (
        <View>
            <SwitchSelector options={options} initial={0} hasPadding onPress={(value:string) => {setActiveTab(value)}} />
            {activeTab === 'lr' && (
                <Text>LAST RESULTS</Text>
            )}
            {activeTab === 'records' && (
                <MyRecords />
            )}
            {activeTab === 'measurements' && (
                <Text>MEASUREMENTS</Text>
            )}
      </View>
    )
}

export default ResultsMain
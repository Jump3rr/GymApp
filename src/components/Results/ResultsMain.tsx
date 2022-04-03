import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import MyRecords from './MyRecords';
import LastResults from './LastResults';

const ResultsMain = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('lr');

    const options = [
        {label: t("Results.LastResults"), value: 'lr'},
        {label: t("Results.Records"), value: 'records'},
    ]

    return (
        <View>
            <View>
            <SwitchSelector options={options} initial={0} style={styles.switch} hasPadding onPress={(value:string) => {setActiveTab(value)}} />
            </View>
            {activeTab === 'lr' && (
                <LastResults />
            )}
            {activeTab === 'records' && (
                <MyRecords />
            )}
      </View>
    )
}

const styles = StyleSheet.create({
    switch: {
        flex: 0,
    }
})

export default ResultsMain
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-design-utility';
import SwitchSelector from 'react-native-switch-selector';
import MyRecords from './MyRecords';

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
                <Text>LAST RESULTS</Text>
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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-design-utility';
import SwitchSelector from 'react-native-switch-selector';

const MyRecords = () => {
    const { t, i18n } = useTranslation();
    const [numberOfRecords, setNumberOfRecords] = useState(10);
    const [isInEditMode, setEditMode] = useState(false);

    return (
        <View>
            <View>
                {/* <Text onPress={() => setNumberOfRecords(numberOfRecords-1)}>-</Text>
                <Text>Ilość pól: {numberOfRecords}</Text>
                <Text onPress={() => setNumberOfRecords(numberOfRecords+1)}>+</Text> */}
                <Text onPress={() => setNumberOfRecords(numberOfRecords+1)}>+</Text>
            </View>
            <View>
                        
            </View>
            
      </View>
    )
}

export default MyRecords
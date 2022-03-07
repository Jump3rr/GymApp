import React from 'react';
import { Text } from 'react-native-design-utility';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Box } from 'react-native-design-utility';
import { useTranslation } from 'react-i18next';


const HomeScreen = () => {
  const { t, i18n } = useTranslation();

  const CalculatorsList = [
    {
      id: '1',
      title: t("Menu.Results"),
      navigation: 'Calculator_BMR',
    },
    {
      id: '2',
      title: t("Menu.MyTraining"),
      navigation: 'Calculator_BMI',
    },
    {
      id: '3',
      title: t("Menu.Calculators"),
      navigation: 'Calculator_BF',
    },
    {
      id: '4',
      title: t("Menu.BodyMeasurements"),
      navigation: 'Calculator_BF',
    },
    {
      id: '5',
      title: t("Menu.Trainings"),
      navigation: 'Calculator_BF',
    },
    {
      id: '6',
      title: t("Menu.Guides"),
      navigation: 'Calculator_BF',
    },
  ];

  return (
    <View>
      <FlatList
        style={styles.list}
        data={CalculatorsList}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    minWidth: '100%'
  },
  item: {
    flex: 1,
    margin: 5,
    backgroundColor: 'grey',
    height: 230,
    maxWidth: '100%',
    alignItems: 'center'
  },
});

export default HomeScreen
import React, {useEffect} from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Box } from 'react-native-design-utility';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getRecords } from '../actions/recordsActions'
import { getLastResults } from '../actions/lastResultsActions';
import { useNavigation } from '@react-navigation/native';
import { IItemList } from '../interfaces/IItemList';


const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  type GetRecords = ReturnType<typeof getRecords>;
  type GetLastResults = ReturnType<typeof getLastResults>;
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch<GetRecords>(getRecords());
      dispatch<GetLastResults>(getLastResults());
  }, [dispatch]);


  const CalculatorsList: IItemList[] = [
    {
      id: '1',
      title: t("Menu.Results"),
      navigation: 'Results',
    },
    {
      id: '2',
      title: t("Menu.MyTraining"),
      navigation: 'MyTraining',
    },
    {
      id: '3',
      title: t("Menu.Calculators"),
      navigation: 'CalculatorMenu',
    },
    {
      id: '4',
      title: t("Menu.BodyMeasurements"),
      navigation: 'BodyMeasurements',
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
            <TouchableOpacity onPress={() => navigation.navigate(item.navigation)} style={styles.item}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
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
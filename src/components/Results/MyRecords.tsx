import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TextInput, Modal, NativeSegmentedControlIOSChangeEvent } from 'react-native';
import { Text } from 'react-native-design-utility';
import { TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Icons from 'react-native-vector-icons/AntDesign';
import { color } from '../../constants/theme';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { reference, currentUser } from '../../tools/database';
import { IResult } from '../../interfaces/IResult';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { IRecordsReducer } from '../../reducers/recordsReducer';

const MyRecords = () => {
    const { t, i18n } = useTranslation();
    const [numberOfRecords, setNumberOfRecords] = useState(10);
    const [isInEditMode, setEditMode] = useState(false);
    const [isAddMode, setAddMode] = useState(false);
    //const [recordsArr, setRecordsArr] = useState<IResult[]>([]);

    // reference
    //     .ref('/'+currentUser?.uid+'/records')
    //     .on('value', snapshot => {
    //         console.log('User data: ', snapshot.val())
    //         const arr: IResult[] = Object.values(snapshot.val());
    //         setRecordsArr(recordsArr => arr);
    //     })

    const { recordsList } = useSelector<IState, IRecordsReducer>((globalState) => ({
        ...globalState.records
    }))

    const addData = (name: String, result: number) => {
        const newReference = reference.ref('/' + currentUser?.uid + '/records').push();
        newReference
            .set({
                name: name,
                result: result,
            })
            .then(() => console.log('pushed'))
    }
    return (
        <View>
            <View>
                {/* <Text onPress={() => setNumberOfRecords(numberOfRecords-1)}>-</Text>
                <Text>Ilość pól: {numberOfRecords}</Text>
                <Text onPress={() => setNumberOfRecords(numberOfRecords+1)}>+</Text> */}
                <TouchableOpacity onPress={() => setAddMode(true)}><Icons name="pluscircle" size={50} style={styles.iconAdd} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setEditMode(!isInEditMode)}>
                    {!isInEditMode && (
                        <Text>{t("Results.Edit")}</Text>
                    )}
                    {isInEditMode && (
                        <Text>{t("Results.Save")}</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.mainModal}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddMode}
                    onRequestClose={() => {
                        setAddMode(!isAddMode);
                    }}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => addData('test4', 2345)}>
                            <Text>Add new</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAddMode(!isAddMode)}>
                            <Text>{t('Results.Close')}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <View>
                {recordsList.length > 0 && (
                    recordsList.map((el) => {
                        return(
                            <Text>{el?.name}</Text>
                        )
                    })
                )}
                {isInEditMode && (
                    <View style={styles.editModeContainer}>
                        <TextInput style={styles.inputsTitle}>Cwiczenie</TextInput>
                        <TextInput style={styles.inputsResult}>Rekord</TextInput>
                    </View>
                )}
                {!isInEditMode && (
                    <Text>{numberOfRecords}</Text>
                )}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    iconAdd: {
        color: color.green
    },
    editModeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputsTitle: {
        backgroundColor: color.red,
        width: "60%"
    },
    inputsResult: {
        backgroundColor: color.red,
        width: "25%"
    },
    mainModal: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        margin: 20,
        marginTop: "40%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    }
})

export default MyRecords
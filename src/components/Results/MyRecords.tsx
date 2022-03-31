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
    const [isAddMode, setAddMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [editItem, setEditItem] = useState<IResult>({id: '', name: '', result: 0});
    const [newRecord, setNewRecord] = useState(0);
    const { recordsList } = useSelector<IState, IRecordsReducer>((globalState) => ({
        ...globalState.records
    }))

    const addData = (name: string, result: number) => {
        const newReference = reference.ref('/' + currentUser?.uid + '/records').push();
        newReference
            .set({
                id: newReference.key,
                name: name,
                result: result,
            })
            .then(() => console.log('pushed'))
    };

    const removeData = async (id: string) => {
        await reference.ref('/' + currentUser?.uid + '/records/' + id).remove();
    };

    const editData = (id: string, name: string, result: number) => {
        reference.ref('/' + currentUser?.uid + '/records/' + id)
            .update({
                name: name,
                result: result,
            })
            .then(() => console.log('updated'));
    };

    return (
        <View>
            <View>
                {/* <Text onPress={() => setNumberOfRecords(numberOfRecords-1)}>-</Text>
                <Text>Ilość pól: {numberOfRecords}</Text>
                <Text onPress={() => setNumberOfRecords(numberOfRecords+1)}>+</Text> */}
                <TouchableOpacity onPress={() => setAddMode(true)}><Icons name="pluscircle" size={50} style={styles.iconAdd} /></TouchableOpacity>
            </View>
            <View style={styles.mainModal}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddMode || isEditMode}
                    onRequestClose={() => {
                        setAddMode(false);
                        setEditMode(false);
                    }}
                >
                    <View style={styles.modal}>
                        <TextInput placeholder='Name' defaultValue={editItem?.name} style={styles.modalInput} onChangeText={text => setNewName(text)}></TextInput>
                        <TextInput keyboardType='number-pad' placeholder='Record' defaultValue={editItem?.result.toString()} style={styles.modalInput} onChangeText={number => setNewRecord(Number(number))}></TextInput>
                        {isEditMode && (
                            <>
                                <TouchableOpacity onPress={() => editData(editItem?.id, newName, newRecord)}>
                                    <Text>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setEditMode(false)}>
                                    <Text>{t('Results.Close')}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {!isEditMode && (
                            <>
                                <TouchableOpacity onPress={() => addData(newName, newRecord)}>
                                    <Text>Add new</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setAddMode(false)}>
                                    <Text>{t('Results.Close')}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </Modal>
            </View>
            <View>
                {recordsList.length > 0 && (
                    recordsList.map((el) => {
                        return (
                            <View style={styles.recordElement}>
                                <View style={styles.recordNameResult}>
                                    <Text>{el?.name}</Text>
                                    <Text>{el?.result} KG</Text>
                                </View>
                                <View style={styles.recordButtons}>
                                    <TouchableOpacity onPress={() => {setEditItem(el); setEditMode(true)}}>
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => removeData(el?.id)}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
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
    modalInput: {
        backgroundColor: color.grey,
        //color: color.black,
        width: '80%',
    },
    mainModal: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    recordElement: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    recordNameResult: {
        display: 'flex',
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-between'
    },
    recordButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-between'
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
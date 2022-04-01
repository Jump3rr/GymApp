import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, Modal } from 'react-native';
import { Text } from 'react-native-design-utility';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import { reference, currentUser } from '../../tools/database';
import { IResult } from '../../interfaces/IResult';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { styles } from './recordsStyles';
import { ILastResultsReducer } from '../../reducers/lastResultsReducer';

const LastResults = () => {
    const { t, i18n } = useTranslation();
    const [isAddMode, setAddMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const tempItem = { id: '', name: '', result: 0 };
    const [editItem, setEditItem] = useState<IResult>(tempItem);
    const [newRecord, setNewRecord] = useState(0);
    const { lastResultsList } = useSelector<IState, ILastResultsReducer>((globalState) => ({
        ...globalState.lastResults
    }))

    const addData = (name: string, result: number) => {
        const newReference = reference.ref('/' + currentUser?.uid + '/last_results').push();
        newReference
            .set({
                id: newReference.key,
                name: name,
                result: result,
            })
            .then(() => console.log('pushed'))
    };

    const removeData = async (id: string) => {
        await reference.ref('/' + currentUser?.uid + '/last_results/' + id).remove();
    };

    const editData = (id: string, name: string, result: number) => {
        reference.ref('/' + currentUser?.uid + '/last_results/' + id)
            .update({
                name: name,
                result: result,
            })
            .then(() => console.log('updated'));
    };

    return (
        <View>
            <View>
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
                        setEditItem(tempItem);
                    }}
                >
                    <View style={styles.modal}>
                        <TextInput placeholder='Name' defaultValue={editItem?.name} style={styles.modalInput} onChangeText={text => setNewName(text)}></TextInput>
                        <TextInput keyboardType='number-pad' placeholder='Record' defaultValue={editItem?.result === 0 ? '' : editItem?.result.toString()} style={styles.modalInput} onChangeText={number => setNewRecord(Number(number))}></TextInput>
                        {isEditMode && (
                            <>
                                <TouchableOpacity onPress={() => editData(editItem?.id, newName, newRecord)}>
                                    <Text>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setEditMode(false); setEditItem(tempItem)}}>
                                    <Text>{t('Results.Close')}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {!isEditMode && (
                            <>
                                <TouchableOpacity onPress={() => addData(newName, newRecord)}>
                                    <Text>{t('Results.Add')}</Text>
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
                <View style={[styles.recordElement, styles.recordHeader]}>
                    <View style={styles.recordNameResult}>
                        <Text style={styles.recordHeaderText}>{t('Results.Name')}</Text>
                        <Text style={styles.recordHeaderText}>{t('Results.Result')}</Text>
                    </View>
                    <View style={styles.recordButtons}>
                    </View>
                </View>
                {lastResultsList.length > 0 && (
                    lastResultsList.map((el) => {
                        return (
                            <View style={styles.recordElement}>
                                <View style={styles.recordNameResult}>
                                    <Text>{el?.name}</Text>
                                    <Text>{el?.result} KG</Text>
                                </View>
                                <View style={styles.recordButtons}>
                                    <TouchableOpacity onPress={() => { setEditItem(el); setEditMode(true) }}>
                                        <Text><Icons name="edit" size={25} style={styles.iconAdd} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => removeData(el?.id)}>
                                        <Text><Icons name="delete" size={25} style={styles.iconAdd} /></Text>
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

export default LastResults
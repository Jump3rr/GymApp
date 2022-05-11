import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import OneTraining from './OneTraining';
import Icons from 'react-native-vector-icons/Feather';
import { globalStyles } from "../../tools/globalStyles";
import { useTranslation } from "react-i18next";

const MyTraining = () => {
    const [trainingDays, setTrainingDays] = useState([<></>, <></>, <></>]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRemoveOpen, setRemoveOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const addTrainingDay = () => {
        setTrainingDays([...trainingDays, <></>])
    }
    const removeTrainingDay = () => {
        let tempArray = [...trainingDays];
        var index = trainingDays.length - 1;
        if (index !== -1) {
            tempArray.splice(index, 1);
            setTrainingDays(tempArray);
        }
    }
    return (
        <>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setModalOpen(!isModalOpen)}>
                    <Icons name="settings" size={40} />
                </TouchableOpacity>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalOpen}
                    onRequestClose={() => {
                        setModalOpen(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={globalStyles.modal}>
                        {isModalOpen && (
                            <TouchableOpacity onPress={() => { setModalOpen(false) }}>
                                <TouchableOpacity onPress={() => { setModalOpen(false) }}>
                                    <Text>{t('Trainings.NumberOfTrainings')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setRemoveOpen(!isRemoveOpen) }}>
                                    <Text>{t('Trainings.Remove')}</Text>
                                </TouchableOpacity>
                                {isRemoveOpen && (
                                    <>
                                        <Text>{t('Trainings.Select')}</Text>
                                        <TouchableOpacity onPress={() => { removeTrainingDay() }}>
                                            <Text>{t('Trainings.Remove')}</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                <Text>{trainingDays.length}</Text>
                                <TouchableOpacity onPress={() => { addTrainingDay() }}>
                                    <Text>{t('Trainings.Add')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setModalOpen(false) }}>
                                    <Text>{t('Results.Close')}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>

                        )}
                    </View>
                </Modal>
            </View>
            <Swiper>
                {trainingDays.map((el, id: number) => {
                    return <OneTraining trainingIndex={id}></OneTraining>;
                })}
            </Swiper>
        </>
    )
}

const styles = StyleSheet.create({
    topBar: {
        padding: 10,
        alignItems: 'flex-end',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default MyTraining;
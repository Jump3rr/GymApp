import { StyleSheet } from 'react-native';
import { color } from '../../constants/theme';

export const styles = StyleSheet.create({
    iconAdd: {
        color: color.lime,
        paddingHorizontal: 20,
        paddingVertical: 5
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
        backgroundColor: color.black,
        width: '80%',
    },
    mainModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    recordHeader: {
        backgroundColor: color.black,
        borderRadius: 10,
        marginVertical: 10,
        padding: 5,
    },
    recordHeaderText: {
        color: color.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    recordElement: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    recordText: {
        fontSize: 16,
        color: color.white
    },
    recordNameResult: {
        display: 'flex',
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'space-between',
    },
    recordButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '15%',
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
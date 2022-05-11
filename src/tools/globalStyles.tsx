import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
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
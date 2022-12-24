import { StyleSheet, Dimensions } from "react-native";
export const styles = StyleSheet.create({
    background: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footballscreen:{
        color: "black",
        fontSize: 20,
        textAlign:'left',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight:'5%',
        width: '100%',
        marginTop: '30%',
    },
    buttonenter: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '35%',
        width: '30%',
        marginTop: 30,
        backgroundColor: 'white',
        height: 48,
        borderRadius: 30
    },
    title: {
        color: "White",
        fontSize: 16,
    },
    Enterscreen: {
        color: 'black',
        marginTop: '5%',
        marginLeft: '25%',
        flex: 1,
        backgroundColor: "white",
        width: '50%',
        minHeight: 50,
        maxHeight: 50,
        paddingLeft: 10,
        borderRadius: 30
    },
    ticker: {
        paddingTop:10,
        color:'white',
        fontSize: 20,
    },
    enterallscreen: {
        position: 'relative',
        marginTop: '50%'
    },
    ImageBackground: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
});
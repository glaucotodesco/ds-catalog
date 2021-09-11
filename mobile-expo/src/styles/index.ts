import { StyleSheet, Dimensions } from "react-native"
import { color } from "react-native-reanimated";


const deviceWidth = Dimensions.get("window").width;

const colors = {
    white: "#FFFFFF",
    lightGray: "#F2F2F2",
    mediumGray: "#9E9E9E",
    darkGray: "#263238",
    black: "#000000",
    primary: "#407BEE",
    secondary: "#33569B",
    bluePill: "#407BFF61",
    red: "#DF5753",
    borderGray:  "#E1E1E1"
}

const text = StyleSheet.create({
    regular: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: colors.mediumGray

    },
    bold: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: colors.darkGray
    },
    primaryText: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.white,
        marginLeft: 20,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    currency: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray
    },
    productPrice: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.primary
    },
    goBackText :{
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkGray,
        textTransform: "uppercase",
        marginLeft: 16

    },
    productDetailsName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        borderWidth: 0.05,
        color: colors.darkGray
    },
    productDescripion:{
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray

    },
    loginTitle:{
        fontSize: 30,
        fontWeight: "400",
        color: colors.darkGray,
        textTransform: "uppercase",
        marginBottom: 50
    },
    addButtonText : {
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    deleteText :{
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.red,
    },
    editText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.mediumGray,
    }

});

const nav = StyleSheet.create({
    leftText: { 
        color: colors.white,
        fontWeight: "bold",
        marginLeft: 20
    },
    drawer : {
        marginRight: 20,
        
    },
    options: {
        width: deviceWidth,
        height: 120,
        backgroundColor: colors.primary,
        marginTop: 125,
        marginRight: -20,
        padding: 20,
        justifyContent: "space-between",
        
    },
    option: {
        paddingVertical: 5
    },
    textOption :{
        color : colors.white,
        textTransform: "uppercase"
    },
    textActive:{
        fontWeight: "bold"
    },
    logoutBtn:{
        width: 60,
        height: 30,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    logoutText :{
        color: colors.white   
    }



});

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.mediumGray,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "space-around"
    },
    draw: {
        width: 313,
        height: 225
    },
    textContainer: { 
        paddingHorizontal: 20 
    },
    primaryButton: {
        width: 290,
        height: 50,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },
    arrowContainer: {
        backgroundColor: colors.secondary,
        height: 50,
        width: 50,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: "center"

    },
    scrollContainer: {
        padding: 10
    },
    productCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.mediumGray,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-around"
    },
    productDescription: {
        width: "100%",
        padding: 20,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1
    },
    priceContainer: {
        flexDirection: "row",
        marginTop: 10

    },
    inputContainer: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.mediumGray,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        marginVertical: 12.5,
        paddingVertical: 10
    },
    searchInput: {
        width: "90%",
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderGray
    },
    productImage :{
        width:140,
        height: 140,
        margin: 16
    },
    //Product Details
    detailsContainer :{
        backgroundColor: colors.white,
        padding: 20
    },
    detailsCard : {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.mediumGray,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: "space-around",
        padding: 20
    },
    productImageContainer: {
        width: "100%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.borderGray,
        borderRadius: 20
    },
    goBackContainer :{
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "flex-start"

    },
    scroolTextContainer :{
        marginVertical: 20,
        padding: 20,
        borderWidth: 0.0,
        borderRadius: 10,
        borderColor: colors.darkGray

    },

    //Login Page

    loginCard :{
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.mediumGray,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "center"
    },

    form: {
        marginVertical: 10
    },
    passwordGroup :{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25   
    },
    textInput :{
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius:10,
        padding: 10
    },

    toggle: {
        margin: -40
    },
    buttonContainer :{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%"
    },
    deleteBtn :{
        width: "46%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.red,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    editBtn :{
        width: "46%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
});

const tabbar = StyleSheet.create({
    container:{
        width: deviceWidth,
        height: 80,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    pill:{
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 30
    },
    pillActive:{
        backgroundColor: colors.bluePill
    },
    pillText :{
        fontWeight: "bold",
        color: colors.mediumGray
    },
    pillTextActive:{
        color: colors.primary
    }
});

const admin = StyleSheet.create({
    container :{
        padding: 10,
    },
    addButton :{
        width: "100%",
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent:"center"
    }

});

export { colors, theme, text, nav, tabbar, admin };
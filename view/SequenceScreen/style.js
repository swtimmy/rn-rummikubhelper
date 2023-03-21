import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {isTablet} from 'react-native-device-detection';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

const customStyles = StyleSheet.create({
    sequenceTxt : {
        fontWeight: "bold",
        color: Color.colorBlack,
        fontSize: 32
    },
    sequenceBtn : {
        height: 100,
        borderWidth:2,
        borderColor:Color.colorBlue,
        margin:Space.s,
        marginTop:-2,
        marginBottom:0,
    },
    horizontal:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"space-around"
    },
    sequenceTitle:{
        color:Color.bg,
        fontSize:28,
    },
    sequenceHeader:{
        flexDirection:"row",
        padding:Space.s,
        paddingHorizontal:Space.m,
        marginHorizontal:Space.s,
        marginBottom:-1,
        backgroundColor:Color.colorBlue,
        justifyContent:"space-between"
    },
    playerImage:{
        width:(isTablet)?(screenW-padding)/12:(screenW-padding)/6,
        height:(isTablet)?(screenW-padding)/12:(screenW-padding)/6,
        // borderWidth:1,
        // borderColor:"#007d37",
        borderRadius:50,
        backgroundColor:"#fff"
    },
});

export default {...styles,...customStyles};
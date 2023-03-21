import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

const customStyles = StyleSheet.create({
    modal:{
        margin:0,
        justifyContent:"center",
        alignItems:"center"
    },
    modalView:{
        width:screenW-padding*4,
        backgroundColor:Color.bg,
        borderRadius:15,
        // borderWidth:2,
        // borderColor:"#007d37",
        // padding:25,
        // paddingBottom:25,
        // borderRadius:35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    title:{
        fontSize:45,
        color: Color.colorBlack,
        margin: Space.s,
        textAlign:"center",
    },
    subtitle:{
        color:Color.colorBlack,
        fontSize:30,
        // paddingBottom:padding,
        padding: Space.m,
        alignSelf:"center",
        alignContent:"center",
    },
});

export default {...styles,...customStyles};
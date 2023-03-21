import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const notTallMobile = (screenH<890)?true:false;
const padding = 15;

const customStyles = StyleSheet.create({
    button:{
        marginBottom:Space.m,
        marginTop:Space.m,
        alignItems:"center",
        borderWidth:2,
        borderColor:Color.colorBlack,
        flex:1,
        borderRadius:10,
        marginHorizontal:Space.m
    },
    buttonText:{
        fontSize:(notTallMobile)?25:35,
        color:Color.colorBlack,
        // textShadowColor: 'rgba(255, 255, 255, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 5,
        textAlign:"center",
        padding: Space.m,
    },
    functionBtn:{
        position:"absolute",
        top:-0,
        left:-80,
        bottom:-0,
        right:-80,
        justifyContent:"center",
    },
    countText:{
        color:Color.colorBlue,
        fontSize:88,
        textAlign:"center"
    },
    bigText:{
        color:Color.colorBlue,
        fontSize:45,
        textAlign:"center"
    },
    text:{
        color:Color.colorBlue,
        fontSize:22,
        textAlign:"center"
    },
    hide:{
        opacity:0,
    }
});

export default {...styles,...customStyles};
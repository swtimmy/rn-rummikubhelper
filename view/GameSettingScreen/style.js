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
    playBtn:{
        borderColor:Color.colorRed,
        borderWidth:3,
        borderRadius:50,
        width:60,
        height:60,
        margin:10,
        marginVertical:0,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    }
});

export default {...styles,...customStyles};
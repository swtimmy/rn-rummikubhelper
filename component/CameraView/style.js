import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = Space.m;

const customStyles = StyleSheet.create({
    title:{
        color:Color.colorBlack,
        fontSize:22,
    },
    cameraToolView:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:Space.s
    },
    cameraFlip:{
        paddingLeft:Space.l,
        alignSelf:"center"
    },
    cameraZoom:{
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        alignItems:"center"
    },
    cameraSnap:{
        
    }
});

export default {...styles,...customStyles};
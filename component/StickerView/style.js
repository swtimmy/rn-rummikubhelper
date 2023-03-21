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
    stickerView:{
        maxHeight:screenH-280,
    },
    stickerList:{
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around",
    },
    imageBtn:{
        width:100,
        height:100,
        marginBottom:8,
        position:"relative",
        backgroundColor:"#fff"
    },
    image:{
        flex:1,
        aspectRatio: 1,
        borderWidth:1,
        borderColor:"#e2e2e2",
    },
    usingIcon:{
        position:"absolute",
        top:0,
        right:0,
        padding:3,
    }
});

export default {...styles,...customStyles};
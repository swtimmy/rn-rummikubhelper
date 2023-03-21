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
    switch:{
        marginRight:Space.l,
        marginLeft:Space.l,
        borderWidth:1,
        borderColor:Color.colorBlack,
        borderRadius:Space.xs,
    },
});

export default {...styles,...customStyles};
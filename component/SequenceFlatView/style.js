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
    dragFlatList:{
        width:screenW-Space.m
    }
});

export default {...styles,...customStyles};
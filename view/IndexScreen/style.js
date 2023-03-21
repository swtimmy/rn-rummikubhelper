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
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     // justifyContent: 'center',
    //     justifyContent: "space-between",
    // },
    main:{
        width:screenW
    },
    indexImage:{
        width:(!isTablet)?screenW/3*2:screenW/2,
        height:(!isTablet)?screenW/3*2:screenW/2,
        marginBottom:padding,
    },
    settingBtn:{
        position:"absolute",
        top:0,
        right:0,
        margin:Space.m,
        padding:Space.s,
        borderColor:Color.colorYellow,
        borderWidth:1,
        borderRadius:10,
    }
});

export default {...styles,...customStyles};
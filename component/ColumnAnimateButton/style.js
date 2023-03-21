import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import {isTablet} from 'react-native-device-detection';
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
        marginBottom:(!isTablet&&screenH<668)?Space.s:Space.m,
        marginTop:(!isTablet&&screenH<668)?Space.s:Space.m,
        alignItems:"center",
        borderWidth:2,
        borderColor:Color.colorBlack,
        flex:1,
        borderRadius:10,
        marginHorizontal:Space.m
    },
    buttonText:{
        fontSize:(!isTablet&&screenH<668)?20:((notTallMobile)?25:35),
        color:Color.colorBlack,
        // textShadowColor: 'rgba(255, 255, 255, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 5,
        textAlign:"center",
        padding: Space.m,
    },
});

export default {...styles,...customStyles};
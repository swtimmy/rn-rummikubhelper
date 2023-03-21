import { StyleSheet} from 'react-native';
import {Dimensions, Platform} from "react-native";
import {isTablet} from 'react-native-device-detection';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const isIOS = Platform.OS === "ios"? true:false;

const styles = StyleSheet.create({
    backBtnView:{
        position:"absolute",
        top:Space.m-3,
        left:0,
    },
    backBtn:{
        paddingLeft:Space.s,
        flexDirection:"row",
        alignItems:"center"
    },
    backBtnText:{
        color:Color.colorBlue,
        fontSize:20,
        paddingLeft:Space.xs,
    }
});

export default styles;
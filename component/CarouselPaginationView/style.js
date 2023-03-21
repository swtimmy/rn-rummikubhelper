import { StyleSheet} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

const styles = StyleSheet.create({
    pagination:{
        padding:0,
        margin:0,
        marginTop:-20,
        alignItems:"stretch",
        justifyContent:"space-around",
    },
    dot:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:Color.colorYellow
    },
});

export default styles;
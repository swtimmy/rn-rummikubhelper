import { StyleSheet} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

const styles = StyleSheet.create({
    view:{

    },
    text:{
        color:Color.colorYellow,
        textAlign:"center",
        fontSize:(!isTablet&&screenH<668)?30:50,
    }
});

export default styles;
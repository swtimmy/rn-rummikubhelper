import {Dimensions, Platform} from "react-native";
import {isTablet} from 'react-native-device-detection';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const isIOS = Platform.OS === "ios"? true:false;

const space = 15;
export const Space = {
    xxxs: space/5,
    xxs: space/4,
    xs: space/3,
    s: space/2,
    m: space,
    l: space*2,
    xl: space*3,
    xxl: space*4,
    xxxl: space*5,
}
import {Dimensions, Platform} from "react-native";
import {isTablet} from 'react-native-device-detection';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const isIOS = Platform.OS === "ios"? true:false;

export const Color = {
    colorBlack: "#030304",
    colorRed: "#e2041d",
    colorBlue: "#208aa6",
    colorYellow: "#db8411",
    colorDarkBlue: "#292659",
    warning: "#ffd6ba",
    info: "#89b0ae",
    key: "#e2041d",
    bg: "#e7e0c4"
}
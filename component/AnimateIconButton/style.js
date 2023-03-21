import { StyleSheet} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

const styles = StyleSheet.create({
    button:{
        marginBottom:(!isTablet&&screenH<668)?Space.s:Space.m,
        marginTop:(!isTablet&&screenH<668)?Space.s:Space.m,
        alignItems:"center",
        borderWidth:2,
        borderColor:Color.colorBlack,
        borderRadius:Space.m,
        width: (screenW<320)?300:screenW/2,
        flexDirection:"row",
        justifyContent:"center",
    },
    buttonText:{
        fontSize:(!isTablet&&screenH<668)?20:35,
        color:Color.colorBlack,
        // textShadowColor: 'rgba(255, 255, 255, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 5,
        textAlign:"center",
        padding: Space.s,
    },
});

export default styles;
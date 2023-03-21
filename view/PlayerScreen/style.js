import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {isTablet} from 'react-native-device-detection';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = Space.m;

const customStyles = StyleSheet.create({
    playerList:{
        flexDirection:"row",
        alignItems:"center",
        width:screenW,
        padding:padding,
        paddingTop:0,
        paddingBottom:0,
    },
    playerImage:{
        width:(isTablet)?(screenW-padding)/7:(screenW-padding)/5,
        height:(isTablet)?(screenW-padding)/7:(screenW-padding)/5,
        // borderWidth:1,
        // borderColor:"#007d37",
        backgroundColor:"#fff",
    },
    playerInfoLeft:{
        width:(isTablet)?(screenW-padding)/7:(screenW-padding)/5,
        alignSelf:"stretch",
        justifyContent:"flex-end",
        paddingBottom:(isTablet)?Space.l:0,
    },
    playerInfoRight:{
        width:(isTablet)?(screenW-padding)/7*6:(screenW-padding)/5*4,
    },
    playerInfoTitle:{
        color:Color.colorYellow,
        fontSize:26,
        padding:Space.m,
        paddingBottom:Space.xs,
        paddingTop:Space.m,
        paddingLeft:Space.m+Space.xs,
    },
    playerInfoBox:{
        backgroundColor:Color.bg,
        fontSize:34,
        margin:Space.m,
        marginTop:Space.xxxs,
        marginBottom:Space.xxxs,
        padding:Space.m,
        paddingTop:Space.xxs,
        paddingBottom:Space.xxs,
        paddingLeft:Space.xs,
        borderBottomColor:Color.colorRed,
        borderBottomWidth:2,
        color:Color.colorBlack,
    },
    push:{
        flex:1
    },
    changeIconBtn:{
        alignItems:"center",
        // padding:padding/5,
        backgroundColor:Color.colorBlue,
        marginTop:0,
        borderColor:Color.colorBlue,
        // borderWidth:1,
        // borderRadius:999,
        marginBottom:0,
    },
    changeIconBtnText:{
        color:"#FFF",
        fontSize:14,
        padding:Space.xxxs,
        position:"absolute",
        backgroundColor:Color.colorBlue,
        left:0,
        right:0,
        textAlign:"center",
        opacity:0.9,
        bottom:0,
    }
});

export default {...styles,...customStyles};
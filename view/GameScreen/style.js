import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

const customStyles = StyleSheet.create({
    ratio1:{
        justifyContent:"center",
        flex:1,
    },
    ratio2:{
        flex:2,
    },
    ratio3:{
        flex:3,
    },
    input:{
        fontSize:22,
        borderBottomWidth:1,
        borderBottomColor:"#007d37",
        color:"#007d37",
        margin:padding,
        marginLeft:0,
        flex:1,
        width:30,
    },
    playerItem:{
        padding:padding,
        borderWidth:2,
        borderColor:"#007d37"
    },
    playerImage:{
        aspectRatio:1,
        width:"80%",
        alignSelf:"center"
    },
    playerPosition:{
        
    },
    playerPositionText:{
        color:"#007d37",
        textAlign:"center",
        fontSize:28,
    },
    controlText:{
        color:"#000",
        fontSize:28,
        textAlign:"center",
        padding:padding,
    },
    center:{
        backgroundColor:"#007d37",
        width:"28%",
        aspectRatio:1,
        alignSelf:"center",
        position:"absolute",
        borderRadius:999,
    },
    centerLine:{
        backgroundColor:"#000",
        borderRadius:1,
        height:6,
    },
    centerButton:{
        flex:1,
        justifyContent:"center",
    },
    centerButtonText:{
        fontSize:68,
        textAlign:"center",
    },
    positionText:{
        fontSize:24,
        color:"#007d37",
        textAlign:"center",
    },
    undoBtn:{
        position:"absolute",
        top:0,
        right:Space.xl+Space.s,
        margin:Space.m,
        padding:Space.s,
        borderColor:Color.colorYellow,
        backgroundColor:Color.bg,
        borderWidth:1,
        borderRadius:10,
    },
    settingBtn:{
        position:"absolute",
        top:0,
        right:0,
        margin:Space.m,
        padding:Space.s,
        borderColor:Color.colorYellow,
        backgroundColor:Color.bg,
        borderWidth:1,
        borderRadius:10,
    }
});

export default {...styles,...customStyles};
import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import { color } from 'react-native-reanimated';
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {isTablet} from 'react-native-device-detection';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const notTallMobile = (screenH<890)?true:false;
const padding = 15;

const customStyles = StyleSheet.create({
    modal:{
        margin:0,
        justifyContent:"flex-end"
    },
    modalTitle:{
        fontSize:28,
        color:Color.colorYellow,
        padding:padding,
        paddingTop:0,
        alignSelf:"center"
    },
    modalView:{
        width:screenW,
        backgroundColor:Color.bg,
        // padding:25,
        paddingBottom:25,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    title:{
        fontSize:(!isTablet&&screenH<668)?30:45,
        color: Color.colorYellow,
        margin: padding,
        textAlign:"center",
    },
    subtitle:{
        color:Color.colorYellow,
        fontSize:(!isTablet&&screenH<668)?20:30,
        paddingBottom:padding,
        alignSelf:"center",
        alignContent:"center",
    },
    horizontal:{
        flexDirection:"row",
        justifyContent:"center",
        paddingHorizontal:Space.l
    },
    ratio1:{
        justifyContent:"center",
        flex:1,
    },
    ratio2:{
        flex:2,
        justifyContent:"center",
    },
    ratio3:{
        flex:3,
        justifyContent:"center",
    },
    switch:{
        paddingRight:padding,
    },
    inputPlayerGroup:{
        justifyContent:"space-around",
    },
    iconPlayerView:{
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        maxWidth:100,
    },
    inputPlayerView:{
        paddingHorizontal:Space.xxs,
        maxWidth:100,
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
    },
    playerNameFor2size:{
        color:Color.colorBlack,
        fontSize:25,
    },
    playerImageFor2size:{
        backgroundColor:Color.bg,
        borderWidth:1,
        height:70,
        width:70,
        borderRadius:50,
        marginTop:Space.m,
    },
    playerInputFor2size:{
        borderWidth:1,
        borderColor:Color.colorBlack,
        backgroundColor:Color.bg,
        color:Color.colorBlack,
        alignSelf:"stretch",
        textAlign:"center",
        marginTop:Space.m,
        paddingVertical:Space.s,
        fontSize:25,
    },
    playerNameFor4size:{
        color:Color.colorBlack,
        fontSize:20,
    },
    playerImageFor4size:{
        backgroundColor:Color.bg,
        borderWidth:1,
        height:60,
        width:60,
        borderRadius:60,
        marginTop:Space.m,
    },
    playerInputFor4size:{
        borderWidth:1,
        borderColor:Color.colorBlack,
        backgroundColor:Color.bg,
        color:Color.colorBlack,
        alignSelf:"stretch",
        textAlign:"center",
        marginTop:Space.m,
        paddingVertical:Space.s,
        fontSize:20,
    },
    playerNameFor6size:{
        color:Color.colorBlack,
        fontSize:15,
    },
    playerImageFor6size:{
        backgroundColor:Color.bg,
        borderWidth:1,
        height:40,
        width:40,
        borderRadius:40,
        marginTop:Space.m,
    },
    playerInputFor6size:{
        borderWidth:1,
        borderColor:Color.colorBlack,
        backgroundColor:Color.bg,
        color:Color.colorBlack,
        alignSelf:"stretch",
        textAlign:"center",
        marginTop:Space.m,
        paddingVertical:Space.s,
        fontSize:15,
    },
    keyboardSpace:{
        width:Space.m,
    },
    keyboardItemView:{
        justifyContent:"center",
        alignItems:"center",
        borderColor:Color.colorYellow,
        borderWidth:2,
        backgroundColor:Color.colorYellow,
        marginTop:Space.m,
    },
    keyboardItemText:{
        padding:Space.s,
        fontSize:33,
        color:Color.bg
    },
    flatlist:{
        width:screenW-Space.l,
        margin:Space.m,
        marginTop:Space.s,
        height:screenH/2,
        borderColor:Color.colorBlue,
        borderWidth:2,
    },
    flatlistitem:{
        marginBottom:5,  
    },
    flatlistView:{
        paddingTop:Space.s,
        paddingBottom:Space.s,
        // flexDirection:"row",
        borderBottomColor:Color.colorBlue,
        borderBottomWidth:2,
    },
    side:{
        flex:1,
        flexDirection:"row",
        paddingLeft:padding/3,
        paddingRight:padding/3,
    },
    flatlistTitle:{
        fontSize:16,
        marginLeft:padding/3,
        marginRight:padding/3,
        textAlign:"center",
        width:50,
    },
    flatlistDetail:{
        fontSize:22,
    },
    flatlistImg:{
        width:50,
        height:50,
        backgroundColor:"#fff",
        marginLeft:padding/3,
        marginRight:padding/3,
        borderColor:"#007d37",
        borderWidth:1,
        borderRadius:50
    },
    flatlistEmptyText:{
        color:Color.colorBlue,
        fontSize:28,
        textAlign:"center"
    },
    historyRoundText:{
        color:Color.colorBlue,
        fontSize:28,
    },
    historyPlayerScore:{
        alignItems:"center",
        margin:Space.xs,
        // borderBottomWidth:2,
        // borderColor:Color.key,
    },
    historyPlayerScoreText:{
        fontSize:22,
        color:Color.colorBlue,
    },
    historyTimeText:{
        fontSize:18,
        color:Color.colorBlue,
    },
    historyPlayerView:{
        margin:Space.xs,
        alignItems:"center",
        alignSelf:"flex-start"
    },
    historyPlayerName:{
        color:Color.colorBlack,
        fontSize:14,

    },
    historyPlayerImage:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:Color.bg,
        borderColor:Color.colorBlack,
        borderWidth:1,
        marginBottom:Space.s,
    }
});

export default {...styles,...customStyles};
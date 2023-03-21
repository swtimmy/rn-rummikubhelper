import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import {Color} from './color'
import {Space} from './space'
import {isTablet} from 'react-native-device-detection';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const isIOS = Platform.OS === "ios"? true:false;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg,
        alignItems: 'center',
        justifyContent: "space-between",
    },
    horizontal:{
        flexDirection:"row",
    },
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    push:{
        flex:1
    },
    input:{
        backgroundColor:"#007d37",
        fontSize:20,
        margin:Space.m,
        marginBottom:Space.m,
        padding:Space.m,
        paddingLeft:5,
    },
    title:{
        fontSize:(!isTablet&&screenH<668)?25:45,
        color: Color.colorYellow,
        marginBottom: 50,
        // textShadowColor: 'rgba(255, 255, 255, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 10
    },
    subtitle:{
        color:Color.colorYellow,
        fontSize:(!isTablet&&screenH<668)?18:24,
        padding:Space.l,
        paddingBottom:0,
        paddingTop:0,
    },
    switch:{
        marginRight:Space.l,
        marginLeft:Space.l,
        borderWidth:1,
        borderColor:Color.colorBlue,
        borderRadius:Space.xs,
    },
    scrollPage:{
        flex:1,
        width:screenW,
        justifyContent:"center",
        alignItems:"center",
    },
    ratio0_5:{
        justifyContent:"center",
        flex:0.5,
    },
    ratio1:{
        justifyContent:"center",
        flex:1,
    },
    ratio1_5:{
        justifyContent:"center",
        flex:1.5,
    },
    ratio2:{
        flex:2,
        justifyContent:"center",
    },
    ratio2_5:{
        flex:2.5,
        justifyContent:"center",
    },
    ratio3:{
        flex:3,
        justifyContent:"center",
    },
    ratio3_5:{
        flex:3.5,
        justifyContent:"center",
    },
    slider:{
        width:screenW,
        padding:Space.l,
        paddingLeft:Space.l,
        paddingRight:Space.l,
        paddingTop:0,
        height:60,
        justifyContent:"center",
        marginBottom:-10,
    },
    modal:{
        margin:0,
        justifyContent:"flex-end",
    },
    modalTitle:{
        fontSize:36,
        color:Color.colorBlue,
        padding:Space.m,
        paddingTop:0,
        marginBottom:Space.m,
        alignSelf:"center"
    },
    modalView:{
        backgroundColor:Color.bg,
        padding:25,
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
    modalTabView:{
        height:40,
        marginBottom:Space.m,
    },
    ads:{
        // flex:1,
        width:screenW,
        // backgroundColor:"#2e2e2e",
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
    },
    checkbox:{
        backgroundColor:"transparent",
        borderWidth:0,
        color:Color.colorBlack,
        fontSize:22,
    },
    picker:{
        maxHeight:(isTablet)?'auto':80,
    }
});
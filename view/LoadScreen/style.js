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
    flatlist:{
        width:screenW,
        padding:padding,
        flex:1,
    },
    flatlistitem:{
        marginBottom:10,
    },
    vs:{
        alignSelf:"center"
    },
    flatlistView:{
        paddingTop:padding/2,
        paddingBottom:padding/2,
        // flexDirection:"row",
        // borderBottomColor:Color.colorBlack,
        // borderBottomWidth:10,
        borderColor:Color.colorBlack,
        borderWidth:2,
    },
    side:{
        flex:1,
        flexDirection:"row",
        paddingLeft:padding/3,
        paddingRight:padding/3,
    },
    flatlistTitle:{
        fontSize:12,
        marginLeft:padding/3,
        marginRight:padding/3,
        padding:Space.xxxs,
        textAlign:"center",
        width:50,
    },
    flatlistDetail:{
        fontSize:22,
    },
    flatlistImg:{
        width:50,
        height:50,
        backgroundColor:Color.bg,
        marginLeft:padding/3,
        marginRight:padding/3,
        borderColor:Color.colorBlack,
        borderWidth:1,
        borderRadius:50
    },
    image:{
        width:(screenW<screenH)?screenW-padding*2:screenH-padding*2,
        height:(screenW<screenH)?screenW-padding*2:screenH-padding*2,
    },
    gameButtonView:{
        flexDirection:"row",
        paddingLeft:padding,
        paddingRight:padding,
    },
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:45,
        color: Color.colorYellow,
        marginTop: 20,
    },
    prevBtn:{
        position:"absolute",
        left:0,
    },
    nextBtn:{
        position:"absolute",
        right:0,
    },
    scrollPage:{
        flex:1,
        width:screenW,
        justifyContent:"center",
        alignItems:"center",
    },
    flatlistEmptyText:{
        color:Color.colorRed,
        fontSize:28,
        textAlign:"center"
    }
});

export default {...styles,...customStyles};
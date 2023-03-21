import { StyleSheet } from 'react-native';
import {Dimensions, Platform} from "react-native";
import styles from '../../assets/style'
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;
const cellHeight = 50;
let cellWidth = 100;
const roundCellWidth = 70;

const customStyles = StyleSheet.create({
    ads:{
        // flex:1,
        width:screenW,
        // backgroundColor:Color.colorBlack,
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        paddingTop:padding,
    },
    slider:{
        width:screenW,
        padding:padding*2,
        paddingLeft:padding*2,
        paddingRight:padding*2,
        paddingTop:0,
        height:80,
        // paddingBottom:40,
        justifyContent:"center",
        marginBottom:-10,
    },
    scrollPage:{
        flex:1,
        width:screenW,
        justifyContent:"center",
        alignItems:"center",
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
        paddingRight:padding*2,
    },
    header: { 
        // height: cellHeight, 
        marginBottom:10,
    },
    headText: { 
        textAlign: 'center', 
        fontWeight: '500',
        color:Color.colorBlack,
        fontSize:20,
        width:"auto",
    },
    text: { 
        textAlign: 'center', 
        fontWeight: '500',
        color:Color.colorBlack,
        fontSize:20,
        width:"auto",
    },
    dataWrapper: { 
        marginTop: -1 
    },
    row: { 
        height: cellHeight, 
        backgroundColor: Color.colorBlack,
        borderWidth:0,
        borderTopWidth:2,
        borderColor:Color.colorBlack
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        paddingBottom: 50
    },
    cell:{
        width:roundCellWidth,
        height:cellHeight,
        justifyContent:"center",
        alignItems:"center",
    },
    cellText:{
        fontSize:22,
        color:Color.colorBlack,
    },
    up:{
        color:Color.colorBlack,
        fontSize:20,
        textAlign:"center"
    },
    gray:{
        color:Color.colorBlack,
        fontSize:20,
        textAlign:"center"
    },
    down:{
        color:"red",
        fontSize:20,
        textAlign:"center"
    },
    totalUp:{
        color:Color.colorBlack,
        fontSize:24,
        textAlign:"center"
    },
    totalDown:{
        color:"red",
        fontSize:24,
        textAlign:"center"
    },
    playerImage:{
        height:30,
        width:30,
        borderColor:Color.colorBlack,
        // borderWidth:1,
        borderRadius:15,
    }
});

export default {...styles,...customStyles};
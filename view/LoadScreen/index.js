import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, FlatList, Image, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground, I18nManager} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import {AnimateButton} from '../../component/AnimateButton'
import {BackButton} from '../../component/BackButton'
import {ColumnAnimateButton} from '../../component/ColumnAnimateButton'
import RangeSlider from 'rn-range-slider';
import Thumb from '../../component/Slider/Thumb';
import Rail from '../../component/Slider/Rail';
import RailSelected from '../../component/Slider/RailSelected';
import Notch from '../../component/Slider/Notch';
import SwitchSelector from 'react-native-switch-selector';
import Label from '../../component/Slider/Label';
import { StatusBar } from 'expo-status-bar';
import styles from './style';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {lang} from '../../assets/language'

import {music} from '../../assets/music'
import {Audio} from 'expo-av';

import * as Analytics from 'expo-firebase-analytics';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = (screenH<=667)?8:15;
const fontSize = (screenH<=667)?22:28;

export default function LoadScreen({navigation}) {
    const [getHistory,setHistory] = useState([]);
    const [lastSelectCell,setLastSelectCell] = useState({});
    const [cellCollected,setCellCollected] = useState({});
    const [playerScore,setPlayerScore] = useState({});
    const [playerStickerPath,setPlayerStickerPath] = useState({});
    const [itemSelected,setItemSelected] = useState(null);

    async function asyncCall(){
        await Analytics.setCurrentScreen('LoadScreen');
    }
    // AsyncStorage.removeItem('history');
    // AsyncStorage.removeItem('lastSelectCell');
    // AsyncStorage.removeItem('cellCollected');
    const getRecord=()=>{
        let record = [];
        AsyncStorage.getItem('history', (err, result) => {
            if (result !== null) {
                var obj = JSON.parse(result);
                Object.keys(obj).map((key)=>{
                    record.push(obj[key]);
                })
            } else {
                
            }
            setHistory(record);
        });
    }

    const deleteRecord=()=>{
        // AsyncStorage.removeItem('history');
        let newObj = getHistory.filter((v)=>(v.id!==itemSelected));
        AsyncStorage.setItem('history', JSON.stringify(newObj));
        setHistory(newObj);
    }

    useEffect(()=>{
        asyncCall();
        getRecord();
        // AsyncStorage.removeItem('history');
    },[])

    const onBack = ()=>{
        navigation.pop();
    }

    const onSelect = (id) =>{
        setItemSelected(id);
    }

    const onDelete = ()=>{
        deleteRecord();
    }

    const onLoad = ()=>{
        if(itemSelected){
            let obj = getHistory.filter((v)=>(v.id==itemSelected))[0];
            navigation.push("Game",{
                player:obj.player,
                history:obj.history,
                gameSetting:obj.gameSetting,
            });
        }
    }

    const RenderPlayer=(Props)=>{
        let playerView=[];
        let itemSelected = Props.itemSelected;
        let stopLoop = false;
        let max = (screenW>768)?9:4;
        (Props.playerArr).map((data,index)=>{
            if(index>max){
                if(!stopLoop){
                    playerView.push(
                        <View key={index} style={{justifyContent:"center"}}>
                            <Text style={[{fontSize:22,marginLeft:padding,textAlign:"center"},(itemSelected)?{color:Color.bg}:{color:Color.bg}]}>...</Text>
                        </View>
                    );     
                }
                stopLoop=true;
            }else{
                playerView.push(
                    <View key={index} style={{marginRight:-13,transform:[{rotate:"-0deg"}]}}>
                        <Image style={[styles.flatlistImg]} source={data.img} />
                        <Text style={[styles.flatlistTitle,(itemSelected)?{color:Color.bg}:{color:Color.bg}]}>{data.name}</Text>
                    </View>
                );
            }
        });
        return playerView;
    }

    const pad2=(number)=>{
        return (number < 10 ? '0' : '') + number
    }

    const ItemView=useCallback(({ id, player, gameSetting, itemSelected, onSelect, lastTime})=>{
        let playerArr=[];
        let count = 0;
        for(let id in player){
            playerArr.push({
                'img':player[id]['img'],
                'name':player[id]['name'],
                'score':player[id]['score'],
            })
            count++;
        }
        let createTime,updateTime;
        let time;
        time = new Date(id);
        createTime = time.getFullYear()+'-'+pad2(time.getMonth()+1)+'-'+pad2(time.getDate())+" "+pad2(time.getHours())+":"+pad2(time.getMinutes())
        time = new Date(lastTime);
        updateTime = time.getFullYear()+'-'+pad2(time.getMonth()+1)+'-'+pad2(time.getDate())+" "+pad2(time.getHours())+":"+pad2(time.getMinutes())
      return (
        <TouchableOpacity
            onPress={() => onSelect(id,gameSetting.music.pickerName)}
            style={[
                styles.flatlistitem,
                { backgroundColor: itemSelected ? Color.colorBlue : Color.bg },
            ]}
        >
            <View style={[styles.flatlistView,{ borderColor: itemSelected ? Color.colorBlue : Color.colorBlack }]}>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.side}>
                        <RenderPlayer
                        playerArr={playerArr}
                        itemSelected={itemSelected}
                        />
                    </View>
                    <View style={[styles.side,{justifyContent:"flex-end"}]}>
                        <View style={{justifyContent:"center",paddingRight:padding/2}}>
                            <Text style={[{fontSize:26,textAlign:"right",marginTop:0},(itemSelected)?{color:Color.bg}:{color:Color.colorBlack}]}>{gameSetting.round} {lang.txt('round')}</Text>
                        </View>
                    </View>
                </View>
                <View style={[{flexDirection:"row",paddingBottom:0,padding:padding,paddingTop:padding/2},(screenW<414)?{flexDirection:"column"}:{}]}>
                    <View style={[{flex:1,flexDirection:"row"}]}>
                        <Text style={[{fontSize:14,textAlign:"left",marginBottom:5,},(itemSelected)?{color:Color.bg}:{color:Color.colorBlack}]}>{lang.txt('startDate')} </Text>
                        <Text style={[{fontSize:14,textAlign:"left",marginBottom:5,},(itemSelected)?{color:Color.bg}:{color:Color.colorBlack}]}>{createTime}</Text>
                    </View>
                    <View style={[{flex:1,flexDirection:"row",justifyContent:"flex-end"},(screenW<414)?{justifyContent:"flex-start"}:{}]}>
                        <Text style={[{fontSize:14,textAlign:"right",marginBottom:5,},(itemSelected)?{color:Color.bg}:{color:Color.colorBlack}]}>{lang.txt('updateDate')} </Text>
                        <Text style={[{fontSize:14,textAlign:"right",marginBottom:5,},(itemSelected)?{color:Color.bg}:{color:Color.colorBlack}]}>{updateTime}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
      );
    },[])

    const RenderEmptyContainer = ()=>{
        return(
            <View style={{justifyContent:"center",height:100}}>
                <Text style={styles.flatlistEmptyText}>
                    {lang.txt("noRecord")}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.main]}>
                <Text style={styles.title}>
                    {lang.txt("load")}
                </Text>
                <FlatList
                    style={styles.flatlist}
                    data={getHistory}
                    renderItem={({ item }) =>{
                        return <ItemView
                            id={item.id}
                            player={item.player}
                            gameSetting={item.gameSetting}
                            lastTime={item.lastTime}
                            itemSelected={(itemSelected==item.id)?true:false}
                            onSelect={onSelect}
                        /> 
                    }}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={RenderEmptyContainer()}
                    extraData={itemSelected}
                />
                <View style={[styles.gameButtonView,(itemSelected==null)?{opacity:0}:{}]}>
                    <ColumnAnimateButton
                        text={lang.txt("delete")}
                        offViewValue={1}
                        onViewValue={1.1}
                        offTextValue={0}
                        onTextValue={6}
                        call={onDelete}
                        textColor={Color.colorRed}
                    />
                    <View style={{width:padding}}></View>
                    <ColumnAnimateButton
                        text={lang.txt("load")}
                        offViewValue={1}
                        onViewValue={1.1}
                        offTextValue={0}
                        onTextValue={6}
                        call={onLoad}
                        textColor={Color.colorBlue}
                    />
                </View>
                <BackButton
                    text={lang.txt("back")}
                    call={onBack}
                    delayDisplay={500}
                />
                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    );
}
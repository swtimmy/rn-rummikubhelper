import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, FlatList, Image, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground, I18nManager} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { colors, Icon } from 'react-native-elements';
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
import {SequenceFlatView} from '../../component/SequenceFlatView';

const NUM_ITEMS = 10;

import * as Analytics from 'expo-firebase-analytics';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = (screenH<=667)?8:15;
const fontSize = (screenH<=667)?22:28;

export default function SequenceScreen({navigation,route}) {
    const { gameSetting, player } = route.params;
    const [keyboardOn,setKeyboardOn] = useState(false);
    const [getPlayerList,setPlayerList] = useState([]);
    const switchRef = useRef(null);
    const langArr = ["en","zh"];
    const [getLang,setLang] = useState(0);
    const [switchOption,setSwitchOption] = useState([{'label':"English","value":"en"},{'label':"中文","value":"zh"}]);
    
    async function asyncCall(){
        await Analytics.setCurrentScreen('SequenceScreen');
    }

    useEffect(()=>{
        asyncCall();
        let playerArr = [];
        Object.keys(player).map((key)=>{
            playerArr.push(player[key]);
        });
        setPlayerList([...playerArr]);
    },[])

    const onStart = ()=>{
        let playerObj = {};
        getPlayerList.map((value,key)=>{
            playerObj[key]=value;
        });
        navigation.push("Game",{
            gameSetting:gameSetting,
            player:playerObj,
            history:[]
        });
    }

    const onBack = ()=>{
        navigation.pop();
    }

    const _keyboardWillShow = () => {
        setKeyboardOn(true);
    };
    
    const _keyboardWillHide = () => {
        setKeyboardOn(false);
    };
    
    const updateSequence = (arr) =>{
        let playerArr = [];
        arr.map((value,key)=>{
            playerArr.push(value);
        });
        // setTimeout(function(){
            setPlayerList([...playerArr]);
        // },0);
    }

    const ItemView=useCallback(({data,drag,isActive})=>{
        let unit = "th";
        if(data.id==0){
            unit = "st";
        }else if(data.id==1){
            unit = "nd";
        }
        return (
            <TouchableOpacity
                style={[styles.sequenceBtn,(isActive)?{backgroundColor: Color.key, margin:0}:{}]}
                onLongPress={drag}
                delayLongPress={100}
                >
                <View style={styles.horizontal}>
                    <Text style={styles.sequenceTxt}>
                        {data.id+1}{unit}
                    </Text>
                    <Text style={styles.sequenceTxt}>
                        {data.name}
                    </Text>
                    <Image style={styles.playerImage} source={data.img}/>
                </View>
            </TouchableOpacity>
        );
    },[])


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.main]}>
                        <Text style={styles.title}>
                        {lang.txt("sort")}
                        </Text>
                        <View style={styles.ratio1}>
                            <View style={styles.sequenceHeader}>
                                <Text style={styles.sequenceTitle}>No.</Text>
                                <Icon name='swap-vertical-outline' type='ionicon' style={{}} size={33} color={Color.bg}/>
                            </View>
                            <View>
                                <SequenceFlatView
                                getList={getPlayerList}
                                ItemView={ItemView}
                                updateSequence={updateSequence}
                                />
                            </View>
                        </View>
                        <BackButton
                            text={lang.txt("back")}
                            call={onBack}
                            delayDisplay={500}
                        />
                        <View style={[(keyboardOn)?{display:"none"}:{}]}>
                            <AnimateButton
                                text={lang.txt("next")}
                                offViewValue={1}
                                onViewValue={1.2}
                                offTextValue={0}
                                onTextValue={6}
                                call={onStart}
                            />
                        </View>
                        <StatusBar style="dark" />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
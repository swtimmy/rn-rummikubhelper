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

import * as Analytics from 'expo-firebase-analytics';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = (screenH<=667)?8:15;
const fontSize = (screenH<=667)?22:28;

export default function SettingScreen({navigation}) {
    const [keyboardOn,setKeyboardOn] = useState(false);
    const switchRef = useRef(null);
    const langArr = ["en","zh"];
    const [getLang,setLang] = useState(0);
    const [switchOption,setSwitchOption] = useState([{'label':"English","value":"en"},{'label':"中文","value":"zh"}]);
    
    async function asyncCall(){
        await Analytics.setCurrentScreen('SettingScreen');
    }
    
    const language = async()=>{
        let res = await lang.getLang();
        setLang(res);
        const num = langArr.indexOf(res);
        switchRef.current?.toggleItem(num);
    }

    useEffect(()=>{
        asyncCall();
        language();
    },[])

    useEffect(()=>{
        language();
    },[getLang])

    const onBack = ()=>{
        navigation.pop();
    }

    const _keyboardWillShow = () => {
        setKeyboardOn(true);
    };
    
    const _keyboardWillHide = () => {
        setKeyboardOn(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.main]}>
                        <Text style={styles.title}>
                        {lang.txt("setting")}
                        </Text>
                        <View style={styles.push}></View>
                        <View style={[styles.horizontal]}>
                            <View style={styles.ratio1}>
                                <Text style={[styles.subtitle,{paddingTop:0,padding:padding*2,fontSize:32}]}>
                                {lang.txt("language")}
                                </Text>
                            </View>
                        </View>
                        <View style={{padding:Space.m}}></View>
                        <View style={[styles.horizontal]}>
                            <View style={[styles.ratio1]}>
                                <SwitchSelector 
                                ref={switchRef} 
                                style={styles.switch} 
                                selectedColor={Color.bg} 
                                buttonColor={Color.colorBlack}
                                backgroundColor={Color.bg}
                                textColor={Color.colorBlack}
                                borderRadius={Space.xs} 
                                options={switchOption} 
                                fontSize={fontSize} 
                                initial={0} 
                                onPress={value => {lang.setLang(value);setLang(value);}} 
                                />
                            </View>
                        </View>
                        <View style={styles.push}></View>
                        <View style={styles.push}></View>
                        <BackButton
                            text={lang.txt("back")}
                            call={onBack}
                            delayDisplay={500}
                        />
                        <StatusBar style="dark" />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
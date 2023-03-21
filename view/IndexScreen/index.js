import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground, I18nManager} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import {AnimateButton} from '../../component/AnimateButton'
import { StatusBar } from 'expo-status-bar';
import styles from './style';
import {Color} from '../../assets/style/color';
import {lang} from '../../assets/language'
import { useIsFocused } from '@react-navigation/native';

import * as Analytics from 'expo-firebase-analytics';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

export default function IndexScreen({navigation}) {
    const isFocused = useIsFocused();
    const [getLang,setLang] = useState(0);
    
    async function asyncCall(){
        await Analytics.setCurrentScreen('IndexScreen');
    }

    useEffect(() => {
        if(isFocused){
            const language = async()=>{
                let res = await lang.getLang();
                if(getLang!=res){
                    setLang(res);
                }
            }
            language();
        }
    },[isFocused]);

    useEffect(()=>{
        asyncCall();
    },[])

    const onStart = ()=>{
        navigation.push("GameSetting");
    }
    const onLoad = ()=>{
        navigation.push("Load");
    }
    const onSetting = ()=>{
        navigation.push("Setting");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.main,{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Image style={styles.indexImage} resizeMode='contain' source={require("../../assets/image/home.png")} />
                <Text style={styles.title}>{lang.txt("appName")}</Text>
                <AnimateButton 
                    text={lang.txt("start")}
                    offViewValue={1}
                    onViewValue={1.2}
                    offTextValue={0}
                    onTextValue={6}
                    call={onStart}
                />
                <AnimateButton 
                    text={lang.txt("load")}
                    offViewValue={1}
                    onViewValue={1.2}
                    offTextValue={0}
                    onTextValue={6}
                    call={onLoad}
                />
                <TouchableOpacity style={styles.settingBtn} onPress={()=>{onSetting()}}>
                    <Icon name='cog' type='font-awesome' style={{}} size={22} color={Color.colorYellow}/>
                </TouchableOpacity>
                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    );
}
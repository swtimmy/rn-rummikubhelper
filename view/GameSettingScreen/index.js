import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, FlatList, Image, Text, View, Picker, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground, I18nManager} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import {AnimateButton} from '../../component/AnimateButton'
import {BackButton} from '../../component/BackButton'
import {AlertModal} from '../../component/AlertModal'
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
import * as FileSystem from 'expo-file-system';

import * as Analytics from 'expo-firebase-analytics';
import { color } from 'react-native-reanimated';

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = (screenH<=667)?8:15;
const fontSize = (screenH<=667)?22:28;
const defaultNumPlayer = 4;
const isRecordMusic = "isRecordMusic";

export default function GameSettingScreen({navigation}) {
    const [keyboardOn,setKeyboardOn] = useState(false);
    const [rangeDisabled, setRangeDisabled] = useState(true);
    const [low, setLow] = useState(60);
    const [high, setHigh] = useState(10);
    const [min, setMin] = useState(10);
    const [max, setMax] = useState(180);
    const [floatingLabel, setFloatingLabel] = useState(false);
    const renderThumb = useCallback(() => <Thumb/>, []);
    const renderRail = useCallback(() => <Rail/>, []);
    const renderRailSelected = useCallback(() => <RailSelected/>, []);
    const renderLabel = useCallback(value => <Label text={value}/>, []);
    const renderNotch = useCallback(() => <Notch/>, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);
    const [sound, setSound] = useState("");
    const [recording, setRecording] = useState("");
    const [getSoundName, setSoundName] = useState("01");
    const [getSoundUrl, setSoundUrl] = useState("");
    const [getIsPlaying, setIsPlaying] = useState(false);
    const [getIsRecording, setIsRecording] = useState(false);
    const switchRef = useRef(null);
    const [switchOption,setSwitchOption] = useState([{'label':"2","value":2},{'label':"3","value":3},{'label':"4","value":4},{'label':"5","value":5},{'label':"6","value":6},]);
    const [selectedSwitchOption,setSelectedSwitchOption] = useState(defaultNumPlayer);

    const [getStopRecordingModalOn, setStopRecordingModalOn] = useState(false);
    
    async function asyncCall(){
        await Analytics.setCurrentScreen('GameSettingScreen');
    }
    useEffect(()=>{
        asyncCall();
        initSound(getSoundName);
    },[])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsPlaying(false);
            if(getIsRecording){
                stopRecording();
            }
        });
        return unsubscribe;
    }, [navigation]);

    const onStart = ()=>{
        if(getSoundName==isRecordMusic&&recording==""){
            setStopRecordingModalOn(true);
        }else{
            if(getIsRecording){
                stopRecording();
            }
            navigation.push("Player",{
                gameSetting:{
                    id:new Date().getTime(),
                    timeLimit:low,
                    round:0,
                    music:{
                        pickerName:getSoundName,
                        src:getSoundUrl
                    },
                    numPlayer:selectedSwitchOption,
                }
            });
        }
    }

    const _onPlaybackStatusUpdate = playbackStatus =>{
        //use for check audio info
        // console.log(playbackStatus);
    }

    const onBack = ()=>{
        stopRecording();
        navigation.pop();
    }

    const _keyboardWillShow = () => {
        setKeyboardOn(true);
    };
    
    const _keyboardWillHide = () => {
        setKeyboardOn(false);
    };

    const setPickerValue=(value)=>{
        if(value!=isRecordMusic){
            updateSound(value);
            if(getIsRecording){
                stopRecording();
            }
            setRecording("");
        }else{
            unloadSound();
        }
        setSoundName(value);
    }

    useEffect(()=>{
        if(getIsPlaying){
            playSound();
        }else{
            if(sound!=""){
                pauseSound();
            }
        }
    },[getIsPlaying]);

    async function startRecording(){
        try{
            setIsPlaying(false);
            // console.log("requesting permission..");
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS:true,
                playsInSilentModeIOS:true,
                playThroughEarpieceAndroid:false,
                staysActiveInBackground:true,
            })
            // console.log("starting recording..");
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setIsRecording(true);
            // console.log("Recording started");
        }catch (err) {
            // console.log("failed to start recording",err);
            setIsRecording(false);
        }
    }

    async function stopRecording(){
        // console.log("stopping recording..");
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const format = uri.split('.').pop();
        const target = FileSystem.documentDirectory+'rummikubHelperRecord';
        const checkFolder = await FileSystem.getInfoAsync(target)
        if(!checkFolder['exists']){
            await FileSystem.makeDirectoryAsync(target).catch(error => {
                // console.error('folder exist.');
            });
        }
        const to = target+'/Track.'+format;
        setSoundUrl(to);
        // console.log("Recording stopped and stored at",uri);
        // console.log("New file",to);
        await FileSystem.moveAsync({ from: uri, to: to }).then(() => {
            updateSoundFromRecord(to);
        });
        // const {sound} = await recording.createNewLoadedSoundAsync({
        //     isLooping: true,
        // });
        await Audio.setAudioModeAsync({
            allowsRecordingIOS:false
        });
        // await setSound(sound);
        setIsRecording(false);
    }
    
    async function playSound(){
        // console.log(sound)
        await sound.playAsync().catch(err => {
            setIsPlaying(false);
        });
    }

    async function pauseSound(){
        await sound.pauseAsync();
    }

    async function initSound(filename){
        setIsPlaying(false);
        const {sound} = await Audio.Sound.createAsync(music[filename]);
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        sound.setIsLoopingAsync(true);
        sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
        setSound(sound);
    }

    async function unloadSound(){
        setIsPlaying(false);
        await sound.unloadAsync();
        setSound(sound);
    }

    async function updateSound(filename){
        setIsPlaying(false);
        await sound.unloadAsync();
        await sound.loadAsync(music[filename]);
        sound.setIsLoopingAsync(true);
        setSound(sound);
    }

    async function updateSoundFromRecord(uri){
        setIsPlaying(false);
        await sound.unloadAsync();
        await sound.loadAsync({ uri: uri }, {}, _onPlaybackStatusUpdate);
        sound.setIsLoopingAsync(true);
        setSound(sound);
    }

    const RenderPicker = () => {
        let pickerItem=[];
        for(let num = 1; num < 12; num++){
            pickerItem.push(
                <Picker.Item key={num} label={lang.txt("music")+" "+num} value={"0"+num}/>
            )
        }
        pickerItem.push(
            <Picker.Item key={isRecordMusic} label={lang.txt("handMake")} value={isRecordMusic}/>
        )
        return(
        <View>
            <Picker
            selectedValue={getSoundName}
            onValueChange={(item)=>setPickerValue(item)}
            style={[styles.picker,{overflow:"hidden",justifyContent:"center"}]}
            mode="dropdown"
            itemStyle={{ color:Color.colorBlack, fontWeight:'900', fontSize: 18, padding:30}}>
                {pickerItem}
            </Picker>
        </View>
        );
    }

    const RenderRecordBtn = () => {
        if(getSoundName==isRecordMusic){
            if(getIsRecording){
                return(
                    <View style={styles.ratio1}>
                        <TouchableOpacity style={styles.playBtn} onPress={()=>{stopRecording()}}>
                            <Icon name={'stop-outline'} type='ionicon' style={{}} size={50} color={Color.colorRed}/>
                        </TouchableOpacity>
                    </View>
                );
            }else{
                return(
                    <View style={styles.ratio1}>
                        <TouchableOpacity style={styles.playBtn} onPress={()=>{startRecording()}}>
                            <Icon name={'mic-outline'} type='ionicon' style={{marginLeft:3}} size={50} color={Color.colorRed}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        }else{
            return(<View></View>);
        }
    }

    const RenderPlayBtn = () =>{
        if(getSoundName==isRecordMusic&&(recording==""||getIsRecording)){
            return(<View></View>);
        }else if(getIsPlaying){
            return(
                <View style={styles.ratio1}>
                    <TouchableOpacity style={styles.playBtn} onPress={()=>{setIsPlaying(!getIsPlaying)}}>
                        <Icon name={'pause-outline'} type='ionicon' style={{}} size={50} color={Color.colorRed}/>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <View style={styles.ratio1}>
                    <TouchableOpacity style={styles.playBtn} onPress={()=>{setIsPlaying(!getIsPlaying)}}>
                        <Icon name={'play-outline'} type='ionicon' style={{marginLeft:6}} size={50} color={Color.colorRed}/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.main]}>
                        <Text style={styles.title}>
                            {lang.txt("game")}{lang.txt("setting")}
                        </Text>
                        <View style={styles.push}></View>
                        <View style={styles.horizontal}>
                            <View style={styles.ratio1}>
                                <Text style={[styles.subtitle,{paddingTop:0,padding:padding*2,fontSize:32}]}>
                                {lang.txt("timeLimit")} {low}{lang.txt("s")}
                                </Text>
                            </View>
                        </View>
                        <View style={{padding:padding/4}}></View>
                        <RangeSlider
                        style={styles.slider}
                        min={min}
                        max={max}
                        low={low}
                        high={high}
                        step={1}
                        disableRange={rangeDisabled}
                        floatingLabel={floatingLabel}
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        renderLabel={renderLabel}
                        renderNotch={renderNotch}
                        onValueChanged={handleValueChange}
                        />
                        <View style={[styles.horizontal]}>
                            <View>
                                <Text style={[styles.subtitle,{color:Color.colorBlue}]}>10{lang.txt("s")}</Text>
                            </View>
                            <View style={styles.push}></View>
                            <View>
                                <Text style={styles.subtitle}>180{lang.txt("s")}</Text>
                            </View>
                        </View>
                        <View style={{padding:Space.l}}></View>
                        <View style={[styles.horizontal]}>
                            <View style={styles.ratio1}>
                                <Text style={[styles.subtitle,{paddingTop:0,padding:padding*2,fontSize:32}]}>
                                {lang.txt("playerNumber")}
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
                                buttonColor={Color.colorBlue}
                                backgroundColor={Color.bg}
                                textColor={Color.colorBlue}
                                borderRadius={Space.xs} 
                                options={switchOption} 
                                fontSize={fontSize} 
                                initial={2} 
                                onPress={value => setSelectedSwitchOption(value)} 
                                />
                            </View>
                        </View>
                        <View style={{padding:Space.l}}></View>
                        <View style={[styles.horizontal]}>
                            <View style={styles.ratio1}>
                                <Text style={[styles.subtitle,{paddingTop:0,padding:padding*2,fontSize:32}]}>
                                {lang.txt("alarm")}
                                </Text>
                            </View>
                        </View>
                        <View style={{padding:Space.m}}></View>
                        <View style={[styles.horizontal]}>
                            <View style={[styles.ratio3]}>
                                <RenderPicker/>
                            </View>
                            <RenderRecordBtn/>
                            <RenderPlayBtn/>
                        </View>
                        <View style={styles.push}></View>
                        <View style={styles.push}></View>
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
                        <BackButton
                            text={lang.txt("back")}
                            call={onBack}
                            delayDisplay={500}
                        />
                        <StatusBar style="dark" />
                        <AlertModal
                            getModalOn={getStopRecordingModalOn}
                            closeModal={()=>{setStopRecordingModalOn(false)}}
                            title={lang.txt("alert")}
                            text={lang.txt("stopRecording")}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
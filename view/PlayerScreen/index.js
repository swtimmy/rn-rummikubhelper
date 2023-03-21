import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, StyleSheet, Image, Text, View, KeyboardAvoidingView, Keyboard, ScrollView, TextInput, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground, I18nManager} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Camera } from 'expo-camera';
import SwitchSelector from 'react-native-switch-selector';
import { StatusBar } from 'expo-status-bar';

import * as Analytics from 'expo-firebase-analytics';

import {AnimateButton} from '../../component/AnimateButton'
import {BackButton} from '../../component/BackButton'
import {CameraView} from '../../component/CameraView'
import {StickerView} from '../../component/StickerView'
import {AlertModal} from '../../component/AlertModal'
import styles from './style';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {lang} from '../../assets/language'
import {icon} from '../../assets/base64'

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

export default function PlayerScreen({navigation,route}) {
    const { gameSetting } = route.params;
    const [getPlayerInfo,setPlayerInfo] = useState({});
    const [getRefresh, setRefresh] = useState(true);
    const [getAlertModalOn,setAlertModalOn] = useState(false);
    // const [player1Name,setPlayer1Name] = useState("玩家1");
    // const [player2Name,setPlayer2Name] = useState("玩家2");
    // const [player3Name,setPlayer3Name] = useState("玩家3");
    // const [player4Name,setPlayer4Name] = useState("玩家4");
    // const [player1Img,setPlayer1Img] = useState(null);
    // const [player2Img,setPlayer2Img] = useState(null);
    // const [player3Img,setPlayer3Img] = useState(null);
    // const [player4Img,setPlayer4Img] = useState(null);
    // const player1 = 1;
    // const player2 = 2;
    // const player3 = 3;
    // const player4 = 4;
    const [selectPlayer,setSelectPlayer] = useState(null);
    const [keyboardOn,setKeyboardOn] = useState(false);
    const [iconModalOn,setIconModalOn] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraReady, setCameraReady] = useState(false);
    const cameraRef = useRef(null);
    const tabSwitchRef = useRef(null);
    const [tabOption, setTabOption] = useState([]);
    const selfie = 0;
    const sticker = 1;
    const [selectTabOption, setSelectTabOption] = useState(selfie);

    async function asyncCall(){
        await Analytics.setCurrentScreen('PlayerScreen');
    }
    
    useEffect(()=>{
        asyncCall();
        Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);
        let playerinfo={};
        const iconArr = [icon.hand_point,icon.hand_two,icon.hand_ok,icon.hand_please,icon.hand_five,icon.triangle,icon.circle];
        for(let i = 0; i<gameSetting.numPlayer;i++){
            playerinfo[i]={};
            playerinfo[i]['name']=lang.txt("player")+(i+1);
            playerinfo[i]['img']=iconArr[i];
            playerinfo[i]['id']=i;
            playerinfo[i]['score']=0;
        }
        setPlayerInfo({...playerinfo});
        const tabOption = [
            { label: '自拍', value: selfie },
            { label: '貼紙', value: sticker },
        ];
        setTabOption([...tabOption]);
        return () => {
          Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
          Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        };
    },[]);

    useEffect(()=>{
        if(iconModalOn){
            (async () => {
                const { status } = await Camera.requestPermissionsAsync();
                setHasCameraPermission(status === 'granted');
            })();
            tabSwitchRef.current?.toggleItem(selectTabOption);
        }
    },[iconModalOn]);

    useEffect(()=>{
        setIconModalOn(false);
    },[getPlayerInfo])

    const _keyboardWillShow = () => {
        setKeyboardOn(true);
    };
    
    const _keyboardWillHide = () => {
        setKeyboardOn(false);
    };

    const onStart = ()=>{
        navigation.push("Sequence",{
            gameSetting:gameSetting,
            player:getPlayerInfo
        });
    }

    const onBack = ()=>{
        navigation.pop();
    }

    const updatePage=(page,updateScrollView)=>{
        setMode(page);
        if(updateScrollView){
            selectScrollView.current.scrollTo({x:page*screenW,animated: true});
        }
    }

    const changeIcon=(player)=>{
        setSelectPlayer(player)
        setIconModalOn(true);
    }

    const updateSelectTab=(value)=>{
        setSelectTabOption(value);
    }

    const updatePlayerName= (value,id)=>{
        let playerInfo = getPlayerInfo;
        playerInfo[id]['name']=value;
        setPlayerInfo({...getPlayerInfo,...playerInfo})
    }

    const updatePlayerImage= (value,id)=>{
        let playerInfo = getPlayerInfo;
        playerInfo[id]['img']=value;
        setPlayerInfo({...getPlayerInfo,...playerInfo});
    }

    const RenderPlayerContainer= useCallback(()=>{
        setTimeout(function(){
            setRefresh(false);
        },0);
        if(Object.keys(getPlayerInfo).length==0){
            return (<View key="rpv-none"></View>);
        }
        let playerViewGroup = [];
        Object.keys(getPlayerInfo).map((value,key)=>{
            playerViewGroup.push(
                <View key={key}>
                    <RenderPlayerView
                    num={key}
                    />
                </View>
            )
        });
        return (
            <View key="rpv">
                {playerViewGroup}
            </View>
        )
    },[getRefresh])

    const RenderPlayerView=(Props)=>{
        return (
            <View style={[styles.playerList,(keyboardOn)?{paddingTop:0,paddingBottom:0}:{}]} key={Props.num+1+"11"}>
                <View style={styles.playerInfoLeft} key={Props.num+1+"1"}>
                    <TouchableOpacity style={styles.changeIconBtn} onPress={()=>{changeIcon(Props.num);}}>
                        <Image style={styles.playerImage} source={getPlayerInfo[Props.num]['img']}/>
                        <Text style={styles.changeIconBtnText}>{lang.txt("change")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.playerInfoRight} key={Props.num+1+"2"}>
                    <Text style={[styles.playerInfoTitle,(keyboardOn)?{paddingTop:padding/2,paddingBottom:padding/2}:{}]}>{lang.txt("name")}</Text>
                    <TextInput onChangeText={(value)=>{updatePlayerName(value,Props.num)}} style={[styles.playerInfoBox,(keyboardOn)?{paddingTop:padding/2,paddingBottom:padding/2}:{}]} placeholder={lang.txt("player")+parseInt(Props.num+1)}></TextInput>
                </View>
            </View>
        );
    }

    const RenderTabContent=()=>{
        if(selectTabOption==selfie){
            return(
                <CameraView
                    hasCameraPermission={hasCameraPermission}
                    cameraType={cameraType}
                    setCameraType={setCameraType}
                    cameraRef={cameraRef}
                    cameraReady={cameraReady}
                    setCameraReady={setCameraReady}
                    updatePlayerImage={updatePlayerImage}
                    selectPlayer={selectPlayer}
                    viewPercentage={100}
                />
            );
        }else{
            return(
                <StickerView
                    updatePlayerImage={updatePlayerImage}
                    selectPlayer={selectPlayer}
                    outerPadding={25}
                    usingSticker={getPlayerInfo[selectPlayer]['img']}
                />
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
                        <Text style={[styles.title,(keyboardOn)?{padding:0}:{}]}>
                            {lang.txt("player")}
                        </Text>
                        <View style={styles.push}></View>
                        <RenderPlayerContainer/>
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
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Modal
            style={styles.modal}
            isVisible={iconModalOn}
            onSwipeComplete={() => setIconModalOn(false)}
            backdropOpacity={0.2}
            onBackdropPress={() => setIconModalOn(false)}
            propagateSwipe={true}
            swipeDirection="down">
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>自選頭像</Text>
                    <View style={styles.modalTabView}>
                        <SwitchSelector ref={tabSwitchRef} 
                        style={styles.switch} 
                        selectedColor={Color.bg} 
                        buttonColor={Color.colorBlue}
                        backgroundColor={Color.bg}
                        textColor={Color.colorBlue}
                        borderRadius={Space.xs} 
                        options={tabOption} 
                        fontSize={28} 
                        initial={0} 
                        onPress={value => updateSelectTab(value)} />
                    </View>
                    <RenderTabContent
                    />
                </View>
            </Modal>
            <StatusBar style="dark" />
            <AlertModal
            getModalOn={getAlertModalOn}
            closeModal={()=>{setAlertModalOn(false)}}
            title={"提示"}
            text={"玩家名稱不能空白"}
            />
        </SafeAreaView>
    );
}
import React, {useState, useEffect, useRef, memo, useMemo, useCallback} from 'react';
import { StyleSheet, Animated, Image, Text, View, Picker, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import Modal from 'react-native-modal';
import SwitchSelector from 'react-native-switch-selector';
import { Icon } from 'react-native-elements';
import {ColumnAnimateButton} from '../../component/ColumnAnimateButton'
import { useLinkProps } from '@react-navigation/native';
import { set } from 'react-native-reanimated';
import styles from './style';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {lang} from '../../assets/language'
import {music} from '../../assets/music'
import RangeSlider from 'rn-range-slider';
import Thumb from '../../component/Slider/Thumb';
import Rail from '../../component/Slider/Rail';
import RailSelected from '../../component/Slider/RailSelected';
import Notch from '../../component/Slider/Notch';
import Label from '../../component/Slider/Label';

import {Audio} from 'expo-av';
import { TextInput } from 'react-native-gesture-handler';
import { setTestDeviceIDAsync } from 'expo-ads-admob';
import { setStatusBarTranslucent } from 'expo-status-bar';


var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;
const isRecordMusic = "isRecordMusic";

export const InputModal = memo(({getModalOn,closeModal,getPlayerList,setPlayerList,updateRecord})=>{
    const [getPlayerCurrentValue,setPlayerCurrentValue] = useState({});
    const [getInputSelectedUser,setInputSelectedUser] = useState(0);
    const [getSequence,setSequence] = useState(0);

    useEffect(()=>{

    },[]);

    const updateInputSelectedUser = (id) => {
        let index = getSequence.indexOf(getInputSelectedUser)
        if(id=="prev"){
            index--;
            id = (index<0)?getSequence[getSequence.length-1]:getSequence[index];
        }else if(id=="next"){
            index++;
            id = (index>=getSequence.length)?0:getSequence[index];
        }
        setInputSelectedUser(id);
    };

    const playerNameImage = useMemo(()=>{
        let playerNameImage = [];
        let sequence = [];
        for(const index in getPlayerList){
            let info = {};
            info['name'] = getPlayerList[index].name;
            info['img'] = getPlayerList[index].img;
            info['id'] = getPlayerList[index].id;
            playerNameImage.push(info)
            sequence.push(getPlayerList[index].id);
        }
        setSequence(sequence);
        return playerNameImage;
    },[getModalOn]);

    useEffect(()=>{
        if(!getModalOn){
            
        }else{
            let currentValueObj = {};
            for(const index in getPlayerList){
                currentValueObj[getPlayerList[index].id] = "0";
            }
            setPlayerCurrentValue({...currentValueObj});
        }
    },[getModalOn]);

    const RenderValueBox = ({getPlayerCurrentValue})=>{
        const count = Object.keys(getPlayerCurrentValue).length;
        let playerList = [];
        let playerInputStyle = styles.playerInputFor2size;
        let activeFontSize = 28;
        let activeFontWeight = '600';
        let for3 = (count<=3)?{justifyContent:"space-around"}:{};
        if(count>4){
            playerInputStyle = styles.playerInputFor6size;
            activeFontSize = 18;
        }else if(count>2){
            playerInputStyle = styles.playerInputFor4size;
            activeFontSize = 23;
        }
        if(count==0){
            return(<View></View>);
        }
        getSequence.map((index)=>{
            const val = ""+getPlayerCurrentValue[index];
            playerList.push(
                <View key={index} style={[styles.ratio1,styles.inputPlayerView]}>
                    <TouchableOpacity style={[playerInputStyle,(getInputSelectedUser==index)?{}:{opacity:0.55}]} onPress={()=>{updateInputSelectedUser(index)}} >
                        <Text numberOfLines={1} style={[playerInputStyle,{backgroundColor:"transparent",marginTop:0,paddingVertical:0,borderWidth:0},(getInputSelectedUser==index)?{fontWeight:activeFontWeight,fontSize:activeFontSize}:{opacity:0.75}]}>
                            {(val>5)?val.substring(0,5):val}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        });
        return (
            <View style={[styles.horizontal,styles.inputPlayerGroup,for3,{marginBottom:Space.m}]}>
                {playerList}
            </View>
        );
    };

    const RenderNumberKeyboardView = () =>{
        return (
            <View>
                <View style={styles.horizontal}>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(7)}}>
                        <Text style={styles.keyboardItemText}>7</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(8)}}>
                        <Text style={styles.keyboardItemText}>8</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(9)}}>
                        <Text style={styles.keyboardItemText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontal}>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(4)}}>
                        <Text style={styles.keyboardItemText}>4</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(5)}}>
                        <Text style={styles.keyboardItemText}>5</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(6)}}>
                        <Text style={styles.keyboardItemText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontal}>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(1)}}>
                        <Text style={styles.keyboardItemText}>1</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(2)}}>
                        <Text style={styles.keyboardItemText}>2</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(3)}}>
                        <Text style={styles.keyboardItemText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontal}>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateInputSelectedUser("prev")}}>
                        <Icon name='chevron-back-outline' type='ionicon' style={{}} size={33} color={Color.bg}/>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateValue(0)}}>
                        <Text style={styles.keyboardItemText}>0</Text>
                    </TouchableOpacity>
                    <View style={styles.keyboardSpace}></View>
                    <TouchableOpacity style={[styles.ratio1,styles.keyboardItemView]} onPress={()=>{updateInputSelectedUser("next")}}>
                        <Icon name='chevron-forward-outline' type='ionicon' style={{}} size={33} color={Color.bg}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const updateValue = (txt) =>{
        let playerCurrentValue = getPlayerCurrentValue;
        let currectTxt = ""+playerCurrentValue[getInputSelectedUser];
        if(currectTxt.length>=5){
            return;
        }else if(parseInt(currectTxt)<=0){
            currectTxt = txt;
        }else{
            currectTxt += txt;
        }
        playerCurrentValue[getInputSelectedUser] = currectTxt;
        setPlayerCurrentValue({...getPlayerCurrentValue,...playerCurrentValue});
    }

    const deleteValue = () =>{
        let playerCurrentValue = getPlayerCurrentValue;
        playerCurrentValue[getInputSelectedUser] = "0";
        setPlayerCurrentValue({...getPlayerCurrentValue,...playerCurrentValue});
    }

    const submitValue = () =>{
        updateRecord(getPlayerCurrentValue);
    }

    return (
        <Modal
        style={styles.modal}
        isVisible={getModalOn}
        onSwipeComplete={closeModal}
        backdropOpacity={0.2}
        onBackdropPress={closeModal}
        propagateSwipe={true}
        swipeDirection="down"
        >
            <View style={[styles.modalView]}>
                <View style={{padding:padding/2}}></View>
                <View>
                    <View style={styles.horizontal}>
                        <View style={styles.ratio1}>
                            <Text style={[styles.title,{paddingTop:0}]}>
                            {lang.txt("game")}{lang.txt("setting")}
                            </Text>
                        </View>
                    </View>
                    <View style={{padding:Space.m}}></View>
                    <View>
                        <RenderIcon
                            playerNameImage={playerNameImage}
                            updateInputSelectedUser={updateInputSelectedUser}
                        />
                        <RenderValueBox
                            getPlayerCurrentValue={getPlayerCurrentValue}
                        />
                        <RenderNumberKeyboardView/>
                    </View>
                </View>
                <View style={[styles.horizontal,{paddingHorizontal:Space.m,marginTop:Space.m}]}>
                    <ColumnAnimateButton 
                        text={lang.txt("delete")}
                        offViewValue={1}
                        onViewValue={1.05}
                        offTextValue={0}
                        onTextValue={6}
                        call={()=>{deleteValue()}}
                        backgroundColor={Color.bg}
                        textColor={Color.colorRed}
                    />
                    <ColumnAnimateButton 
                        text={lang.txt("enter")}
                        offViewValue={1}
                        onViewValue={1.05}
                        offTextValue={0}
                        onTextValue={6}
                        call={()=>{submitValue()}}
                        backgroundColor={Color.bg}
                        textColor={Color.colorBlue}
                    />
                </View>
            </View>
        </Modal>
    ); 
});

export const PlayerNameImageView = memo(({playerNameStyle,playerImageStyle,playerInfo})=>{
    return (
        <View>
            <Text style={playerNameStyle}>{playerInfo.name}</Text>
            <Image style={[playerImageStyle]} source={playerInfo.img} />
        </View>
    );
});

export const RenderIcon = memo(({playerNameImage,updateInputSelectedUser})=>{
    const count = playerNameImage.length;
    let playerList = [];
    let playerImageStyle = styles.playerImageFor2size;
    let playerNameStyle = styles.playerNameFor2size;
    if(count>4){
        playerImageStyle = styles.playerImageFor6size;
        playerNameStyle = styles.playerNameFor6size;
    }else if(count>2){
        playerImageStyle = styles.playerImageFor4size;
        playerNameStyle = styles.playerNameFor4size;
    }
    if(count==0){
        return(<View></View>);
    }
    playerNameImage.map((v,i)=>{
        playerList.push(
            <View key={i} style={[styles.ratio1,styles.iconPlayerView]}>
                <Text style={playerNameStyle}>{v.name}</Text>
                <TouchableWithoutFeedback onPress={()=>{updateInputSelectedUser(v.id)}} >
                    <Image style={[playerImageStyle]} source={v.img} />
                </TouchableWithoutFeedback>
            </View>
        );
    })
    return (
        <View style={[styles.horizontal,styles.inputPlayerGroup]}>
            {playerList}
        </View>
    );
})
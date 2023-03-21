import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import { Icon } from 'react-native-elements';
import styles from './style'
import {Color} from '../../assets/style/color'

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const posTop = Platform.OS === "ios"? 15:25;

export const BackButton = memo(({text,call,delayDisplay})=>{
    const [getClicked,setClicked] = useState(false);
    useEffect(()=>{
        if(getClicked){
            setTimeout(function(){
                // setClicked(false);
            },1000);
        }
    },[getClicked]);
    const Anim1 = useRef(new Animated.Value(0)).current;
    Animated.sequence([
        Animated.delay(delayDisplay),
        Animated.parallel([
            Animated.timing(Anim1, {
                toValue: 1,
                useNativeDriver: false, 
                duration: 333
            }),
        ]),
    ]).start();

    const run=()=>{
        if(getClicked){
            return;
        }
        setClicked(true);
        call();
    }

    return (
        <Animated.View style={[styles.backBtnView,{opacity:Anim1}]}>
            <TouchableOpacity style={styles.backBtn} onPress={()=>{run()}}>
                <Icon name='angle-left' type='font-awesome' size={30} color={Color.colorBlue}/>
                <Text style={styles.backBtnText}>{text}</Text>
            </TouchableOpacity>
        </Animated.View>
    ); 
});
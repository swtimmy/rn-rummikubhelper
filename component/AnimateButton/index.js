import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import styles from './style'

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

export const AnimateButton = memo(({text,offViewValue,onViewValue,offTextValue,onTextValue,call,preventDoubleAction=true})=>{
    const viewAnim = useRef(new Animated.Value(offViewValue)).current;
    const textAnim = useRef(new Animated.Value(offTextValue)).current;
    const [getClicked,setClicked] = useState(false);
    useEffect(()=>{
        if(getClicked){
            setTimeout(function(){
                setClicked(false);
            },1000);
        }
    },[getClicked]);
    return (
        <TouchableWithoutFeedback 
            onPressIn={()=>{
                Animated.parallel([
                    Animated.timing(viewAnim, {
                        toValue: onViewValue,
                        useNativeDriver: false, 
                        duration: 100
                    }),
                    Animated.timing(textAnim, {
                        toValue: onTextValue,
                        useNativeDriver: false, 
                        duration: 100
                    })
                  ]).start();
            }}
            onPressOut={()=>{
                Animated.parallel([
                    Animated.timing(viewAnim, {
                        toValue: offViewValue,
                        useNativeDriver: false, 
                        duration: 100
                    }),
                    Animated.timing(textAnim, {
                        toValue: offTextValue,
                        useNativeDriver: false, 
                        duration: 100
                    })
                  ]).start();
            }}
            onPress={()=>{
                if(getClicked&&preventDoubleAction){
                    return;
                }
                setClicked(true);
                call();
            }}
            delayLongPress={10000}
            >
            <Animated.View style={[styles.button, {transform: [{scale:viewAnim}]}]}>
                <Animated.Text style={[styles.buttonText,{textShadowRadius:textAnim}]}>
                    {text}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    ); 
});
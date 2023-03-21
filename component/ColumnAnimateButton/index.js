import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import styles from './style';

export const ColumnAnimateButton = memo(({text,offViewValue,onViewValue,offTextValue,onTextValue,call,backgroundColor,textColor})=>{
    const viewAnim = useRef(new Animated.Value(offViewValue)).current;
    const textAnim = useRef(new Animated.Value(offTextValue)).current;
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
                call();
            }}
            delayLongPress={10000}
            >
            <Animated.View style={[styles.button, {transform: [{scale:viewAnim}]},(backgroundColor)?{backgroundColor:backgroundColor}:{},(textColor)?{borderColor:textColor}:{}]}>
                <Animated.Text style={[styles.buttonText,{textShadowRadius:textAnim},(textColor)?{color:textColor}:{}]}>
                    {text}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    ); 
});
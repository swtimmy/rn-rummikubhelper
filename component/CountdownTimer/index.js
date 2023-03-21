import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import styles from './style';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {lang} from '../../assets/language'
import { colors, Icon } from 'react-native-elements';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

import {Audio} from 'expo-av';

export const CountdownTimer = memo(({getStart,getClock,limitTime,isInit,onStart,onComplete,onStop,onPause})=>{

    return (
        <CountdownCircleTimer
        isPlaying={getStart}
        duration={limitTime}
        onComplete={()=>{onComplete()}}
        initialRemainingTime={(isInit)?0:limitTime}
        key={getClock}
        size={(!isTablet&&screenH<668)?270:290}
        strokeWidth={25}
        trailColor={"#ded3a8"}
        trailStrokeWidth={24}
        // isLinearGradient
        colors={[
            // [Color.colorBlack,0.25],
            [Color.colorBlue,0.3],
            [Color.colorYellow,0.4],
            [Color.colorRed,0.4],
            // ['#003456',0.2],
            // ['#F7B801',0.4],
            // ['#A30000',0.2],
        ]}
        >
            {({remainingTime, animatedColor})=>{
                if(isInit){
                    return(
                        <View style={styles.functionBtn}>
                            <TouchableOpacity style={styles.functionBtn} onPress={onStart}>
                                <Text style={styles.bigText}>
                                    {lang.txt("start")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }else{
                    if(getStart && remainingTime<=0){
                        return (
                            <View>
                                <Text style={styles.text}>{lang.txt("remaining")}</Text>
                                <Animated.Text style={styles.countText}>
                                    {remainingTime}
                                </Animated.Text>
                                <Text style={styles.text}>{lang.txt("second")}</Text>
                                <View style={{padding:Space.s}}></View>
                                <View style={[styles.horizontal,{margin:0,justifyContent:"center"}]}>
                                    {/* <Text style={{alignSelf:"center",fontSize:22,color:Color.colorRed}}>{lang.txt("stop")}</Text> */}
                                    <Icon name='pause-outline' type='ionicon' style={{}} size={25} color={Color.colorRed}/>
                                </View>
                                <TouchableOpacity style={[styles.functionBtn,styles.hide]} onPress={()=>{onStop()}}>
                                    <Icon name='pause-circle-outline' type='ionicon' style={{}} size={33} color={Color.colorRed}/>
                                </TouchableOpacity>
                            </View>
                        );
                    }else if(getStart){
                        return (
                            <View>
                                <Text style={styles.text}>{lang.txt("remaining")}</Text>
                                <Animated.Text style={styles.countText}>
                                    {remainingTime}
                                </Animated.Text>
                                <Text style={styles.text}>{lang.txt("second")}</Text>
                                <View style={{padding:Space.s}}></View>
                                <View style={[styles.horizontal,{margin:0,justifyContent:"center"}]}>
                                    {/* <Text style={{alignSelf:"center",fontSize:22,color:Color.colorRed}}>{lang.txt("stop")}</Text> */}
                                    <Icon name='pause-outline' type='ionicon' style={{}} size={25} color={Color.colorRed}/>
                                </View>
                                <TouchableOpacity style={[styles.functionBtn,styles.hide]} onPress={()=>{onPause()}}>
                                    <Icon name='pause-circle-outline' type='ionicon' style={{}} size={33} color={Color.colorRed}/>
                                </TouchableOpacity>
                            </View>
                        );
                    }else{
                        return (
                            <View>
                                <View style={styles.hide}>
                                    <Text style={styles.text}>Remaining</Text>
                                    <Animated.Text style={styles.countText}>
                                        {remainingTime}
                                    </Animated.Text>
                                    <Text style={styles.text}>seconds</Text>
                                </View>
                                <TouchableOpacity style={styles.functionBtn} onPress={()=>{onPause()}}>
                                    <Icon name='play-outline' type='ionicon' style={{marginLeft:Space.s}} size={90} color={Color.colorRed}/>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                }
            }}
        </CountdownCircleTimer>
    ); 
});
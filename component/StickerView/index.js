import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Slider, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, SnapshotViewIOS} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import {icon} from '../../assets/base64';
import styles from './style';

import { ScrollView } from 'react-native-gesture-handler';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

const selectImage=(img_src,setImage)=>{
    setImage(img_src);
}

export const StickerView = memo(({updatePlayerImage,selectPlayer,usingSticker})=>{
    const stickers = [
        icon.circle,
        icon.triangle,
        icon.cross,
        icon.hand_ok,
        icon.hand_rock,
        icon.hand_two,
        icon.hand_five,
        icon.hand_point,
        icon.hand_please,
        icon.hand_good,
    ]
    return (
        <View style={styles.stickerView}>
            <ScrollView>
                <View style={styles.stickerList}>
                    {
                        stickers.map(function(value,index){
                            return(
                                <TouchableOpacity key={index} style={styles.imageBtn} onPress={()=>{updatePlayerImage(value,selectPlayer)}}>
                                    <Image style={styles.image} source={value} />
                                    <View style={[styles.usingIcon,(usingSticker.uri==value.uri)?{}:{opacity:0}]}>
                                        <Icon name='check-circle-o' type='font-awesome' size={22} color="#6baf89"/>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    ); 
});
import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import styles from './style'
import Carousel from 'react-native-snap-carousel';
import { Space } from '../../assets/style/space';
import { lang } from '../../assets/language';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

export const CarouselSliderView = memo(({ref,data,loop,setActiveIndex,getSlideAutoNextCount,getRound,getIsFirstGame})=>{
    const sliderRef = useRef(null);

    useEffect(()=>{
        sliderRef.current.snapToNext();
    },[getSlideAutoNextCount]);

    useEffect(()=>{
        if(getIsFirstGame){
            sliderRef.current.snapToItem(0,false)
        }
    },[getIsFirstGame]);

    const RenderSliderItem=({item,index})=>{
        if(index!=0){
            return(
                <View style={styles.view}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            )
        }else{
            if(getRound>1){
                return(
                    <View style={styles.view}>
                        <Text style={[styles.text,{fontSize:26}]}>{lang.txt("whoFirst")}</Text>
                    </View>
                )
            }else{
                return(
                    <View style={styles.view}>
                        <Text style={styles.text}>{lang.txt("ready")}</Text>
                    </View>
                )
            }
        }
    }

    return (
        <Carousel
        layout={"default"}
        ref={sliderRef}
        data={data}
        loop={loop}
        loopClonesPerSide={data.length*2+1}
        sliderWidth={screenW-Space.m}
        itemWidth={(screenW-Space.m)/2.5}
        firstItem={-1}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.5}
        renderItem={RenderSliderItem}
        onSnapToItem={(index)=>{setActiveIndex(index)}}
        />
    );
});
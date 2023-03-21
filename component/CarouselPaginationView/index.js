import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import styles from './style'
import Carousel, {Pagination} from 'react-native-snap-carousel';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;

export const CarouselPaginationView = memo(({dataLength,activeIndex})=>{

    return (
        <View style={{height:20,overflow:"hidden"}}>
            <Pagination
            dotsLength={dataLength}
            activeDotIndex={activeIndex}
            containerStyle={styles.pagination}
            dotStyle={styles.dot}
            dotContainerStyle={{
                //
            }}
            inactiveDotStyle={{
                //
            }}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
            />
        </View>
    );
});
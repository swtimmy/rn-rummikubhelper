import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Slider, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, SnapshotViewIOS} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import { Icon } from 'react-native-elements';
import styles from './style';

import DraggableFlatList from 'react-native-draggable-flatlist';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

export const SequenceFlatView = memo(({getList,ItemView,updateSequence})=>{

    const RenderSequenceView = (Props) =>{
        if(Props.getList.length==0){
            return (
                <View></View>
            );
        }
        return(
            <DraggableFlatList
                style={styles.dragFlatList}
                data={Props.getList}
                renderItem={({ item, drag, isActive }) =>{
                    return <ItemView
                        data={item}
                        drag={drag}
                        isActive={isActive}
                    /> 
                }}
                onDragEnd={({ data }) => updateSequence(data)}
                keyExtractor={item => `draggable-item-${item.id}`}
            />
        );
    }

    return (
        <RenderSequenceView
        getList={getList}
        ItemView={ItemView}
        />
    ); 
});
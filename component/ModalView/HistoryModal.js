import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { StyleSheet, Animated, FlatList, Image, Text, View, Picker, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
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


var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;
const isRecordMusic = "isRecordMusic";

export const HistoryModal = memo(({getModalOn,closeModal,getPlayerList,getHistory,undoRecord})=>{
    const [itemSelected,setItemSelected] = useState(null);
    const [getSequence,setSequence] = useState([]);

    useEffect(()=>{
        if(getModalOn){
            let sequence = [];
            for(const index in getPlayerList){
                sequence.push(getPlayerList[index].id);
            }
            setSequence(sequence);
        }
    },[getModalOn]);

    const onSelect = (id) =>{
        setItemSelected(id);
    }

    const RenderScore = (Props) =>{
        let data = Props.data;
        let ele = [];
        getSequence.map((index)=>{
            // console.log(data[index])
            let fontSize = 22;
            if(!isTablet){
                if(data[index]>9999){
                    fontSize = 10;
                }else if(data[index]>999){
                    fontSize = 13;
                }else if(data[index]>99){
                    fontSize = 20;
                }
            }
            ele.push(
                <View style={[styles.ratio1,styles.historyPlayerScore]} key={index}>
                    <Text style={[styles.historyPlayerScoreText,(data[index]>99)?{fontSize:fontSize}:{}]}>{data[index]}</Text>
                </View>
            )
        })
        return ele;
    }

    const ItemView=useCallback(({ id, data, round, status, onSelect, time})=>{
        time = new Date(time);
        const timeString = time.getFullYear()+'-'+pad2(time.getMonth()+1)+'-'+pad2(time.getDate())+" "+pad2(time.getHours())+":"+pad2(time.getMinutes())
        return (
            <TouchableOpacity
                onPress={() => onSelect(id)}
                style={[
                    styles.flatlistitem,
                    { backgroundColor: itemSelected ? Color.bg : Color.bg },
                ]}
                key={id}
            >
                <View style={[styles.flatlistView,(status)?{}:{"opacity":0.5}]} key={id+"v"}>
                    <View style={[styles.horizontal,{justifyContent:"space-around",paddingHorizontal:Space.m}]} key={id+"v2"}>
                        <View style={styles.ratio1} key={id+"v3"}>
                            <Text style={styles.historyRoundText}>#{round}</Text>
                        </View>
                        <View style={[styles.horizontal,styles.ratio3,{paddingHorizontal:0,borderColor:Color.bg,borderBottomWidth:2}]} key={id+"v4"}>
                            <RenderScore
                            data={data}
                            />
                        </View>
                    </View>
                    <View style={{paddingTop:Space.xxs}}></View>
                    <View style={[styles.horizontal,{justifyContent:"space-around",paddingHorizontal:Space.m}]} key={id+"v5"}>
                        <View style={styles.ratio1} key={id+"v6"}>
                            <Text style={styles.historyTimeText}>{timeString}</Text>
                        </View>
                        <View style={[styles.ratio1,{alignItems:"flex-end"}]} key={id+"v7"}>
                            <TouchableOpacity onPress={()=>{undoRecord(id)}}>
                                <Icon name={status?'trash':'undo'} type='font-awesome' style={{paddingLeft:Space.l}} size={28} color={status?Color.colorRed:Color.colorYellow}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },[getSequence])

    const RenderEmptyContainer = ()=>{
        return(
            <View style={{justifyContent:"center",height:100}}>
                <Text style={styles.flatlistEmptyText}>
                    {lang.txt("noRecord")}
                </Text>
            </View>
        );
    }

    const pad2=(number)=>{
        return (number < 10 ? '0' : '') + number
    }

    return (
        <Modal
        style={styles.modal}
        isVisible={getModalOn}
        onSwipeComplete={() => closeModal()}
        backdropOpacity={0.2}
        onBackdropPress={() => closeModal()}
        propagateSwipe={true}
        swipeDirection="down"
        >
            <View style={[styles.modalView]}>
                <View style={{padding:padding/2}}></View>
                <View>
                    <View style={styles.horizontal}>
                        <View style={styles.ratio1}>
                            <Text style={[styles.title,{paddingTop:0}]}>
                            {lang.txt("game")}{lang.txt("history")}
                            </Text>
                        </View>
                    </View>
                    <RenderIcon
                    getPlayerList={getPlayerList}
                    getSequence={getSequence}
                    />
                    <View style={{padding:Space.s}}></View>
                    <FlatList
                        style={styles.flatlist}
                        data={getHistory}
                        renderItem={({ item }) =>{
                            return <ItemView
                                id={item.id}
                                data={item.data}
                                round={item.id}
                                status={item.status}
                                time={item.time}
                                itemSelected={(itemSelected==item.id)?true:false}
                                onSelect={onSelect}
                            /> 
                        }}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={RenderEmptyContainer()}
                        extraData={itemSelected}
                    />
                </View>
                <View style={[styles.horizontal,{marginTop:0,marginBottom:Space.m,marginHorizontal:-Space.l}]}>
                    <ColumnAnimateButton 
                        text={lang.txt("back")}
                        offViewValue={1}
                        onViewValue={1.05}
                        offTextValue={0}
                        onTextValue={6}
                        call={()=>{closeModal()}}
                        backgroundColor={Color.bg}
                        textColor={Color.colorBlack}
                    />
                </View>
            </View>
        </Modal>
    ); 
});

export const RenderIcon = memo(({getPlayerList,getSequence})=>{
    const count = getSequence.length;
    let playerList = [];
    if(count==0){
        return(<View></View>);
    }
    getSequence.map((id)=>{
        getPlayerList.map((val,index)=>{
            if(id==val.id){
                playerList.push(
                    <View key={index} style={[styles.ratio1,styles.historyPlayerView]}>
                        <Image style={[styles.historyPlayerImage]} source={val.img} />
                        <Text style={styles.historyPlayerName}>{val.name}</Text>
                    </View>
                );
            }
        })
    })
    return (
        <View style={[styles.horizontal,{justifyContent:"space-around"}]}>
            <View style={[styles.ratio1,{paddingHorizontal:Space.m}]}>
            </View>
            <View style={[styles.horizontal,styles.ratio3,{paddingHorizontal:0,flex:4.5},(isTablet)?{flex:3.6}:{}]}>
                {playerList}
            </View>
        </View>
    );
})
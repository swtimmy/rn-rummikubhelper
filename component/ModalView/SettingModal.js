import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
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
import * as FileSystem from 'expo-file-system';
import {Audio} from 'expo-av';


var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;
const isRecordMusic = "isRecordMusic";

export const SettingModal = memo(({getModalOn,closeModal,unloadSound,updateSound,getIsPlaying,setIsPlaying,getSoundName,setSoundName,pauseSound,getMuteSound,setMuteSound,getLimitTime,setLimitTime,startRecording,stopRecording,getIsRecording,recording,setRecording})=>{
    const [rangeDisabled, setRangeDisabled] = useState(true);
    const [low, setLow] = useState(99);
    const [high, setHigh] = useState(10);
    const [min, setMin] = useState(10);
    const [max, setMax] = useState(180);
    const [floatingLabel, setFloatingLabel] = useState(false);
    const renderThumb = useCallback(() => <Thumb/>, []);
    const renderRail = useCallback(() => <Rail/>, []);
    const renderRailSelected = useCallback(() => <RailSelected/>, []);
    const renderLabel = useCallback(value => <Label text={value}/>, []);
    const renderNotch = useCallback(() => <Notch/>, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);
    
    useEffect(()=>{
        if(!getModalOn){
            setIsPlaying(false);
        }else{
            if(getIsRecording){
                stopRecording();
            }
            setLow(getLimitTime);
            if(getSoundName!=isRecordMusic){
                setRecording("");
            }
        }
    },[getModalOn])

    useEffect(()=>{
        setLimitTime(low);
    },[low])

    const setPickerValue=(value)=>{
        if(value!=isRecordMusic){
            updateSound(value);
            if(getIsRecording){
                stopRecording();
            }
            setRecording("");
        }else{
            unloadSound();
        }
        setSoundName(value);
    }
    
    const RenderPicker = () => {
        let pickerItem=[];
        for(let num = 1; num < 12; num++){
            pickerItem.push(
                <Picker.Item key={num} label={lang.txt("music")+" "+num} value={"0"+num}/>
            )
        }
        pickerItem.push(
            <Picker.Item key={isRecordMusic} label={lang.txt("handMake")} value={isRecordMusic}/>
        )
        return(
        <View>
            <Picker
            selectedValue={getSoundName}
            onValueChange={(item)=>setPickerValue(item)}
            style={[styles.picker,{overflow:"hidden",justifyContent:"center"}]}
            mode="dropdown"
            itemStyle={{ color:Color.colorBlack, fontWeight:'900', fontSize: 18, padding:30}}>
                {pickerItem}
            </Picker>
        </View>
        );
    }

    const RenderRecordBtn = () => {
        if(getSoundName==isRecordMusic){
            if(getIsRecording){
                return(
                    <View style={styles.ratio1}>
                        <TouchableOpacity style={styles.playBtn} onPress={()=>{stopRecording()}}>
                            <Icon name={'stop-outline'} type='ionicon' style={{}} size={50} color={Color.colorRed}/>
                        </TouchableOpacity>
                    </View>
                );
            }else{
                return(
                    <View style={styles.ratio1}>
                        <TouchableOpacity style={styles.playBtn} onPress={()=>{startRecording()}}>
                            <Icon name={'mic-outline'} type='ionicon' style={{marginLeft:3}} size={50} color={Color.colorRed}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        }else{
            return(<View></View>);
        }
    }

    const RenderPlayBtn = () =>{
        if(getSoundName==isRecordMusic&&(recording==""||getIsRecording)){
            return(<View></View>);
        }else if(getMuteSound){
            return(
                <View style={styles.ratio1}>
                    <TouchableOpacity style={styles.playBtn} onPress={()=>{setIsPlaying(setMuteSound(false))}}>
                        <Icon name={'volume-mute-outline'} type='ionicon' style={{}} size={50} color={Color.colorRed}/>
                    </TouchableOpacity>
                </View>
            );
        }else if(getIsPlaying){
            return(
                <View style={styles.ratio1}>
                    <TouchableOpacity style={styles.playBtn} onPress={()=>{setIsPlaying(!getIsPlaying)}}>
                        <Icon name={'pause-outline'} type='ionicon' style={{}} size={50} color={Color.colorRed}/>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <View style={styles.ratio1}>
                    <TouchableOpacity style={styles.playBtn} onPress={()=>{setIsPlaying(!getIsPlaying)}}>
                        <Icon name={'play-outline'} type='ionicon' style={{marginLeft:6}} size={50} color={Color.colorRed}/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    return (
        <Modal
        style={styles.modal}
        isVisible={getModalOn}
        onSwipeComplete={() => closeModal()}
        backdropOpacity={0.2}
        onBackdropPress={() => closeModal()}
        propagateSwipe={false}
        // swipeDirection="down"
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
                    <View style={[styles.horizontal,{marginBottom:-10}]}>
                        <View style={styles.ratio1}>
                            <Text style={[styles.subtitle,{alignSelf:"flex-start",paddingTop:0,fontSize:32,paddingLeft:Space.m}]}>
                            {lang.txt("timeLimit")} {low}{lang.txt("s")}
                            </Text>
                        </View>
                    </View>
                    <RangeSlider
                    style={styles.slider}
                    min={min}
                    max={max}
                    low={low}
                    high={high}
                    step={1}
                    disableRange={rangeDisabled}
                    floatingLabel={floatingLabel}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}
                    />
                    <View style={[styles.horizontal]}>
                        <View>
                            <Text style={[styles.subtitle,{padding:Space.m,color:Color.colorBlue}]}>10{lang.txt("s")}</Text>
                        </View>
                        <View style={styles.push}></View>
                        <View>
                            <Text style={[styles.subtitle,{padding:Space.m}]}>180{lang.txt("s")}</Text>
                        </View>
                    </View>
                    <View style={{padding:Space.l}}></View>
                    <View style={[styles.horizontal]}>
                        <View style={styles.ratio1}>
                            <Text style={[styles.subtitle,{alignSelf:"flex-start",paddingTop:0,fontSize:32,paddingLeft:Space.m}]}>
                            {lang.txt("alarm")}
                            </Text>
                        </View>
                    </View>
                    <View style={{padding:Space.m}}></View>
                    <View style={[styles.horizontal]}>
                        <View style={[styles.ratio3]}>
                            <RenderPicker/>
                        </View>
                        <RenderRecordBtn/>
                        <RenderPlayBtn/>
                    </View>
                </View>
                <View style={[styles.horizontal,{padding:padding}]}>
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
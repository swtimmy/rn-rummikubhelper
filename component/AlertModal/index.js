import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, Image, Text, View, Picker, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import Modal from 'react-native-modal';
import SwitchSelector from 'react-native-switch-selector';
import { Icon } from 'react-native-elements';
import {ColumnAnimateButton} from '../../component/ColumnAnimateButton'
import {AnimateButton} from '../../component/AnimateButton'
import { useLinkProps } from '@react-navigation/native';
import {GameHelper} from '../../utility/GameHelper'
import { set } from 'react-native-reanimated';
import { lang } from '../../assets/language';
import styles from './style';

var screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;

export const AlertModal = memo(({getModalOn,closeModal,title,text})=>{
    return (
        <Modal
        style={styles.modal}
        isVisible={getModalOn}
        // onSwipeComplete={() => setWinModalOn(false)}
        backdropOpacity={0.3}
        onBackdropPress={() => closeModal()}
        // propagateSwipe={true}
        // swipeDirection="down"
        >
            <View style={[styles.modalView]}>
                <View style={{position:"relative",justifyContent:"center"}}>
                    <Text style={[styles.title,{}]}>{title}</Text>
                    <Text style={[styles.subtitle,{}]}>{text}</Text>
                </View>
                <View style={[styles.horizontal,{padding:padding,paddingTop:padding/2,paddingBottom:0,justifyContent:"center"}]}>
                    <AnimateButton
                        text={lang.txt("ok")}
                        offViewValue={1}
                        onViewValue={1.2}
                        offTextValue={0}
                        onTextValue={6}
                        call={()=>{
                            closeModal();
                        }}
                    />
                </View>
            </View>
        </Modal>
    ); 
});
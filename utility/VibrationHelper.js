import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import {Vibration} from 'react-native';
import { get } from 'react-native-extra-dimensions-android';

export const VibrationHelper = {
    pattern:{
        sos:[1000,1000,1000,1000,300,300,300],
        slow:[2000,2000,2000],
        fast:[300,300,300],
        crazy:[100,100,500,100,500,100,500,100,100,100],
    },
    start:function(pattern=[222,222],repeat=true){
        Vibration.vibrate(pattern,repeat);
    },
    stop:function(){
        Vibration.cancel();
    },
};
// const abc = ()=>{};

// const edf = () =>{};

// export {abc,edf};
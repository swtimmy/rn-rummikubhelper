import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { get } from 'react-native-extra-dimensions-android';

export const GameHelper = {
    add:function(getHistory,getPlayerList,setPlayerList){
        if(getPlayerList.length<=0||getHistory.length<=0){
            return;
        }
        let playerList = getPlayerList;
        playerList.map((player,index)=>{
            playerList[index]['score'] = 0;
        });
        getHistory.map((v,i)=>{
            if(v.status==false){
                return;
            }
            Object.keys(v['data']).map((id)=>{
                playerList.map((player,index)=>{
                    if(player.id==id){
                        playerList[index]['score'] += parseFloat(v['data'][id]);
                        // console.log("player"+id+" >> "+v['data'][id])
                    }
                });
            });
        });
        setPlayerList([...playerList]);
    },
    undo:function(getHistory,id,setHistory){
        let history = getHistory;
        history.map((v,i)=>{
            if(v.id==id){
                history[i]['status']=!history[i]['status'];
            }
        });
        setHistory([...history]);
    }
};
// const abc = ()=>{};

// const edf = () =>{};

// export {abc,edf};
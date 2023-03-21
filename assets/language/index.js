import {AsyncStorage} from "react-native";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en.json';
import zh from './zh.json';

i18n.translations = { en, zh };
// i18n.locale = "en"; //default EN, other language use English
if(Localization.locale=="en"){
    i18n.locale = Localization.locale;
}else{
    i18n.locale = "zh";
}
i18n.fallbacks = true;

export const lang = {
    setLang: function(lang){
        try {
            AsyncStorage.setItem('lang', lang);
            i18n.locale = lang;
        }catch(exception) {

        }
    },
    getLang: async()=>{
        try {
            let lang;
            await AsyncStorage.getItem('lang',(err,result)=>{
                if(result){
                    lang =  result;
                }else{
                    lang =  (Localization.locale=="en")?Localization.locale:"zh";
                }
            })
            i18n.locale = lang;
            return lang;
        }catch(exception) {
            i18n.locale = (Localization.locale=="en")?Localization.locale:"zh";
            return (Localization.locale=="en")?Localization.locale:"zh";
        }
    },
    txt: function(txt){
        return i18n.t(txt);
    }
}
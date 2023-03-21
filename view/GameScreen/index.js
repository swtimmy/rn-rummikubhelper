import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import {
  Animated,
  FlatList,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  Clipboard,
  ImageBackground,
  I18nManager,
} from "react-native";
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { isTablet } from "react-native-device-detection";
import { Icon, CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import { BackButton } from "../../component/BackButton";
import { ColumnAnimateButton } from "../../component/ColumnAnimateButton";
import { StatusBar } from "expo-status-bar";
import styles from "./style";
import { Color } from "../../assets/style/color";
import { Space } from "../../assets/style/space";
import { lang } from "../../assets/language";
import { CountdownTimer } from "../../component/CountdownTimer";
import { CarouselSliderView } from "../../component/CarouselSliderView";
import { CarouselPaginationView } from "../../component/CarouselPaginationView";
import { Audio } from "expo-av";
import { VibrationHelper } from "../../utility/VibrationHelper";
import { music } from "../../assets/music";
import { AnimateIconButton } from "../../component/AnimateIconButton";
import { SettingModal } from "../../component/ModalView/SettingModal";
import { InputModal } from "../../component/ModalView/InputModal";
import { HistoryModal } from "../../component/ModalView/HistoryModal";
import { GameHelper } from "../../utility/GameHelper";
import * as FileSystem from "expo-file-system";

import Carousel, { Pagination } from "react-native-snap-carousel";

import * as Analytics from "expo-firebase-analytics";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = 15;
const notTallMobile = screenH < 890 ? true : false;
const isRecordMusic = "isRecordMusic";

const bannerID =
  Platform.OS === "ios"
    ? "ca-app-pub-xxxxxxxxxx/xxxxxxx"
    : "ca-app-pub-xxxxxxxxxx/xxxxxxx";

export default function GameScreen({ navigation, route }) {
  const { gameSetting, player, history } = route.params;
  const [keyboardOn, setKeyboardOn] = useState(false);
  const [getStart, setStart] = useState(true);
  const [getRound, setRound] = useState(gameSetting.round);
  const [getMuteSound, setMuteSound] = useState(false);
  const [getClock, setClock] = useState(1);
  const [getIsPlaying, setIsPlaying] = useState(false);
  const [getGameID, setGameID] = useState(gameSetting.id);

  const [getSlideActiveIndex, setSlideActiveIndex] = useState(-1);
  const [getSlideAutoNextCount, setSlideAutoNextCount] = useState(0);

  const [getPlayerList, setPlayerList] = useState([]);
  const [getIsFirstGame, setIsFirstGame] = useState(true);
  const [getLimitTime, setLimitTime] = useState(99);
  const [getSoundName, setSoundName] = useState("01");
  const [getHistory, setHistory] = useState(history);
  const [sound, setSound] = useState(false);
  const [getSoundUrl, setSoundUrl] = useState("");
  const [getUndo, setUndo] = useState(0);
  const [recording, setRecording] = useState("");
  const [getIsRecording, setIsRecording] = useState(false);

  const [getSettingModalOn, setSettingModalOn] = useState(false);
  const [getHistoryModalOn, setHistoryModalOn] = useState(false);
  const [getInputModalOn, setInputModalOn] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setIsPlaying(false);
      VibrationHelper.stop();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!sound) {
      return;
    }
    if (getIsPlaying) {
      playSound();
    } else {
      pauseSound();
    }
  }, [getIsPlaying]);

  useEffect(() => {
    if (getInputModalOn) {
      setStart(false);
      setIsPlaying(false);
      VibrationHelper.stop();
    } else {
      if (!getIsFirstGame) {
        setStart(true);
      }
    }
  }, [getInputModalOn]);

  useEffect(() => {
    if (getSettingModalOn) {
      setStart(false);
      setIsPlaying(false);
      VibrationHelper.stop();
    } else {
      if (!getIsFirstGame) {
        setStart(true);
      }
    }
  }, [getSettingModalOn]);

  useEffect(() => {
    if (getHistoryModalOn) {
      setStart(false);
      setIsPlaying(false);
      VibrationHelper.stop();
    } else {
      if (!getIsFirstGame) {
        setStart(true);
      }
    }
  }, [getHistoryModalOn]);

  useEffect(() => {
    if (!sound) {
      return;
    }
    if (getMuteSound) {
      muteSound();
    } else {
      unmuteSound();
    }
  }, [getMuteSound]);

  async function muteSound() {
    await sound.setVolumeAsync(0);
  }

  async function unmuteSound() {
    await sound.setVolumeAsync(1);
  }

  async function playSound() {
    await sound.playAsync();
  }

  async function pauseSound() {
    await sound.stopAsync();
  }

  async function initSound() {
    if (gameSetting.music.pickerName == isRecordMusic) {
      // console.log(gameSetting.music.src);
      const { sound } = await Audio.Sound.createAsync(
        { uri: gameSetting.music.src },
        {},
        _onPlaybackStatusUpdate
      );
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      sound.setIsLoopingAsync(true);
      setRecording(true);
      setSound(sound);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        music[gameSetting.music.pickerName]
      );
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      sound.setIsLoopingAsync(true);
      sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      setSound(sound);
    }
    setSoundName(gameSetting.music.pickerName);
    // console.log("initSound End")
  }

  async function unloadSound() {
    setIsPlaying(false);
    await sound.unloadAsync();
    setSound(sound);
  }

  async function updateSound(filename) {
    setIsPlaying(false);
    await sound.unloadAsync();
    await sound.loadAsync(music[filename]);
    sound.setIsLoopingAsync(true);
    setSound(sound);
  }

  async function updateSoundFromRecord(uri) {
    setIsPlaying(false);
    setSoundUrl(uri);
    await sound.unloadAsync();
    await sound.loadAsync({ uri: uri }, {}, _onPlaybackStatusUpdate);
    sound.setIsLoopingAsync(true);
    setSound(sound);
  }

  const _onPlaybackStatusUpdate = (playbackStatus) => {
    //use for check audio info
    // console.log(playbackStatus);
  };

  async function asyncCall() {
    await Analytics.setCurrentScreen("GameScreen");
  }

  const countTimeDone = () => {
    setIsPlaying(true);
    VibrationHelper.start(VibrationHelper.pattern.crazy, true);
  };

  const countTimeStart = () => {
    setIsFirstGame(false);
    setStart(true);
    toNextPlayer();
    setClock(getClock + 1);
    setIsPlaying(false);
    VibrationHelper.stop();
  };

  useEffect(() => {
    asyncCall();
    initSound();
    initGame();
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.payload.name != "Index") {
        e.preventDefault();
      } else {
        navigation.dispatch(e.data.action);
      }
    });
  }, []);

  const initGame = () => {
    let playerArr = [];
    for (let p in player) {
      let obj = {};
      obj["id"] = player[p]["id"];
      obj["name"] = player[p]["name"];
      obj["score"] = player[p]["score"];
      obj["img"] = player[p]["img"];
      playerArr.push(obj);
    }
    setIsPlaying(false);
    VibrationHelper.stop();
    setPlayerList(playerArr);
    setLimitTime(gameSetting["timeLimit"]);
    setRound(gameSetting["round"]);
  };

  useEffect(() => {
    // console.log("hihihi")
    // console.log(getPlayerList)
  }, [getPlayerList]);

  const onBack = () => {
    navigation.navigate("Index");
  };

  const goResult = () => {
    setStart(false);
    navigation.push("Result", {
      player: getPlayerList,
      result: getHistory,
    });
  };

  useEffect(() => {
    save();
  }, [getHistory]);

  useEffect(() => {
    GameHelper.add(getHistory, getPlayerList, setPlayerList);
  }, [getHistory]);

  const undoRecord = useCallback(
    (id) => {
      GameHelper.undo(getHistory, id, setHistory);
      setUndo(getUndo + 1);
    },
    [getHistory]
  );

  const updateRecord = useCallback(
    (obj) => {
      let data = {};
      let newHistory = [];
      let playerList = getPlayerList;
      for (const id in obj) {
        data[id] = obj[id];
      }
      let history = {};
      let round = getRound + 1;
      history["id"] = round;
      history["status"] = true;
      history["time"] = new Date().getTime();
      history["data"] = data;
      newHistory.push(history);
      setHistory([...getHistory, ...newHistory]);
      setInputModalOn(false);
      setIsFirstGame(true);
      setStart(false);
      setRound(round);
    },
    [getHistory]
  );

  async function startRecording() {
    try {
      setIsPlaying(false);
      // console.log("requesting permission..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      // console.log("starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      // console.log("Recording started");
    } catch (err) {
      // console.log("failed to start recording",err);
      setIsRecording(false);
    }
  }

  async function stopRecording() {
    // console.log("stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const format = uri.split(".").pop();
    const target = FileSystem.documentDirectory + "rummikubHelperRecord";
    const checkFolder = await FileSystem.getInfoAsync(target);
    if (!checkFolder["exists"]) {
      await FileSystem.makeDirectoryAsync(target).catch((error) => {
        // console.error('folder exist.');
      });
    }
    const to = target + "/Track." + format;
    // console.log("Recording stopped and stored at",uri);
    // console.log("New file",to);
    await FileSystem.moveAsync({ from: uri, to: to }).then(() => {
      updateSoundFromRecord(to);
    });
    // const {sound} = await recording.createNewLoadedSoundAsync({
    //     isLooping: true,
    // });
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    // await setSound(sound);
    setIsRecording(false);
  }

  const toNextPlayer = () => {
    // console.log(getIsFirstGame)
    if (!getIsFirstGame || getRound == 0) {
      setSlideAutoNextCount(getSlideAutoNextCount + 1);
    }
    if (getSlideActiveIndex + 1 >= getPlayerList.length) {
      setSlideActiveIndex(0);
    } else {
      setSlideActiveIndex(getSlideActiveIndex + 1);
    }
  };

  const bannerError = (err) => {
    console.log(err);
    Analytics.logEvent("BannerError", {
      name: "banner error",
      screen: "GameScreen",
      purpose: err,
    }).catch((error) => {
      console.log(error);
    });
  };

  const RenderNextPlayerButton = () => {
    return (
      <View style={[getIsFirstGame ? { opacity: 0 } : {}]}>
        <AnimateIconButton
          iconName={"arrow-forward-outline"}
          iconType={"ionicon"}
          iconSize={50}
          text={lang.txt("pass")}
          offViewValue={1}
          onViewValue={1.2}
          offTextValue={0}
          onTextValue={6}
          call={getIsFirstGame ? () => {} : countTimeStart}
        />
      </View>
    );
  };

  const save = () => {
    if (getRound == gameSetting.round && getUndo == 0) {
      return false;
    }
    let currentGameSetting = gameSetting;
    currentGameSetting["timeLimit"] = getLimitTime;
    currentGameSetting["numPlayer"] = getPlayerList.length;
    currentGameSetting["round"] = getRound;
    if (getSoundName == isRecordMusic) {
      currentGameSetting["music"] = { pickerName: "01", src: "Empty" };
    } else {
      currentGameSetting["music"]["src"] = "Empty";
    }
    currentGameSetting["music"]["pickerName"] = getSoundName;
    currentGameSetting["music"]["src"] = getSoundUrl;
    let currentPlayer = {};
    getPlayerList.map((value, key) => {
      currentPlayer[key] = value;
    });
    let data = {};
    data[getGameID] = {};
    data[getGameID]["gameSetting"] = currentGameSetting;
    data[getGameID]["player"] = currentPlayer;
    data[getGameID]["history"] = getHistory;
    data[getGameID]["lastTime"] = new Date().getTime();
    data[getGameID]["id"] = getGameID;
    AsyncStorage.getItem("history", (err, result) => {
      if (result !== null) {
        var obj = JSON.parse(result);
        obj[getGameID] = data[getGameID];
        var newObj = { ...obj };
        AsyncStorage.setItem("history", JSON.stringify(newObj));
      } else {
        AsyncStorage.setItem("history", JSON.stringify(data));
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.main]}>
        <View style={styles.push}></View>
        <View style={{ height: 100 }}>
          <CarouselSliderView
            data={getPlayerList}
            loop={true}
            setActiveIndex={setSlideActiveIndex}
            getSlideAutoNextCount={getSlideAutoNextCount}
            getRound={getRound}
            getIsFirstGame={getIsFirstGame}
          />
          <CarouselPaginationView
            dataLength={getPlayerList.length}
            activeIndex={getSlideActiveIndex}
          />
        </View>
        <View style={{ padding: Space.m }}></View>
        <CountdownTimer
          getStart={getStart}
          getClock={getClock}
          limitTime={getLimitTime}
          isInit={getIsFirstGame}
          onStart={countTimeStart}
          onComplete={countTimeDone}
          onStop={() => {
            countTimeStart();
          }}
          onPause={() => {
            setStart(!getStart);
          }}
        />
        <View style={{ padding: Space.xxxs }}></View>
        <CheckBox
          Component={TouchableOpacity}
          checked={getMuteSound}
          onPress={() => {
            setMuteSound(!getMuteSound);
          }}
          title={lang.txt("mute")}
          containerStyle={styles.checkbox}
          textStyle={[styles.checkbox, { marginBottom: 2, marginLeft: 5 }]}
          checkedColor={Color.colorBlack}
          iconLeft={true}
          center={true}
          size={28}
        />
        <RenderNextPlayerButton />
        {/* <View style={{padding:Space.xxxs}}></View> */}
        <View style={styles.push}></View>
        <View style={styles.ads}>
          <AdMobBanner
            // bannerSize="banner"
            adUnitID={bannerID}
            servePersonalizedAds={false}
            onDidFailToReceiveAdWithError={bannerError}
          />
        </View>
        <View style={styles.push}></View>
        <View style={styles.horizontal}>
          <ColumnAnimateButton
            text={lang.txt("result")}
            offViewValue={1}
            onViewValue={1.05}
            offTextValue={0}
            onTextValue={6}
            call={() => {
              goResult();
            }}
          />
          <ColumnAnimateButton
            text={lang.txt("record")}
            offViewValue={1}
            onViewValue={1.05}
            offTextValue={0}
            onTextValue={6}
            call={() => {
              setInputModalOn(true);
            }}
          />
        </View>
        <BackButton text={lang.txt("back")} call={onBack} delayDisplay={500} />
        <TouchableOpacity
          style={styles.settingBtn}
          onPress={() => {
            setSettingModalOn(true);
          }}
        >
          <Icon
            name="cog"
            type="font-awesome"
            style={{}}
            size={22}
            color={Color.colorYellow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.undoBtn}
          onPress={() => {
            setHistoryModalOn(true);
          }}
        >
          <Icon
            name="list-alt"
            type="font-awesome"
            style={{}}
            size={22}
            color={Color.colorYellow}
          />
        </TouchableOpacity>
        <SettingModal
          getModalOn={getSettingModalOn}
          closeModal={() => {
            if (recording == "" && getSoundName == isRecordMusic) {
              alert(lang.txt("stopRecording"));
            } else {
              setSettingModalOn(false);
            }
          }}
          unloadSound={unloadSound}
          updateSound={updateSound}
          getIsPlaying={getIsPlaying}
          setIsPlaying={setIsPlaying}
          updateSoundFromRecord={updateSoundFromRecord}
          playSound={playSound}
          pauseSound={pauseSound}
          getSoundName={getSoundName}
          setSoundName={setSoundName}
          getMuteSound={getMuteSound}
          setMuteSound={setMuteSound}
          getLimitTime={getLimitTime}
          setLimitTime={setLimitTime}
          startRecording={startRecording}
          stopRecording={stopRecording}
          getIsRecording={getIsRecording}
          recording={recording}
          setRecording={setRecording}
        />
        <HistoryModal
          getModalOn={getHistoryModalOn}
          closeModal={() => {
            setHistoryModalOn(false);
          }}
          getPlayerList={getPlayerList}
          getHistory={getHistory}
          undoRecord={undoRecord}
        />
        <InputModal
          getModalOn={getInputModalOn}
          closeModal={() => {
            setInputModalOn(false);
          }}
          updateRecord={updateRecord}
          getPlayerList={getPlayerList}
          setPlayerList={setPlayerList}
        />
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}

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
import { Icon } from "react-native-elements";
import { AnimateButton } from "../../component/AnimateButton";
import { BackButton } from "../../component/BackButton";
import { ColumnAnimateButton } from "../../component/ColumnAnimateButton";
import RangeSlider from "rn-range-slider";
import Thumb from "../../component/Slider/Thumb";
import Rail from "../../component/Slider/Rail";
import RailSelected from "../../component/Slider/RailSelected";
import Notch from "../../component/Slider/Notch";
import SwitchSelector from "react-native-switch-selector";
import Label from "../../component/Slider/Label";
import { StatusBar } from "expo-status-bar";
import styles from "./style";
import { Color } from "../../assets/style/color";
import { Space } from "../../assets/style/space";
import { lang } from "../../assets/language";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import * as Analytics from "expo-firebase-analytics";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";

const screen = Dimensions.get("window");
const screenW = screen.width;
const screenH = screen.height;
const padding = screenH <= 667 ? 8 : 15;
const fontSize = screenH <= 667 ? 22 : 28;
const cellHeight = 50;
let cellWidth = 100;
const roundCellWidth = 70;

const bannerID =
  Platform.OS === "ios"
    ? "ca-app-pub-xxxxxxxxxx/xxxxxxx"
    : "ca-app-pub-xxxxxxxxxx/xxxxxxx";

export default function ResultScreen({ navigation, route }) {
  const { player, result, history } = route.params;
  const [getResult, setResult] = useState(result);
  const [getPlayer, setPlayer] = useState(player);
  const [getTableHead, setTableHead] = useState([]);
  const [getTableHeadImage, setTableHeadImage] = useState([]);
  const [getTableBody, setTableBody] = useState([]);
  const [getRoundCell, setRoundCell] = useState([]);
  const [getTableWidth, setTableWidth] = useState(0);

  async function asyncCall() {
    await Analytics.setCurrentScreen("ResultScreen");
  }

  useEffect(() => {
    asyncCall();
    let headNameArr = [];
    let headImageArr = [];
    let headIdArr = [];
    let headMarkArr = [];
    let count = 0;
    let sequence = [];
    for (const index in getPlayer) {
      headNameArr.push(getPlayer[index]["name"]);
      headImageArr.push(getPlayer[index]["img"]);
      sequence.push(getPlayer[index]["id"]);
      let fontSize = 20;
      if (getPlayer[index]["score"] > 99999) {
        fontSize = 14;
      } else if (getPlayer[index]["score"] > 9999) {
        fontSize = 16;
      } else if (getPlayer[index]["score"] > 999) {
        fontSize = 18;
      }
      if (getPlayer[index]["score"] < 0) {
        headMarkArr.push(
          <Text style={[styles.text, styles.totalDown, { fontSize: fontSize }]}>
            {getPlayer[index]["score"]}
          </Text>
        );
      } else {
        headMarkArr.push(
          <Text style={[styles.text, styles.totalUp, { fontSize: fontSize }]}>
            {getPlayer[index]["score"]}
          </Text>
        );
      }
      headIdArr.push(getPlayer[index]["id"]);
      count++;
    }

    setTableHead([...headNameArr]);
    setTableHeadImage([...headImageArr]);
    let bodyArr = [];
    let dataArr = [];
    let roundArr = [];
    bodyArr.push(headMarkArr);
    roundArr.push(lang.txt("totalMark"));
    getResult.map((result, index) => {
      dataArr = [];
      if (result["status"]) {
        headIdArr.map((value) => {
          let score = "-";
          for (let id in result["data"]) {
            if (id == value) {
              score = result["data"][id];
              break;
            }
          }
          if (score < 0) {
            dataArr.push(
              <Text style={(styles.text, styles.down)}>{score}</Text>
            );
          } else {
            dataArr.push(<Text style={(styles.text, styles.up)}>{score}</Text>);
          }
        });
      } else {
        dataArr.push(
          <Text style={(styles.text, styles.gray)}>{lang.txt("canceled")}</Text>
        );
      }
      bodyArr.push(dataArr);
      roundArr.push(parseInt(result["id"]));
    });
    setTableBody([...bodyArr]);
    setRoundCell([...roundArr]);
    if (count <= 4) {
      cellWidth = (screenW - padding * 2 - 4 - roundCellWidth) / count;
    } else {
      if (screenW >= 768) {
        if (count <= 7) {
          cellWidth = (screenW - padding * 2 - 4 - roundCellWidth) / count;
        } else {
          cellWidth = (screenW - padding * 2 - 4 - roundCellWidth) / 8;
        }
      } else {
        cellWidth = (screenW - padding * 2 - 4 - roundCellWidth) / 5;
      }
    }
    setTableWidth(count * cellWidth);
  }, []);

  const onBack = () => {
    navigation.pop();
  };

  const RenderRoundView = () => {
    return (
      <View style={{ flexDirection: "column" }}>
        {getRoundCell.map((round) => {
          return (
            <View style={styles.cell} key={round}>
              <Text style={styles.cellText}>{round}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const RenderHeaderImage = () => {
    let arr = [];
    getTableHeadImage.map((img) => {
      arr.push(
        <View
          style={{
            width: cellWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={[styles.playerImage]} source={img} />
        </View>
      );
    });
    return arr;
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.main]}>
        <Text style={styles.title}>{lang.txt("result")}</Text>
        <View
          style={{
            marginLeft: padding,
            marginRight: padding,
            flex: 1,
            backgroundColor: Color.bg,
            borderWidth: 1,
            borderColor: Color.colorBlack,
          }}
        >
          <ScrollView
            style={{ minWidth: "100%" }}
            horizontal={true}
            // automaticallyAdjustContentInsets={true}
            bounces={false}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={[styles.horizontal]}>
                <View style={[styles.cell, { alignSelf: "center" }]}>
                  <Text style={[styles.cellText, { marginTop: 0 }]}>
                    {lang.txt("round")}
                  </Text>
                </View>
                <View>
                  <View style={[styles.horizontal, { marginTop: 10 }]}>
                    <RenderHeaderImage />
                  </View>
                  <Table
                    style={{ width: getTableWidth }}
                    borderStyle={{ borderWidth: 0, borderColor: Color.bg }}
                  >
                    <Row
                      data={getTableHead}
                      style={[styles.header]}
                      textStyle={[styles.headText, { width: cellWidth }]}
                    />
                  </Table>
                </View>
              </View>
              <ScrollView style={styles.dataWrapper} horizontal={false}>
                <View style={styles.horizontal}>
                  <RenderRoundView />
                  <Table
                    style={{ width: getTableWidth, flexDirection: "column" }}
                    borderStyle={{ borderWidth: 0, borderColor: Color.bg }}
                  >
                    {getTableBody.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        style={[
                          styles.row,
                          index % 2 == 0
                            ? { backgroundColor: Color.bg }
                            : { backgroundColor: Color.bg },
                        ]}
                        textStyle={[styles.text, { width: cellWidth }]}
                      />
                    ))}
                  </Table>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View style={styles.ads}>
          <AdMobBanner
            // bannerSize="banner"
            adUnitID={bannerID}
            servePersonalizedAds={false}
            onDidFailToReceiveAdWithError={bannerError}
          />
        </View>
        <View style={[styles.horizontal]}>
          <ColumnAnimateButton
            text={lang.txt("back")}
            offViewValue={1}
            onViewValue={1.05}
            offTextValue={0}
            onTextValue={6}
            call={() => {
              onBack();
            }}
          />
        </View>
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}

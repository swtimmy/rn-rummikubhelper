import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: Color.colorBlue,
    borderRadius: 2,
  },
});

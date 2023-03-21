import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Color} from '../../assets/style/color'
import {Space} from '../../assets/style/space'

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: Space.s,
    backgroundColor: Color.colorBlue,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: Color.bg,
  },
});

export default memo(Label);

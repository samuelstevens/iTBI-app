import React from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';

const DocumentListItem = ({ item, onPress = () => {} }) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={0.25}
    underlayColor="rgba(0,0,0,0)"
  >
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.fileName}</Text>
      </View>
      <Ionicons name="ios-arrow-forward" size={32} color={colors.primaryColor} />
    </View>
  </TouchableHighlight>
);

const DocumentListSeparator = () => <View style={styles.separator} />;

const padding = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },

  text: {
    fontSize: 17,
  },

  separator: {
    marginLeft: padding,
    marginRight: padding,
    height: 1,
    backgroundColor: colors.primaryColor,
    flex: 1,
    flexDirection: 'row',
  },
});


export { DocumentListItem, DocumentListSeparator };

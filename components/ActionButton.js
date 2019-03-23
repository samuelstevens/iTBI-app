import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';

const ActionButton = ({ onPress, iconName, buttonIndex = 0 }) => (
  <TouchableOpacity
    style={buttonStyle(buttonIndex)}
    onPress={onPress}
    underlayColor={colors.white}
  >
    <Ionicons name={iconName} size={32} color="white" />
  </TouchableOpacity>
);

const buttonStyle = index => ({
  // size
  height: 70,
  width: 70,
  borderRadius: 40,

  // color
  backgroundColor: colors.primaryColor,

  // children
  alignItems: 'center',
  justifyContent: 'center',

  // position
  position: 'absolute',
  right: 15,
  bottom: 15 + index * 85,

  // shadow
  elevation: 5,
  borderWidth: 0,
  shadowOpacity: 0.5,
  shadowRadius: 3,
  shadowColor: 'black',
  shadowOffset: { height: 2, width: 1 },
});

export default ActionButton;

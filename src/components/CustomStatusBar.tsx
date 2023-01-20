import React from 'react';
import {StatusBar, Platform} from 'react-native';

export const CustomStatusBar = () => {
  if (Platform.OS === 'android') {
    return <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />;
  } else {
    return <StatusBar barStyle="dark-content" />;
  }
};

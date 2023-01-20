import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
    Provider as PaperProvider,
} from "react-native-paper";
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from "./RootStackScreen";
import { MenuProvider } from 'react-native-popup-menu';

export interface NavigationProps {
    navigation?: any
    route?: any
}

const ApplicationNavigator = () => {

  return (
      <PaperProvider>
          <SafeAreaProvider>
              <MenuProvider>
                  <NavigationContainer>
                      <RootStackScreen />
                  </NavigationContainer>
              </MenuProvider>
          </SafeAreaProvider>
      </PaperProvider>
  );
};

export default ApplicationNavigator;

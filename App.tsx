/**
 * Movie App
 * A React Native app that interacts with the FreeTestAPI Movies API
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

function App() {
  const isDarkMode = false;

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor="#ffffff"
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;

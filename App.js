import React from 'react';
import { useState, useEffect } from 'react';
import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TwoPlayer from './TwoPlayer';
import Home from './Home';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider   >
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="twoPlayer" component={TwoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};



export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import AboutScreen from './AboutScreen';
import TrackListScreen from './TrackListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Tracks" component={TrackListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
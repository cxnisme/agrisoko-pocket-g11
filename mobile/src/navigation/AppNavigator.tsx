import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import AskScreen from '../screens/AskScreen';
import ResultScreen from '../screens/ResultScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.field },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'AgriSoko Pocket' }} />
        <Stack.Screen name="Ask" component={AskScreen} options={{ title: 'Ask the team' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Result' }} />
        <Stack.Screen name="Directory" component={DirectoryScreen} options={{ title: 'Team directory' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Member profile' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About and evidence' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

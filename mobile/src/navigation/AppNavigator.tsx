import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import { colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import AskScreen from '../screens/AskScreen';
import ResultScreen from '../screens/ResultScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.field },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          tabBarActiveTintColor: colors.field,
          tabBarInactiveTintColor: colors.soil,
          tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 8 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Ask" component={AskScreen} options={{ title: 'Ask' }} />
        <Tab.Screen name="Result" component={ResultScreen} options={{ title: 'Result', tabBarStyle: { display: 'none' } }} />
        <Tab.Screen name="Directory" component={DirectoryScreen} options={{ title: 'Directory' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', tabBarStyle: { display: 'none' } }} />
        <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Icons } from '../assets/icons';
import { useTheme } from '../theme/useTheme';
import HomeScreen from '../screens/driver/dashboard/home/HomeScreen';
import ProfileScreen from '../screens/driver/dashboard/profile/ProfileScreen';
import MessagesScreen from '../screens/driver/dashboard/messages/MessagesScreen';
import useAuth from '../hooks/useAuth';
import ChatScreen from '../screens/driver/dashboard/messages/ChatScreen';

const Tab = createBottomTabNavigator();
const { Screen, Navigator } = createStackNavigator();

const screenOptions = {
  headerShown: false,
};


const HomeStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Screen name="Home" component={HomeScreen} />

    </Navigator>
  );
};

const MessagesStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Messages" screenOptions={screenOptions}>
      <Screen name="Messages" component={MessagesScreen} />
    </Navigator>
  );
};

const MessageStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="MessagesScreen" screenOptions={screenOptions}>
      <Screen name="MessagesScreen" component={MessagesScreen} />
      <Screen name="ChatScreen" component={ChatScreen} />
    </Navigator>
  );
};


const TabNavDriver = (): React.JSX.Element => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...screenOptions,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray3,
        tabBarStyle: {
          backgroundColor: colors.white,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={({ route }) => {
          return {
            tabBarIcon: (props: any) => (
              <Icons.Home
                color={props.focused ? colors.primary : colors.gray3}
              />
            ),
            headerShown: false,
          };
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Messages"
        options={({ route }) => {
          return {
            tabBarIcon: (props: any) => (
              <Icons.Message
                color={props.focused ? colors.primary : colors.gray3}
              />
            ),
            headerShown: false,
          };
        }}
        component={MessageStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: (props: any) => (
            <Icons.User
              color={props.focused ? colors.primary : colors.gray3}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavDriver;

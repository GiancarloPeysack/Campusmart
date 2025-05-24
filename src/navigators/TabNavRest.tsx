import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ArrowLeftIcon,
  HStack,
  Icon,
  Pressable,
  Text,
} from '@gluestack-ui/themed';

import {Icons} from '../assets/icons';
import {useTheme} from '../theme/useTheme';
import HomeScreen from '../screens/restaurent/dashboard/home/HomeScreen';
import OrderScreen from '../screens/restaurent/dashboard/order';
import MenuScreen from '../screens/restaurent/dashboard/menu/MenuScreen';
import EditRestaurentProfile from '../screens/restaurent/dashboard/editRestaurent/EditRestaurentScreen';
import CreateCategory from '../components/ui/Restaurant/CreateCategory';
import CreateMenu from '../components/ui/Restaurant/CreateMenu';
import DeliveryScreen from '../screens/restaurent/dashboard/delivery/DeliveryScreen';
import AssignDriverScreen from '../screens/restaurent/dashboard/order/assignDriver/AssignDriverScreen';

const Tab = createBottomTabNavigator();
const {Screen, Navigator} = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const CommonHeader = (props: any) => {
  const {colors} = useTheme();
  const {title} = props.route.params;

  return (
    <HStack
      alignItems="center"
      px={16}
      bg={colors.white}
      h={45}
      borderBottomWidth={1}
      borderBottomColor={colors.gray1}>
      <HStack alignItems="center" gap={20}>
        <Pressable
          $active-opacity={0.8}
          zIndex={999}
          p={5}
          onPress={() => props.navigation.goBack()}>
          <Icon as={ArrowLeftIcon} color="$black" />
        </Pressable>
      </HStack>
      <Text
        position="absolute"
        textAlign="center"
        left={0}
        right={0}
        textTransform="capitalize"
        color="$black"
        fontWeight="$semibold"
        fontSize={18}>
        {title}
      </Text>
    </HStack>
  );
};

const HomeStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Screen name="Home" component={HomeScreen} />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="EditProfile"
        component={EditRestaurentProfile}
      />
    </Navigator>
  );
};

const DeliveryStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Delivery" screenOptions={screenOptions}>
      <Screen name="Delivery" component={DeliveryScreen} />
     
    </Navigator>
  );
};

const OrderStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Order" screenOptions={screenOptions}>
      <Screen name="Order" component={OrderScreen} />
       <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="assignDriver"
        component={AssignDriverScreen}
      />
    </Navigator>
  );
};

const MenuStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Menu" screenOptions={screenOptions}>
      <Screen name="Menu" component={MenuScreen} />
      <Screen
        name="createCategory"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={CreateCategory}
      />
      <Screen
        name="createMenu"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={CreateMenu}
      />
    </Navigator>
  );
};

const TabNavRest = (): React.JSX.Element => {
  const {colors} = useTheme();
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
        options={({route}) => {
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
        name="Orders"
        options={({route}) => {
          return {
            tabBarIcon: (props: any) => (
              <Icons.Orders
                color={props.focused ? colors.primary : colors.gray3}
              />
            ),
            headerShown: false,
          };
        }}
        component={OrderStack}
      />
      <Tab.Screen
        name="Delivery"
        options={{
          tabBarIcon: (props: any) => (
            <Icons.Truck
              color={props.focused ? colors.primary : colors.gray3}
            />
          ),
        }}
        component={DeliveryStack}
      />
      <Tab.Screen
        name="Menu"
        options={{
          tabBarIcon: (props: any) => (
            <Icons.Food color={props.focused ? colors.primary : colors.gray3} />
          ),
        }}
        component={MenuStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavRest;

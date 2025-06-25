import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ArrowLeftIcon,
  Badge,
  BadgeText,
  HStack,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  MenuIcon,
  Pressable,
  SearchIcon,
  SettingsIcon,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { Icons } from '../assets/icons';
import { useTheme } from '../theme/useTheme';
import FoodScreen from '../screens/dashboard/food/FoodScreen';
import MarketScreen from '../screens/dashboard/market/MarketScreen';
import PopularScreen from '../screens/dashboard/food/PopularScreen';
import Search from '../components/ui/Food/Search';
import RestaurantScreen from '../screens/dashboard/food/RestaurantScreen';
import DishScreen from '../screens/dashboard/food/DishScreen';
import CartScreen from '../screens/dashboard/cart/CartScreen';
import { CheckoutScreen } from '../screens/dashboard/cart/CheckoutScreen';
import { PaymentScreen } from '../screens/dashboard/cart/PaymentScreen';
import { ProfileScreen } from '../screens/dashboard/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/dashboard/profile/EditProfile';
import { useCart } from '../context/cart';
import { AddCard } from '../components/ui/Checkout/AddCard';
import {
  Image,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import NotificationScreen from '../screens/dashboard/notifications/NotificationScreen';
import OrdersScreen from '../screens/dashboard/orders/OrdersScreen';
import { OrderDetails } from '../screens/dashboard/orderDetails/OrderDetails';
import CommunityScreen from '../screens/dashboard/community/CommunityScreen';
import useAuth from '../hooks/useAuth';
import { EditOnboard } from '../screens/dashboard/EditOnboard/EditOnboard';
import CreatePost from '../screens/dashboard/community/Create/CreatePost';

const Tab = createBottomTabNavigator();
const { Screen, Navigator } = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const ComingSoonModal = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <TouchableWithoutFeedback onPress={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 10,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Icons.Clock color={'#2563EB'} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: '#000',
                lineHeight: 40,
              }}>
              Coming Soon
            </Text>
            <Text style={{ fontSize: 16 }}>
              We're working on something amazing!
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const CommonHeader = (props: any) => {
  const { colors } = useTheme();
  const { title } = props.route.params;
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

const AdvanceHeader = (props: any) => {
  const { colors } = useTheme();
  const name = props.route.name;

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      px={16}
      bg={colors.white}
      h={Platform.OS === 'android' ? 65 : 45}
      borderBottomWidth={1}
      borderBottomColor={colors.gray1}>
      <Text fontWeight="$bold" fontSize={20} color={colors.primary}>
        {name === 'Cart' ? 'Shopping Cart' : name === 'Community' ? 'Community' : 'Campus'}
      </Text>
      <HStack gap={16} alignItems="center">
        {name !== 'Cart' && name !== 'Community' && (
          <Pressable onPress={() => props.navigation.navigate('Search')}>
            <Icons.Search />
          </Pressable>
        )}
        {name === 'Community' && (
          <Pressable onPress={() => props.navigation.navigate('Chat')}>
            <Icons.MessageSmall size={20} color={'red'} />
          </Pressable>
        )}

        <Pressable
          onPress={() =>
            props.navigation.navigate('Notifications', { title: 'Notifications' })
          }>
          <Icons.Bell />
        </Pressable>
        <Pressable
          onPress={() =>
            props.navigation.navigate('profile', { title: 'Profile' })
          }
          w={32}
          h={32}
          rounded="$full"
          justifyContent="center"
          alignItems="center"
          overflow="hidden">
          <Image
            width={32}
            height={32}
            resizeMode="cover"
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            }}
          />
        </Pressable>
      </HStack>
    </HStack>
  );
};

const FoodStack = (): React.JSX.Element => {
  const { colors } = useTheme();

  return (
    <Navigator initialRouteName="Food" screenOptions={screenOptions}>
      <Screen
        name="Food"
        options={{
          headerShown: true,
          header: AdvanceHeader,
        }}
        component={FoodScreen}
      />
      <Screen
        name="Popular"
        options={{
          headerShown: true,
          header: (props: any) => {
            const { popular } = props.route.params;
            return (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                px={16}
                bg={colors.white}
                h={45}
                borderBottomWidth={1}
                borderBottomColor={colors.gray1}>
                <HStack alignItems="center" gap={20}>
                  <Pressable onPress={() => props.navigation.goBack()}>
                    <Icon as={ArrowLeftIcon} color="$black" />
                  </Pressable>
                  <Text
                    textTransform="capitalize"
                    color="$black"
                    fontWeight="$bold"
                    fontSize={20}>
                    Popular {popular}{' '}
                  </Text>
                </HStack>
                <Pressable
                  onPress={() =>
                    props.navigation.navigate('Search', {
                      popular,
                    })
                  }>
                  <Icons.Search />
                </Pressable>
              </HStack>
            );
          },
        }}
        component={PopularScreen}
      />
      <Screen
        name="Search"
        options={{
          headerShown: false,
          header: (props: any) => {
            // const { popular } = props.route.params;
            return (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                px={16}
                bg={colors.white}
                h={45}
                borderBottomWidth={1}
                borderBottomColor={colors.gray1}>
                <HStack alignItems="center" gap={20}>
                  <Pressable onPress={() => props.navigation.goBack()}>
                    <Icon as={ArrowLeftIcon} color="$black" />
                  </Pressable>
                  <Input flex={1} borderWidth={0}>
                    <InputSlot pl="$3">
                      <InputIcon as={SearchIcon} color={colors.gray3} />
                    </InputSlot>
                    <InputField
                      placeholderTextColor={colors.placeholder}
                      fontSize={16}
                      fontWeight="$normal"
                      placeholder={`Search resturants...`}
                    />
                  </Input>
                </HStack>
              </HStack>
            );
          },
        }}
        component={Search}
      />
      <Screen
        name="Restaurant"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={RestaurantScreen}
      />
      <Screen
        name="Dish"
        options={{
          headerShown: false,
          header: CommonHeader,
        }}
        component={DishScreen}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="profile"
        component={ProfileScreen}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="editProfile"
        component={EditProfileScreen}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="addCard"
        component={AddCard}
      />
      <Screen
        name="Notifications"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={NotificationScreen}
      />
    </Navigator>
  );
};

const MarketStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Market" screenOptions={screenOptions}>
      <Screen name="Market" component={MarketScreen} />
    </Navigator>
  );
};

const OrderStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Orders" screenOptions={screenOptions}>
      <Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerShown: true,
          header: AdvanceHeader,
        }}
      />
      <Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="profile"
        component={ProfileScreen}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="editProfile"
        component={EditProfileScreen}
      />
      <Screen
        name="Notifications"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={NotificationScreen}
      />
    </Navigator>
  );
};

const CartStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Cart" screenOptions={screenOptions}>
      <Screen
        name="Cart"
        options={{
          headerShown: true,
          header: AdvanceHeader,
        }}
        component={CartScreen}
      />
      <Screen
        name="Checkout"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={CheckoutScreen}
      />
      <Screen
        name="Payment"
        options={{
          headerShown: false,
          header: CommonHeader,
        }}
        component={PaymentScreen}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="editProfile"
        component={EditProfileScreen}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="addCard"
        component={AddCard}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="profile"
        component={ProfileScreen}
      />
      <Screen
        name="Notifications"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={NotificationScreen}
      />
    </Navigator>
  );
};

const CommunityStack = (): React.JSX.Element => {
  return (
    <Navigator initialRouteName="Community" screenOptions={screenOptions}>
      <Screen
        name="Community"
        options={{
          headerShown: true,
          header: AdvanceHeader,
        }}
        component={CommunityScreen}
      /><Screen
        name="CreatePost"
        options={{
          headerShown: false,
          header: AdvanceHeader,
        }}
        component={CreatePost}
      />
      <Screen
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        name="profile"
        component={ProfileScreen}
      />
      <Screen
        name="Notifications"
        options={{
          headerShown: true,
          header: CommonHeader,
        }}
        component={NotificationScreen}
      />
    </Navigator>
  );
};

const TabNavUser = (): React.JSX.Element => {
  const { colors } = useTheme();
  const { cart } = useCart();

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ComingSoonModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Tab.Navigator
        initialRouteName={"Food"}
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
          name="Food"
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Food';
            const hiddenRoutes = ['Dish', 'Restaurant', 'Search'];

            return {
              tabBarIcon: (props: any) => (
                <Icons.Food
                  color={props.focused ? colors.primary : colors.gray3}
                />
              ),
              headerShown: false,
              tabBarStyle: {
                display: hiddenRoutes.includes(routeName) ? 'none' : 'flex',
                backgroundColor: colors.white,
              },
            };
          }}
          component={FoodStack}
        />
        <Tab.Screen
          name="Cart"
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Food';
            const hiddenRoutes = ['Checkout', 'Payment'];
            return {
              tabBarIcon: (props: any) => (
                <VStack>
                  {cart.length > 0 && (
                    <Badge
                      h={22}
                      w={22}
                      bg="$red600"
                      borderRadius="$full"
                      mb={-10}
                      mr={-10}
                      zIndex={1}
                      variant="solid"
                      alignSelf="flex-end">
                      <BadgeText color="$white" fontSize={12}>
                        {cart.length}
                      </BadgeText>
                    </Badge>
                  )}

                  <Icons.Cart
                    color={props.focused ? colors.primary : colors.gray3}
                  />
                </VStack>
              ),
              headerShown: false,
              tabBarStyle: {
                display: hiddenRoutes.includes(routeName) ? 'none' : 'flex',
                backgroundColor: colors.white,
              },
            };
          }}
          component={CartStack}
        />

        <Tab.Screen
          name="Post"
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Food';
            const hiddenRoutes = ['Checkout', 'Payment'];
            return {
              tabBarIcon: (props: any) => (
                <VStack
                  style={{
                    backgroundColor: colors.primary,
                    padding: 15,
                    top: -15,
                    borderRadius: 60,
                  }}>
                  <Icons.Plus
                    color={props.focused ? colors.primary : colors.gray3}
                  />
                </VStack>
              ),
              headerShown: false,
              tabBarStyle: {
                display: hiddenRoutes.includes(routeName) ? 'none' : 'flex',
                backgroundColor: colors.white,
              },
            };
          }}
          // component={() => console.log('in progress')}

          component={() => null} // no screen, we handle manually
          listeners={{
            tabPress: e => {
              e.preventDefault(); // prevent default navigation
              setModalVisible(true); // open modal instead
            },
          }}
        />

        <Tab.Screen
          name="Market"
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Food';
            const hiddenRoutes = ['Checkout', 'Payment'];
            return {
              tabBarIcon: (props: any) => (
                <VStack>
                  <Icons.Market
                    color={props.focused ? colors.primary : colors.gray3}
                  />
                </VStack>
              ),
              headerShown: false,
              tabBarStyle: {
                display: hiddenRoutes.includes(routeName) ? 'none' : 'flex',
                backgroundColor: colors.white,
              },
            };
          }}
          // component={MarketStack}
          component={() => null} // no screen, we handle manually
          listeners={{
            tabPress: e => {
              e.preventDefault(); // prevent default navigation
              setModalVisible(true); // open modal instead
            },
          }}
        />

        <Tab.Screen
          name="Community"
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Food';
            const hiddenRoutes = ['Checkout', 'Payment'];
            return {
              tabBarIcon: (props: any) => (
                <VStack>
                  <Icons.Community
                    color={props.focused ? colors.primary : colors.gray3}
                  />
                </VStack>
              ),
              headerShown: false,
              tabBarStyle: {
                display: hiddenRoutes.includes(routeName) ? 'none' : 'flex',
                backgroundColor: colors.white,
              },
            };
          }}
          component={CommunityStack}
        // component={() => null} // no screen, we handle manually
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault(); // prevent default navigation
        //     setModalVisible(true); // open modal instead
        //   },
        // }}
        />

        {/* <Tab.Screen
        name="Inbox"
        options={{
          tabBarIcon: (props: any) => (
            <Icons.Inbox
              color={props.focused ? colors.primary : colors.gray3}
            />
          ),
        }}
        component={MarketStack}
      /> */}
        {/* <Tab.Screen
        name="Orders"
        options={{
          tabBarIcon: (props: any) => (

            <MenuIcon size='xl' color={props.focused ? colors.primary : colors.gray3} />
          ),
        }}
        component={OrderStack}
      /> */}
      </Tab.Navigator>
    </>
  );
};

export default TabNavUser;

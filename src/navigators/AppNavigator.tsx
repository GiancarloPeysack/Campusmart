import React, { useEffect } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { navigationRef } from './Root';
import OnboardingScreen from '../screens/onboarding/Onboarding';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';

//restaurent
import RestLoginScreen from '../screens/restaurent/auth/LoginScreen';
import RestRegScreen from '../screens/restaurent/auth/RegisterScreen';
import RestVerifyScreen from '../screens/restaurent/auth/VerifyScreen';
import SuccessScreen from '../screens/restaurent/auth/SuccessScreen';

//driver
import DriverLoginScreen from '../screens/driver/auth/LoginScreen';
import DriverRegScreen from '../screens/driver/auth/RegisterScreen';
import Onboarding from '../screens/driver/Onboarding';

import {
  ArrowLeftIcon,
  Box,
  ChevronLeftIcon,
  HStack,
  Icon,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { useTheme } from '../theme/useTheme';
import TabNavUser from './TabNavUser';
import SetupRestScreen from '../screens/restaurent/setup-wizard/restaurent/SetupScreen';
import SetupMenuScreen from '../screens/restaurent/setup-wizard/menu/SetupScreen';
import CreateCategory from '../components/ui/Restaurant/CreateCategory';
import CreateMenu from '../components/ui/Restaurant/CreateMenu';
import useAuth from '../hooks/useAuth';
import Startup from '../screens/Startup';
import TabNavRest from './TabNavRest';
import useDriver from '../screens/driver/hooks/useDriver';
import TabNavDriver from './TabNavDriver';
import RegisterSuccess from '../screens/auth/RegisterSuccess';
import { EditOnboard } from '../screens/dashboard/EditOnboard/EditOnboard';
import DriverVerifyScreen from '../screens/driver/auth/DriverVerifyScreen';
import I18n, { loadAppLanguage } from '../localization/i18n';

//screens

const { Screen, Navigator } = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: '#FFFFFF' },
};

const Header = (props: any) => {
  const { colors } = useTheme();
  const { title } = props?.route?.params;

  return (
    <HStack
      alignItems="center"
      px={16}
      bg={colors.white}
      h={50}
      borderBottomWidth={1}
      borderBottomColor={colors.gray1}
      justifyContent="center">
      <Text
        textTransform="capitalize"
        color="$black"
        fontWeight="$bold"
        fontSize={20}>
        {title}
      </Text>
    </HStack>
  );
};

const SubHeader = (props: any) => {
  const { colors } = useTheme();
  const { title } = props.route.params;

  return (
    <HStack
      alignItems="center"
      px={16}
      bg={colors.white}
      h={50}
      borderBottomWidth={1}
      gap={16}
      borderBottomColor={colors.gray1}>
      <Pressable onPress={() => props.navigation.goBack()}>
        <Icon as={ArrowLeftIcon} size="md" color="$black" />
      </Pressable>
      <Text
        textTransform="capitalize"
        color="$black"
        fontWeight="$bold"
        fontSize={20}>
        {title}
      </Text>
    </HStack>
  );
};

const header = (props: any) => {
  const { colors } = useTheme();

  return (
    <Box px={10} bg={colors.background}>
      <Pressable onPress={() => props.navigation.goBack()}>
        <Icon as={ChevronLeftIcon} color="$black" size="xl" />
      </Pressable>
    </Box>
  );
};

const RestaurentStack = (): React.JSX.Element => {
  const { isRegistrationCompleted } = useAuth();

  const isFocused = useIsFocused();


  useEffect(() => {
    const initLang = async () => {
      await loadAppLanguage();
    };

    initLang();
  }, [isFocused]);

  if (isRegistrationCompleted) {
    return (
      <Navigator initialRouteName="home" screenOptions={screenOptions}>

        <Screen name="home" component={TabNavRest} />
      </Navigator>
    );
  } else {
    return (
      <Navigator initialRouteName="setupRest" screenOptions={screenOptions}>
        <Screen
          name="setupRest"
          initialParams={{ title: 'Restaurant Setup' }}
          options={{
            headerShown: true,
            header: Header,
          }}
          component={SetupRestScreen}
        />
        <Screen
          name="setupMenu"
          options={{
            headerShown: true,
            header: Header,
          }}
          component={SetupMenuScreen}
        />
        <Screen
          name="createCategory"
          options={{
            headerShown: true,
            header: SubHeader,
          }}
          component={CreateCategory}
        />
        <Screen
          name="createMenu"
          options={{
            headerShown: true,
            header: SubHeader,
          }}
          component={CreateMenu}
        />
        <Screen name="success" component={SuccessScreen} />
        <Screen name="home" component={TabNavRest} />
      </Navigator>
    );
  }
};

const DriverStack = (): React.JSX.Element => {
  const { driver } = useDriver();

  if (driver?.isRegistrationCompleted) {
    return (
      <Navigator initialRouteName="home" screenOptions={screenOptions}>
        <Screen name="home" component={TabNavDriver} />
      </Navigator>
    );
  } else {
    return (
      <Navigator initialRouteName="onboarding" screenOptions={screenOptions}>
        <Screen name="onboarding" component={Onboarding} />

        <Screen name="home" component={TabNavDriver} />
      </Navigator>
    );
  }
};

function AppNavigator(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const { user, userRole } = useAuth();




  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (user) {
    if (userRole === 'public_user') {
      return (
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
            networkActivityIndicatorVisible={true}
          />
          <TabNavUser />
        </NavigationContainer>
      );
    } else if (userRole === 'restaurent') {
      return (
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
            networkActivityIndicatorVisible={true}
          />

          <RestaurentStack />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
            networkActivityIndicatorVisible={true}
          />
          <DriverStack />
        </NavigationContainer>
      );
    }
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
          networkActivityIndicatorVisible={true}
        />
        <Navigator initialRouteName="onboarding" screenOptions={screenOptions}>
          <Screen name="startup" component={Startup} />
          <Screen name="onboarding" component={OnboardingScreen} />
          <Screen name="login" component={LoginScreen} />
          <Screen
            options={{
              headerShown: false,
              header: header,
            }}
            name="register"
            component={RegisterScreen}
          />
          <Screen
            options={{
              headerShown: false,
              header: header,
            }}
            name="verify"
            component={VerifyScreen}
          />
          <Screen
            options={{
              headerShown: false,
              header: header,
            }}
            name="dverify"
            component={DriverVerifyScreen}
          />
          <Screen name="successUser" component={RegisterSuccess} />
          <Screen name="restLogin" component={RestLoginScreen} />
          <Screen name="restReg" component={RestRegScreen} />
          <Screen name="driverLogin" component={DriverLoginScreen} />
          <Screen name="driverRegister" component={DriverRegScreen} />
          <Screen
            name="OnboardProfileEdit"
            options={{
              headerShown: false,

            }}
            component={EditOnboard}
          />
        </Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;

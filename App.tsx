/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './gesture-handler';
// import './src/localization/i18n';
import I18n, { loadAppLanguage, changeAppLanguage } from './src/localization/i18n';

import React, { useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme, View, Text } from 'react-native';
import { Button, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useTheme } from './src/theme/useTheme';
import Toast from 'react-native-toast-message';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigators/AppNavigator';
import { CartProvider } from './src/context/cart';

import { StripeProvider } from '@stripe/stripe-react-native';
import { useIsFocused } from '@react-navigation/native';

function App(): React.JSX.Element {
  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.background,
    flex: 1,
  };



  return (
    <GluestackUIProvider config={config}>
      <StripeProvider publishableKey='pk_test_51RVduaRihkI6uvhW0cy3zM9VATSyyCXjiQQnuxmg09plMSZ59CGDYqKE5997wkBdf0zj1z5MISDbmsjX2UKLcr1j00H437c65i' urlScheme='Campusmart'>
        <CartProvider>
          <SafeAreaView style={backgroundStyle}>

            <AppNavigator />
          </SafeAreaView>
        </CartProvider>
      </StripeProvider>
      <Toast />
    </GluestackUIProvider>
  );
}

export default App;

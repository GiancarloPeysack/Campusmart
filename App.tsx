/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './gesture-handler';

import React from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {useTheme} from './src/theme/useTheme';
import Toast from 'react-native-toast-message';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigators/AppNavigator';
import {CartProvider} from './src/context/cart';

import { StripeProvider } from '@stripe/stripe-react-native';

function App(): React.JSX.Element {
  const {colors} = useTheme();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.background,
    flex: 1,
  };

  return (
    <GluestackUIProvider config={config}>
      <StripeProvider publishableKey='pk_test_51R8YsLDXGN1IpE4cXmj6mEkIz9Is8gQVN04xfFyC4Jc2zfk0H2LQFzQtljkR1DNeUcXaJARBbjRxNcr5m5dvoKtl00IutWS6DQ' urlScheme='Campusmart'>
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

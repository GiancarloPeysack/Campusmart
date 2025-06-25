import {
  Box,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
  Link,
} from '@gluestack-ui/themed';
import React from 'react';
import { useTheme } from '../../theme/useTheme';
import { Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '../../navigators/Root';

export default function OnboardingScreen(): React.JSX.Element {
  const { colors, styles } = useTheme();

  return (
    <ImageBackground source={require('../../assets/images/gradientbck.png')} style={{ flex: 1 }}>
      <Box flex={1} px={16} justifyContent="space-between" py={40}>

        <Center mt={30}>
          <Image
            source={require('../../assets/images/logo-insta.png')}
            resizeMode="contain"
            style={{ width: 180, height: 180, marginBottom: 24 }}
          />
          <Text fontSize={16} color={colors.gray5} mb={12}>
            Your Campus Marketplace
          </Text>
          <Text fontSize={24} fontWeight="700" color={colors.title_1} mb={12} mt={12} textAlign="center">
            Welcome to the future of{'\n'}campus commerce
          </Text>
          <Text fontSize={14} color={colors.gray5} mt={12} textAlign="center">
            Connect, trade, and buy food
          </Text>
        </Center>

        <VStack mt={32} space={16}>

          <Pressable
            onPress={() => navigate('login')}
            $active-opacity={0.8}
            overflow="hidden"
            rounded={12}
            mb={12}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.primary, colors.primary]}
              style={{ width: '100%', height: 56, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text fontSize={16} fontWeight="700" color={colors.white}>
                Sign in with University Email
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => navigate('register')}
            borderWidth={1}
            borderColor={colors.primary}
            borderRadius={12}
            h={56}
            backgroundColor='#fff'
            justifyContent="center"
            alignItems="center"
            $active-opacity={0.8}
            mb={12}
          >
            <Text fontSize={16} fontWeight="700" color={colors.primary}>
              Create Account
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigate('restLogin')}
            $active-opacity={0.7}
            alignItems="center"
            mt={12}
          >
            <Text fontSize={14} color={colors.title_1} textDecorationLine="underline">
              I'm a restaurant or business
            </Text>
          </Pressable>

        </VStack>

        <Center mt={32}>
          <Text fontSize={12} color={colors.gray5}>
            By continuing, you agree to our{' '}
          </Text>

          <Text fontSize={12} color={colors.gray5}>
            <Text fontSize={12} color={colors.primary} fontWeight="600">Terms of Service </Text> &
            <Text fontSize={12} color={colors.primary} fontWeight="600"> Privacy Policy</Text></Text>
        </Center>

      </Box>
    </ImageBackground>
  );
}

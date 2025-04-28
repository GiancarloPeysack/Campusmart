import {
  Box,
  Center,
  ClockIcon,
  HelpCircleIcon,
  HStack,
  Icon,
  MailIcon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {OtpInput} from 'react-native-otp-entry';
import React, {useState} from 'react';

import {useTheme} from '../../../theme/useTheme';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate} from '../../../navigators/Root';
import {CustomButton, PrimaryButton} from '../../../components';
import {Icons} from '../../../assets/icons';

export default function VerifyScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Box p={16}>
            <Center gap={6}>
              <Icons.Logo />

              <Text color="$black" fontSize={20} fontWeight={'$bold'}>
                Verify Your Email
              </Text>
              <Text
                mt={9}
                fontSize={14}
                fontWeight="$light"
                color={colors.title}>
                We've sent a verification code to your email address
              </Text>
            </Center>

            <VStack gap={24} mt={40}>
              <HStack
                alignItems="center"
                bg={colors.light_blue}
                h={56}
                w="$full"
                justifyContent="center"
                gap={5}
                rounded={12}>
                <Icon as={MailIcon} width={14} color={colors.blue} />
                <Text fontSize={14} fontWeight="$medium" color={colors.primary}>
                  yourname@constructor.university
                </Text>
              </HStack>
              <OtpInput
                numberOfDigits={4}
                type="numeric"
                focusColor={colors.primary}
                theme={{
                  containerStyle: {paddingHorizontal: 20},
                  pinCodeContainerStyle: {
                    width: 56,
                    height: 56,
                    borderColor: '#E5E5E5',
                    backgroundColor: colors.white,
                  },
                }}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
              />
              <PrimaryButton
                text="Verify Email"
                onPress={() => navigate('success')}
              />

              <Center gap={10}>
                <HStack gap={5} alignItems="center">
                  <Text fontSize={14} color={colors.title}>
                    Code expires in
                  </Text>
                  <Text
                    fontWeight="$medium"
                    fontSize={14}
                    color={colors.primary}>
                    04:59
                  </Text>
                </HStack>
                <Center>
                  <HStack gap={5} alignItems="center">
                    <Icons.Resend />
                    <Text
                      fontWeight="$medium"
                      fontSize={14}
                      color={colors.primary}>
                      Resend Code
                    </Text>
                  </HStack>
                </Center>
              </Center>
            </VStack>
          </Box>
        </ScrollView>
        <Center>
          <HStack gap={5}>
            <Text color={colors.title} fontSize={14} fontWeight="$light">
              Need help?
            </Text>
            <Pressable onPress={() => navigate('register')}>
              <Text fontSize={14} fontWeight="$light" color={colors.primary}>
                Contact Support
              </Text>
            </Pressable>
          </HStack>
        </Center>
      </Box>
    </KeyboardAvoidingView>
  );
}

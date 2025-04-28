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

import {useTheme} from '../../theme/useTheme';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate} from '../../navigators/Root';
import {CustomButton} from '../../components';

export default function VerifyScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background} p={24}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Center>
            <HStack alignItems="center" gap={2}>
              <Icon as={MailIcon} color={colors.secondary} w={20} />
              <Text color="$black" fontSize={20} fontWeight={'$bold'}>
                Check your email
              </Text>
            </HStack>
            <Text mt={9} fontSize={14} fontWeight="$light" color={colors.gray}>
              We've sent a verification code to
            </Text>
            <Text mt={2} fontSize={12} color={colors.secondary}>
              yourname@constructor.university
            </Text>
          </Center>
          <VStack gap={24} mt={40}>
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
            <CustomButton
              text="Verify"
              icon={<Icon as={HelpCircleIcon} w={16} color={colors.white} />}
              onPress={() => {}}
            />
            <VStack gap={10}>
              <Text
                textAlign="center"
                mt={9}
                fontSize={14}
                fontWeight="$light"
                color={colors.gray}>
                Didn't receive the code?
              </Text>
              <Center>
                <HStack gap={5} alignItems="center">
                  <Text textAlign="center" fontSize={14} color={colors.green}>
                    Resend code
                  </Text>
                  <Text textAlign="center" fontSize={14} color={colors.gray}>
                    in
                  </Text>
                  <Icon as={ClockIcon} color={colors.green} />
                  <Text textAlign="center" fontSize={14} color={colors.green}>
                    59s
                  </Text>
                </HStack>
              </Center>
            </VStack>
          </VStack>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}

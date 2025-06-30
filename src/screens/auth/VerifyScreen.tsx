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
import { OtpInput } from 'react-native-otp-entry';
import React, { useState, useEffect, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useTheme } from '../../theme/useTheme';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { navigate } from '../../navigators/Root';
import { CustomButton } from '../../components';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default function VerifyScreen(): React.JSX.Element {
  const { colors, styles } = useTheme();

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const [isResending, setIsResending] = useState(false);
  const currentUser = auth().currentUser;

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    setTimer(60);
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      startTimer();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Verification code resent',
      });
    }, 1000);
  };

  const handleVerify = async () => {
    if (code.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid',
        text2: 'Please enter a 4-digit code.'
      });
      return;
    }
    if (code === '1234') {
      await firestore().collection('users').doc(currentUser?.uid).update({
        isVerified: true,
        hasOnboarded: false
      });
      setTimeout(() => {
        navigate('successUser');

      }, 500);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid verification code'
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.lightGrey} p={20}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Center gap={6} mt={40}>
            <HStack gap={10} alignItems="center">
              <View
                style={{
                  backgroundColor: colors.secondary,
                  width: 50,
                  height: 10,
                  borderRadius: 20,
                }}></View>
              <View
                style={{
                  backgroundColor: colors.grey100,
                  width: 10,
                  height: 10,
                  borderRadius: 20,
                }}></View>
              <Text fontSize={12} color={colors.secondary}>
                Step 2 of 3
              </Text>
            </HStack>
          </Center>

          <Center mt={26}>
            <HStack alignItems="center" gap={2}>
              <Icon as={MailIcon} color={colors.secondary} w={20} />
              <Text color="$black" fontSize={20} fontWeight={'$bold'}>
                Check your email
              </Text>
            </HStack>
            <Text mt={12} fontSize={13} fontWeight="$light" color={colors.gray}>
              We've sent a verification code to
            </Text>
            <Text mt={3} fontSize={13} color={colors.secondary}>
              yourname@constructor.university
            </Text>
          </Center>

          <VStack gap={24} mt={40}>
            <OtpInput
              numberOfDigits={4}
              type="numeric"
              focusColor={colors.primary}
              onTextChange={val => setCode(val)}
              theme={{
                containerStyle: { paddingHorizontal: 20 },
                pinCodeContainerStyle: {
                  width: 56,
                  height: 56,
                  borderColor: '#E5E5E5',
                  backgroundColor: colors.white,
                },
              }}
              textInputProps={{ accessibilityLabel: 'One-Time Password' }}
            />

            <CustomButton
              text="Verify"
              icon={<Icon as={HelpCircleIcon} w={16} color={colors.white} />}
              onPress={handleVerify}
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
                  <Pressable disabled={timer > 0} onPress={handleResend}>
                    <Text
                      textAlign="center"
                      fontSize={14}
                      color={timer === 0 ? colors.green : colors.gray}>
                      {isResending ? 'Sending...' : 'Resend code'}
                    </Text>
                  </Pressable>
                  <Text textAlign="center" fontSize={14} color={colors.gray}>
                    in
                  </Text>
                  <Icon as={ClockIcon} color={colors.green} />
                  <Text textAlign="center" fontSize={14} color={colors.green}>
                    {timer}s
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

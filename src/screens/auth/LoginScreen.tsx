import {
  ArrowRightIcon,
  Box,
  Center,
  ChevronRightIcon,
  Divider,
  EyeIcon,
  HStack,
  Icon,
  EyeOffIcon,
  MailIcon,
  Pressable,
  Text,
  VStack,
  ArrowLeftIcon,
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/useTheme';
import { Icons } from '../../assets/icons';
import { AuthButton, CustomButton, InputFiled } from '../../components';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { navigate } from '../../navigators/Root';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLoading } from '../../hooks/useLoading';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { handleFirebaseError } from '../../utils/helper/error-handler';
import { email_regex } from '../../constant';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

type FormData = {
  email: string;
  password: string;
};


const validation = yup.object({
  email: yup
    .string()
    .email()
    .matches(email_regex, 'Only @constructor.university domain allowed')
    .required('Email is required'),
  password: yup.string().required(),
});
const widthPx = Dimensions.get('window').width

export default function LoginScreen(): React.JSX.Element {
  const { colors, styles } = useTheme();
  const { isLoading, onLoad, onLoaded } = useLoading();
  const [passState, setPassState] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    onLoad();

    try {
      const { email, password } = data;

      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      const userDocRef = firestore().collection('users').doc(uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        if (userData?.accountStatus === 'deleted') {
          await auth().signOut();
          Toast.show({
            type: 'error',
            text1: 'Account Deleted',
            text2: 'This account has been deleted.',
          });
          return;
        }

        if (!userData?.hasOnboarded) {
          await userDocRef.update({ hasOnboarded: true });
        }

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User successfully logged in.',
        });

        // Optional: reset form
        reset();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed!',
          text2: 'User does not exists',
        });
      }

    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      onLoaded();
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.lightGrey}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box flexDirection="row" alignItems="center" mt={20} ml={20}>
            <Pressable onPress={() => navigate('onboarding')}>
              <Icon
                as={ArrowLeftIcon}
                color={colors.title}
                style={{ width: 22, height: 22 }}
              />
            </Pressable>
          </Box>
          <VStack gap={40} p={24}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.gradientLight, colors.gradientLight2]}
              style={{
                width: widthPx / 1.25,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20
              }}><Center gap={6} alignSelf='center' width={widthPx / 1.25} padding={8}>
                <Text fontSize={14} color={colors.secondary}>
                  Exclusively for Constructor University students
                </Text>
              </Center></LinearGradient>


            <Center gap={6}>
              <Text fontWeight="$bold" fontSize={24} color="$black">
                Hey! Welcome back
              </Text>
            </Center>
            {/* <VStack gap={16}>
              {/* <AuthButton
                text="Continue with Google"
                icon={<Icons.Google />}
                onClick={() => { }}
              /> 
              <AuthButton
                text="Continue with Outlook"
                icon={<Icons.Outlook />}
                onClick={() => { }}
              />
            </VStack> */}
            {/* <HStack
              space="sm"
              mt="$3"
              alignItems="center"
              justifyContent="center"
              overflow="hidden">
              <Divider bg={colors.gray1} />
              <Text
                fontSize={14}
                fontFamily="Onest-SemiBold"
                color={colors.gray2}>
                or
              </Text>
              <Divider bg={colors.gray1} />
            </HStack> */}
            <VStack gap={10}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue=""
                    icon={<Icon as={MailIcon} color="#A3A3A3" />}
                    type="text"
                    label="Email"
                    placeholder="yourname@constructor.university"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.email ? true : false}
                    error={errors.email?.message}
                  />
                )}
                name="email"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue=""
                    icon={
                      <Icon
                        as={passState ? EyeIcon : EyeOffIcon}
                        color="#A3A3A3"
                      />
                    }
                    type={passState ? 'password' : 'text'}
                    label="Password"
                    placeholder="Create a strong password"
                    onPressIcon={() => setPassState(!passState)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.password ? true : false}
                    error={errors.password?.message}
                  />
                )}
                name="password"
              />
            </VStack>
            <CustomButton
              text="Let's Go!"
              icon={<Icon as={ArrowRightIcon} color={colors.white} />}
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
            <Center gap={30}>
              <Pressable>
                <Text fontWeight="$medium" color={colors.textBlue}>
                  Forgot Password?
                </Text>
              </Pressable>
              <VStack gap={5} justifyContent='center' alignItems='center'>
                <Text>New to CampusMart?</Text>
                <Pressable onPress={() => navigate('register')}>
                  <Text fontWeight="$medium" color={colors.primary}>
                    Join Now
                  </Text>
                </Pressable>
              </VStack>
            </Center>
          </VStack>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}

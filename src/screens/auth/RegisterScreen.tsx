import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Box,
  Center,
  Divider,
  EyeIcon,
  EyeOffIcon,
  HStack,
  Icon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';

import { useTheme } from '../../theme/useTheme';
import { Icons } from '../../assets/icons';
import { AuthButton, CustomButton, InputFiled } from '../../components';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLoading } from '../../hooks/useLoading';
import auth from '@react-native-firebase/auth';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { handleFirebaseError } from '../../utils/helper/error-handler';

import { email_regex } from '../../constant';
import { navigate } from '../../navigators/Root';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const validation = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .matches(email_regex, 'Only @constructor.university domain allowed')
    .required('Email is required'),
  phoneNumber: yup.string().required(),
  password: yup.string().required(),
});

export default function RegisterScreen(): React.JSX.Element {
  const { colors, styles } = useTheme();
  const { isLoading, onLoad, onLoaded } = useLoading();



  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validation),
  });

  const [passState, setPassState] = useState(true);

  const onSubmit = async (data: FormData) => {
    onLoad();
    try {
      const { email, password } = data;

      const register = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = register.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          email: email,
          phoneNumber: data.phoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'public_user',
          profilePicture:
            'https://firebasestorage.googleapis.com/v0/b/campusmart-4a549.firebasestorage.app/o/blank-profile-picture-973460_1280.jpg?alt=media&token=2f42ae07-f42a-428c-9137-5fb35a304a0d',
          whatsapp: '',
          createdAt: serverTimestamp(),
          isVerified: false
        })
        .then(() => {
          reset();
          navigate('verify');
          Toast.show({
            type: 'success',
            text1: 'User registered.',
            text2: 'User successfully registered.',
          });
        });
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
          <VStack gap={22} p={24}>
            <Center gap={6}>
              <Text fontWeight="$bold" fontSize={24} color="$black">
                Create Account
              </Text>
              <Center gap={6}>
                <HStack gap={10} alignItems="center">
                  <View style={{ backgroundColor: colors.secondary, width: 25, height: 10, borderRadius: 20 }}></View>
                  <View style={{ backgroundColor: colors.grey100, width: 10, height: 10, borderRadius: 20 }}></View>
                  <View style={{ backgroundColor: colors.grey100, width: 10, height: 10, borderRadius: 20 }}></View>
                  <Text fontSize={12} color={colors.secondary}>
                    Step 1 of 3
                  </Text>
                </HStack>
              </Center>
              <Text fontSize={16} mt={8} color={colors.gray}>
                Join the student marketplace today
              </Text>
              <Text fontSize={12} color={colors.green}>
                Over 5,000 students are already here!
              </Text>
            </Center>
            {/* <VStack gap={16}>
              <AuthButton
                text="Sign up with Outlook"
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
              <HStack gap={12}>
                <Controller
                  control={control}
                  rules={{
                    required: 'Firstname required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputFiled
                      isRequired={true}
                      defaultValue=""
                      rightIcon={<Icons.Person />}
                      type="text"
                      label="First Name"
                      placeholder="John"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isInvalid={errors.firstName ? true : false}
                      error={errors.firstName?.message}
                    />
                  )}
                  name="firstName"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputFiled
                      isRequired={true}
                      defaultValue=""
                      rightIcon={<Icons.Person />}
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isInvalid={errors.lastName ? true : false}
                      error={errors.lastName?.message}
                    />
                  )}
                  name="lastName"
                />
              </HStack>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue=""
                    rightIcon={<Icon as={MailIcon} color="#A3A3A3" />}
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
                    rightIcon={<Icon as={PhoneIcon} color="#A3A3A3" />}
                    type="text"
                    label="Phone Number"
                    placeholder="+49 123 456 7890"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.phoneNumber ? true : false}
                    error={errors.phoneNumber?.message}
                  />
                )}
                name="phoneNumber"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue=""
                    rightIcon={<Icon as={LockIcon} color="#A3A3A3" />}
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
              text="Create Account"
              icon={<Icon as={ArrowRightIcon} color={colors.white} />}
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
            <Center gap={10}>
              <Text fontSize={12} color={colors.gray3}>
                By signing up, you agree to our{' '}
                <Text fontSize={12} underline color={colors.gray5}>
                  Terms
                </Text>{' '}
                and{' '}
                <Text fontSize={12} underline color={colors.gray5}>
                  Privacy Policy
                </Text>
              </Text>
            </Center>
          </VStack>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}

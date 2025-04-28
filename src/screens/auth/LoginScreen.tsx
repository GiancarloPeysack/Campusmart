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
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {useTheme} from '../../theme/useTheme';
import {Icons} from '../../assets/icons';
import {AuthButton, CustomButton, InputFiled} from '../../components';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate} from '../../navigators/Root';

import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {useLoading} from '../../hooks/useLoading';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {handleFirebaseError} from '../../utils/helper/error-handler';
import { email_regex } from '../../constant';

type FormData = {
  email: string;
  password: string;
};

const validation = yup.object({
  email: yup.string().email()
  .matches(email_regex, 'Only @constructor.university domain allowed')
  .required('Email is required'),
  password: yup.string().required(),
});

export default function LoginScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();
  const {isLoading, onLoad, onLoaded} = useLoading();
  const [passState, setPassState] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    onLoad();
    try{
      const { email, password } = data;

       await auth().signInWithEmailAndPassword(
        email,
        password,
      ).then(()=>{
        reset();
        Toast.show({
          type: 'success',
          text1: 'User logged.',
          text2: 'User successfully logged in.',
        });
      })
    } catch(error){
      const errorMessage = handleFirebaseError(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally{
      onLoaded();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <VStack gap={40} p={24}>
            <Center gap={6}>
              <Text fontWeight="$bold" fontSize={24} color="$black">
                Hey there! 👋
              </Text>
              <Text fontSize={16} color={colors.gray}>
                Welcome back to your student marketplace
              </Text>
              <Text fontSize={12} color={colors.secondary}>
                Exclusively for Constructor University students
              </Text>
            </Center>
            {/* <VStack gap={16}>
              <AuthButton
                text="Continue with Google"
                icon={<Icons.Google />}
                onClick={() => {}}
              />
              <AuthButton
                text="Continue with Outlook"
                icon={<Icons.Outlook />}
                onClick={() => {}}
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
                OR
              </Text>
              <Divider bg={colors.gray1} />
            </HStack> */}
            <VStack gap={10}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
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
                render={({field: {onChange, onBlur, value}}) => (
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
            <Center gap={10}>
              <Pressable>
                <Text fontWeight="$medium" color={colors.secondary}>
                  Forgot Password?
                </Text>
              </Pressable>
              <HStack gap={5}>
                <Text>New to UniMark?</Text>
                <Pressable onPress={() => navigate('register')}>
                  <Text fontWeight="$medium" color={colors.primary}>
                    Join
                  </Text>
                </Pressable>
              </HStack>
            </Center>
          </VStack>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}

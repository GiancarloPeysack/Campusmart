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
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  Link,
  ArrowLeftIcon,
} from '@gluestack-ui/themed';
import React, { ReactNode, useState } from 'react';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { InputFiled, PrimaryButton } from '../../../components';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { navigate } from '../../../navigators/Root';

import { useLoading } from '../../../hooks/useLoading';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { handleFirebaseError } from '../../../utils/helper/error-handler';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import I18n from '../../../localization/i18n';

interface Props {
  text: string;
  onPress: () => void;
  isActive: boolean;
}

const IconButton: React.FC<Props> = props => {
  const { colors } = useTheme();

  const border = props.isActive ? colors.primary : colors.gray1;
  const color = props.isActive ? colors.primary : colors.gray3;

  return (
    <Pressable
      onPress={props.onPress}
      borderWidth={1}
      borderColor={border}
      h={80}
      w={Dimensions.get('window').width / 2.25}
      rounded={12}
      justifyContent="center"
      px={10}
      bg={colors.white}>
      <VStack gap={4}>
        {props.text === 'Restaurant Admin' ? (
          <Icons.User color={color} />
        ) : (
          <Icons.Bike color={color} />
        )}
        <Text fontWeight="$normal" color={color}>
          {props.text}
        </Text>
      </VStack>
    </Pressable>
  );
};

type FormData = {
  email: string;
  password: string;
};

const validation = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required(),
});

export default function LoginScreen(props): React.JSX.Element {
  const { colors, styles } = useTheme();
  const [passState, setPassState] = useState(true);

  const { isLoading, onLoad, onLoaded } = useLoading();

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


      reset();

      setTimeout(async () => {
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

          if (!userData?.isVerified) {
            navigate('dverify');
          }

        }

        Toast.show({
          type: 'success',
          text1: 'User logged.',
          text2: 'User successfully logged in.',
        });
      }, 500);
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
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <VStack gap={30} p={16}>

            <Pressable onPress={() => props.navigation.navigate('onboarding')}>
              <Icon as={ArrowLeftIcon} /></Pressable>
            <Center gap={6}>
              <Icons.Logo />
              <Text fontWeight="$bold" fontSize={24} color="$black">
                {I18n.t('Login_Deliver_Staff')}
              </Text>
            </Center>

            <HStack justifyContent="space-between">
              <IconButton
                text={I18n.t('Restaurant_Admin')}
                onPress={() => navigate('restLogin')}
                isActive={false}
              />
              <IconButton
                text={I18n.t('Delivery_Staff')}
                onPress={() => { }}
                isActive={true}
              />
            </HStack>
            <VStack gap={20}>
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
                    placeholder="driver@email.com"
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
                    rightIcon={<Icons.CircleQuetion />}
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

              <HStack justifyContent="space-between">
                <Checkbox
                  value=""
                  size="md"
                  isInvalid={false}
                  isDisabled={false}>
                  <CheckboxIndicator
                    borderColor="$black"
                    borderWidth={0.5}
                    rounded={1}
                    bgColor="$white"
                    $checked-bgColor={colors.primary}>
                    <CheckIcon as={CheckIcon} color="$white" />
                  </CheckboxIndicator>
                  <CheckboxLabel
                    fontSize={14}
                    ml={5}
                    color={colors.title}
                    fontWeight="$light">
                    {I18n.t('Remember_Me')}
                  </CheckboxLabel>
                </Checkbox>
                <Link>
                  <Text
                    color={colors.primary}
                    fontSize={14}
                    fontWeight="$light">
                    {I18n.t('Forgot_Password')}
                  </Text>
                </Link>
              </HStack>
            </VStack>
            <PrimaryButton
              text={I18n.t('Sign_In')}
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
            <Center gap={10}>
              <HStack gap={5}>
                <Text color={colors.title} fontSize={14} fontWeight="$light">
                  {I18n.t('New_Res_Partner')}
                </Text>
                <Pressable onPress={() => navigate('driverRegister')}>
                  <Text
                    fontWeight="$light"
                    fontSize={14}
                    color={colors.primary}>
                    {I18n.t('Reg_Here')}
                  </Text>
                </Pressable>
              </HStack>
              <HStack gap={5}>
                <Text color={colors.title} fontSize={14} fontWeight="$light">

                  {I18n.t('New_Help')}
                </Text>
                <Pressable onPress={() => navigate('register')}>
                  <Text
                    fontSize={14}
                    fontWeight="$light"
                    color={colors.primary}>
                    {I18n.t('Contact_Support')}
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

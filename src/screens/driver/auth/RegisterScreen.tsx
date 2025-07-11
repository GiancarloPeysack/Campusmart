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
} from '@gluestack-ui/themed';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { InputFiled, PrimaryButton, Selector } from '../../../components';

import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { navigate } from '../../../navigators/Root';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoading } from '../../../hooks/useLoading';
import auth from '@react-native-firebase/auth';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { handleFirebaseError } from '../../../utils/helper/error-handler';
import useRestaurent from '../../../hooks/useRestaurent';

interface Props {
  text: string;
  onPress: () => void;
  isActive: boolean;
}

type FormData = {
  restaurentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const validation = yup.object({
  restaurentId: yup.string().required(),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .test('password-match', 'password must match', function (value) {
      return this.parent.password === value;
    }),
});

export default function RegisterScreen(): React.JSX.Element {
  const { colors, styles } = useTheme();
  const [passState, setPassState] = useState(true);

  const { restaurents, fetchAllRestaurents, isLoading: isLoadingRest } = useRestaurent()

  const { isLoading, onLoad, onLoaded } = useLoading();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validation),
  });


  useEffect(() => {
    fetchAllRestaurents();
  }, []);


  const rests = useMemo(
    () =>
      Array.isArray(restaurents)
        ? restaurents.map((item: any) => ({
          label: item.nameOfRestaurent,
          value: item.id,
        }))
        : [],
    [restaurents]
  );

  const onSubmit = async (data: FormData) => {
    onLoad();
    try {
      const { email, password } = data;

      const register = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = register.user;

      await firestore().collection('users').doc(user.uid).set({
        firstName: data.fullName,
        phoneNumber: data.phoneNumber,
        lastName: '',
        email: data.email,
        role: 'driver',
        whatsapp: '',
        profilePicture:
          'https://firebasestorage.googleapis.com/v0/b/campusmart-4a549.firebasestorage.app/o/blank-profile-picture-973460_1280.jpg?alt=media&token=2f42ae07-f42a-428c-9137-5fb35a304a0d',
        createdAt: serverTimestamp(),
      });

      await firestore().collection('drivers').doc(user.uid).set({
        restaurentId: data.restaurentId,
        isAvailable: false,
        isRegistrationCompleted: false,
        createdAt: serverTimestamp(),
        isVerified: false
      });

      reset();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Driver registered successfully',
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
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <VStack gap={30} p={16}>
            <Center gap={6}>
              <Icons.Logo />
              <Text fontWeight="$bold" fontSize={24} color="$black">
                Create Account
              </Text>
              <Text fontSize={16} color={colors.gray} fontWeight="$light">
                Join our delivery team
              </Text>
            </Center>

            <HStack justifyContent="space-between">
              <IconButton
                text="Restaurant Admin"
                onPress={() => navigate('restReg')}
                isActive={false}
              />
              <IconButton
                text="Delivery Staff"
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
                  <Selector
                    data={rests}
                    placeholder="Select your restaurant"
                    isRequired
                    label="Select Restaurant"
                    onBlur={onBlur}
                    onValueChange={onChange}
                    isInvalid={errors.restaurentId ? true : false}
                    error={errors.restaurentId?.message}
                  />
                )}
                name="restaurentId"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue=""
                    rightIcon={<Icons.Call />}
                    type="text"
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
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
                    rightIcon={<Icons.Uprof />}
                    type="text"
                    label="Full Name"
                    placeholder="Your full name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.fullName ? true : false}
                    error={errors.fullName?.message}
                  />
                )}
                name="fullName"
              />
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
                    label="Emaill address"
                    placeholder="jhone@email.com"
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
                    placeholder="••••••••"
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
                    label="Confirm Password"
                    placeholder="••••••••"
                    onPressIcon={() => setPassState(!passState)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.confirmPassword ? true : false}
                    error={errors.confirmPassword?.message}
                  />
                )}
                name="confirmPassword"
              />

              <HStack gap={5} alignItems="center">
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
                    I agree to the
                  </CheckboxLabel>
                </Checkbox>
                <Link>
                  <Text
                    color={colors.primary}
                    fontSize={14}
                    fontWeight="$light">
                    Terms & Conditions
                  </Text>
                </Link>
              </HStack>
            </VStack>
            <PrimaryButton
              isLoading={isLoading}
              text="Create Account"
              onPress={handleSubmit(onSubmit)}
            />
            <Center gap={10}>
              <HStack gap={5}>
                <Text color={colors.title} fontSize={14} fontWeight="$light">
                  Already have an account?
                </Text>
                <Pressable onPress={() => navigate('driverLogin')}>
                  <Text
                    fontWeight="$light"
                    fontSize={14}
                    color={colors.primary}>
                    Sign In
                  </Text>
                </Pressable>
              </HStack>
              <HStack gap={5}>
                <Text color={colors.title} fontSize={14} fontWeight="$light">
                  Need help?
                </Text>
                <Pressable onPress={() => navigate('register')}>
                  <Text
                    fontSize={14}
                    fontWeight="$light"
                    color={colors.primary}>
                    Contact Support
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
      w={160}
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

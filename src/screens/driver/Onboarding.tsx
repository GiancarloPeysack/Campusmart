import {
  Box,
  Center,
  HStack,
  MailIcon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {useTheme} from '../../theme/useTheme';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate} from '../../navigators/Root';
import {Icons} from '../../assets/icons';
import useAuth from '../../hooks/useAuth';
import useDriver from './hooks/useDriver';
import { PrimaryButton } from '../../components';

export default function OnboardingScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();
  const { user } = useAuth();
  const { driver } = useDriver();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Center gap={10} mb={34} flex={1} px={16}>
          {driver?.isRegistrationCompleted ?   <Icons.Success /> :   <Icons.Clock />}

            {driver?.isRegistrationCompleted ? <Text color="$black" fontSize={20} fontWeight={'$bold'}>
             Approved
            </Text> : <Text color="$black" fontSize={20} fontWeight={'$bold'}>
              Waiting for Confirmation
            </Text>}
            <Text
              mt={9}
              textAlign="center"
              fontSize={14}
              fontWeight="$light"
              color={colors.title}>
             {driver?.isRegistrationCompleted ? `Your account was approved from the restaurant administrator. Reg ID: ${driver?.driverId}` : 'Your account is pending approval from the restaurant administrator'}
            </Text>

            <Box
              mt={25}
              p={20}
              bg="$white"
              borderRadius={16}
              w="$full"
              shadowColor="#E5E7EB"
              shadowOpacity={0.8}
              shadowRadius={5}
              shadowOffset={{width: 0, height: 1}}>
              <HStack alignItems="center" justifyContent="center" gap={8}>
                <Box bg={driver?.isRegistrationCompleted ? "#059669" : "#FACC15"} w={12} height={12} borderRadius={50} />
                <Text color="$black" fontSize={14} fontWeight={'$medium'}>
                  Status: {driver?.isRegistrationCompleted ? 'Approved' : 'Pending Review'}
                </Text>
              </HStack>
              <VStack mt={20} gap={15}>
                <HStack alignItems="center" gap={12}>
                  <Icons.Rest fill={'#3B82F6'} />
                  <Text color={colors.title} fontSize={14}>
                    {driver?.restaurent?.nameOfRestaurent}
                  </Text>
                </HStack>
                <HStack alignItems="center" gap={12}>
                  <MailIcon color="#3B82F6" />
                  <Text color={colors.title} fontSize={14}>
                    {user?.email}
                  </Text>
                </HStack>
                <HStack alignItems="center">
                  <Icons.SmallBike />
                  <Text ml={8} color={colors.title} fontSize={14}>
                    Delivery Staff
                  </Text>
                </HStack>
              </VStack>
            </Box>
            {driver?.isRegistrationCompleted === false && <Box
              mt={25}
              p={20}
              bg={colors.light_blue}
              borderRadius={16}
              w="$full">
              <Text color="$black" textAlign='center' fontSize={14} fontWeight={'$medium'}>
                What happens next?
              </Text>
              <Text mt={14} textAlign='center' fontSize={14} fontWeight='$light'>
                The restaurant administrator will review your application.
                You'll receive an email when your account is approved.
              </Text>
            </Box>}
                <VStack mt={15} gap={15} w='$full'>
                    {driver?.isRegistrationCompleted && <PrimaryButton text='Dashboard' onPress={()=>{}} />}
                    <PrimaryButton text='Back' variant='success' onPress={async () => await auth().signOut()} />
                </VStack>
          </Center>
      
        </ScrollView>
        <Center mb={10}>
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

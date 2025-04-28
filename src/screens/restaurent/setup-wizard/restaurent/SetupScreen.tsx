import {
  AddIcon,
  ArrowRightIcon,
  Box,
  Center,
  CheckIcon,
  ClockIcon,
  HelpCircleIcon,
  HStack,
  Icon,
  MailIcon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';

import {useTheme} from '../../../../theme/useTheme';
import {Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate, navigateAndSimpleReset} from '../../../../navigators/Root';
import {PrimaryButton} from '../../../../components';
import {Icons} from '../../../../assets/icons';
import useMenu from '../../../../hooks/useMenu';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useLoading} from '../../../../hooks/useLoading';

interface CardProps {
  count: string;
  text: string;
  caption: string;
  isComplete: boolean;
  buttonText?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = props => {
  const {colors} = useTheme();

  return (
    <Box
      h={98}
      w="$full"
      bg={colors.white}
      borderWidth={1}
      borderColor={colors.gray1}
      rounded={12}
      justifyContent="center"
      px={16}>
      <HStack gap={12} position="relative">
        <Box
          h={32}
          w={32}
          rounded="$full"
          bg={props.isComplete ? colors.primary : colors.light_blue}>
          <Center flex={1}>
            <Text
              fontWeight="$bold"
              color={props.isComplete ? colors.white : colors.primary}>
              {props.count}
            </Text>
          </Center>
        </Box>
        <VStack gap={14}>
          <Text fontWeight="$bold" color="$black">
            {props.text}
          </Text>
          {props.isComplete ? (
            <Text fontWeight="$light" color={colors.gray5} fontSize={14}>
              {props.caption}
            </Text>
          ) : (
            <Pressable $active-opacity={0.8} onPress={props.onPress}>
              <HStack gap={5}>
                <Icon as={AddIcon} color={colors.primary} />
                <Text fontWeight="$light" color={colors.primary} fontSize={14}>
                  {props.buttonText}
                </Text>
              </HStack>
            </Pressable>
          )}
        </VStack>
        {props.isComplete && (
          <Icon
            position="absolute"
            right={0}
            as={CheckIcon}
            color={colors.green}
          />
        )}
      </HStack>
    </Box>
  );
};

export default function SetupScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();

  const {menu} = useMenu();

  const {isLoading, onLoad, onLoaded} = useLoading();

  const currentUser = auth().currentUser;

  const completeReistration = async () => {
    onLoad();
    try {
      await firestore().collection('users').doc(currentUser?.uid).update({
        isRegistrationCompleted: true,
      });
      navigateAndSimpleReset('success');
    } catch (error) {
      console.error('Error updating image:', error);
      Alert.alert('Error', 'Failed to update profile picture.');
    } finally {
      onLoaded();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Box p={16}>
            <Center gap={10} mb={34}>
              <Icons.CircleRest />

              <Text color="$black" fontSize={20} fontWeight={'$bold'}>
                Welcome to Palma!
              </Text>
              <Text
                textAlign="center"
                fontSize={16}
                fontWeight="$light"
                color={colors.title}>
                Set up your restaurant to start receiving orders!
              </Text>
            </Center>

            <VStack gap={16}>
              <Card
                text="Business Details"
                count="1"
                caption="Auto-filled from registration"
                isComplete={true}
              />
              <Card
                text="Business Details"
                count="2"
                caption="Finished"
                isComplete={menu && menu.length > 0 ? true : false}
                buttonText="Add your first menu item"
                onPress={() => navigate('setupMenu', {title: 'Menu setup'})}
              />
            </VStack>
          </Box>
        </ScrollView>
        <Box
          bg={colors.white}
          p={16}
          borderColor={colors.gray1}
          borderWidth={1}>
          <PrimaryButton
            isLoading={isLoading}
            disabled={menu && menu.length > 0 ? false : true}
            onPress={completeReistration}
            text="Complete Setup"
          />
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}

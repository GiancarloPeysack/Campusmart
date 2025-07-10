import {
  Box,
  Button,
  ButtonText,
  Center,
  ChevronRightIcon,
  ClockIcon,
  EditIcon,
  HStack,
  Icon,
  Pressable,
  SettingsIcon,
  Spinner,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';

import auth from '@react-native-firebase/auth';
import useAuth from '../../../../hooks/useAuth';
import Toast from 'react-native-toast-message';
import { ImagePick, PrimaryButton } from '../../../../components';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useLoading } from '../../../../hooks/useLoading';
import useRestaurent from '../../../../hooks/useRestaurent';
import { navigate } from '../../../../navigators/Root';
import { ScrollView } from 'react-native-gesture-handler';
import { Icons } from '../../../../assets/icons';
import { Message } from '../../../../assets/icons/Message';
import I18n from '../../../../localization/i18n';

export default function HomeScreen(): React.JSX.Element {
  const { colors } = useTheme();

  const { user } = useAuth();

  const [imageSource, setImageSource] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const { isLoading, onLoad, onLoaded } = useLoading();

  const {
    restaurent,
    isLoading: isLoadingData,
    fetchRestaurent,
  } = useRestaurent();


  const [hasUnread, setHasUnread] = useState(false);


  const triggerAlert = () => {
    Alert.alert(
      'Add New Photo',
      undefined,
      [
        {
          text: 'Take Photo',
          onPress: () => setImageSource('camera'),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => setImageSource('gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const updateCover = useCallback(
    async (imageUri: string) => {
      onLoad();
      try {
        const currentUser = auth().currentUser;

        const reference = storage().ref(
          `restuarent/${currentUser?.uid}/cover.jpg`,
        );
        await reference.putFile(imageUri);

        const downloadURL = await reference.getDownloadURL();

        await firestore()
          .collection('restaurants')
          .doc(currentUser?.uid)
          .update({
            coverImage: downloadURL,
          });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Cover photo updated!',
        });
        fetchRestaurent();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update cover photo.',
        });
      } finally {
        onLoaded();
      }
    },
    [restaurent],
  );

  return (
    <Box flex={1} bg={colors.white}>
      <Box position="relative">
        {/* {restaurent?.coverImage && ( */}
        <Image
          height={220}
          resizeMode="cover"
          source={{ uri: restaurent?.coverImage }}
          alt="cover"
        />
        {/* )} */}
        {(isLoading || isLoadingData) && (
          <Center
            zIndex={999}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}>
            <Box bg="$white" p={6} rounded={8}>
              <Spinner color={colors.primary} size="large" />
            </Box>
          </Center>
        )}
        <View style={styles.overlay} />
        <Box position="absolute" right={10} top={10}>
          <ImagePick
            uploadImage={updateCover}
            type="camera"
            onPress={triggerAlert}
            setSource={setImageSource}
            source={imageSource}
            setImage={setImage}
            image={image}
          />
        </Box>
      </Box>

      <ScrollView
        style={{ paddingTop: 20 }}
        borderBottomColor={colors.gray1}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor='#fff'
        top={-20}
        borderBottomWidth={1}
        showsVerticalScrollIndicator={false}>
        <Box>
          <HStack justifyContent="space-between" paddingHorizontal={5}>
            <HStack alignItems="center" gap={12}>
              <Image
                height={48}
                width={48}
                borderRadius={100}
                resizeMode="cover"
                source={{ uri: user?.profilePicture }}
                alt="profile"
              />
              <VStack gap={6}>
                <Text color="$black" fontWeight="$bold" fontSize={18}>
                  {user?.firstName} Admin
                </Text>
                <HStack alignItems="center" gap={8}>
                  <Box w={8} h={8} rounded="$full" bg="#22C55E" />
                  <Text color={colors.gray5} fontSize={14}>
                    {I18n.t('Open_Until')} {restaurent?.closeTime}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            {/* <Pressable onPress={() => navigate('EditProfile')}>
              <Icon as={EditIcon} color={colors.primary} w={20} h={20} />
            </Pressable> */}
          </HStack>

          <HStack gap={8} paddingVertical={10} paddingHorizontal={10}>
            <Box
              h={32}
              rounded={8}
              px={12}
              flexDirection="row"
              alignItems="center"
              gap={5}
              bg={colors.light_blue}>
              <Icon as={ClockIcon} color={colors.primary} w={14} h={14} />
              <Text color={colors.primary} fontSize={14}>
                {I18n.t('From')}: {restaurent?.openTime}
              </Text>
            </Box>
            <Box
              h={32}
              rounded={8}
              px={12}
              flexDirection="row"
              alignItems="center"
              gap={5}
              bg={colors.light_blue}>
              <Icon as={ClockIcon} color={colors.primary} w={14} h={14} />
              <Text color={colors.primary} fontSize={14}>
                {I18n.t('Until')}: {restaurent?.closeTime}
              </Text>
            </Box>
          </HStack>
        </Box>

        <VStack p={16} flex={1} gap={20}>
          <Box
            bg={colors.white}
            borderWidth={1}
            borderColor="#F3F4F6"
            rounded={12}
            p={17}
            gap={8}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={colors.title} fontSize={16} fontWeight="$medium">
                {I18n.t('Restaurant_Bio')}
              </Text>
              {/* <Pressable
                onPress={() => navigate('EditBio', { bio: restaurent?.bio })}>
                <Text color={colors.primary} fontSize={14}>
                  Edit
                </Text>
              </Pressable> */}
            </HStack>
            <Text color={colors.title} fontSize={14} fontWeight="$light">
              {restaurent?.bio || 'Welcome to our restaurant!'}
            </Text>
          </Box>

          <Pressable
            onPress={() => navigate('MessagesScreen')}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            py={12}
            borderBottomWidth={1}
            borderColor="#E5E7EB">
            <HStack alignItems="center" space="md">
              <Icon as={Icons.Message} />
              <Text fontSize={16} fontWeight="medium">
                {I18n.t('Messages')}
              </Text>
              {hasUnread && <Box w={8} h={8} bg="$red500" rounded="$full" ml={6} />}
            </HStack>

            <Icon as={ChevronRightIcon} />
          </Pressable>

          <Pressable
            onPress={() => navigate('ResSettings')}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            py={12}
            borderBottomWidth={1}
            borderColor="#E5E7EB">
            <HStack alignItems="center" space="md">
              <Icon as={SettingsIcon} />
              <Text fontSize={16} fontWeight="medium">
                {I18n.t('Settings')}
              </Text>
            </HStack>

            <Icon as={ChevronRightIcon} />
          </Pressable>

          {restaurent?.stripeStatus === 'verified' && restaurent?.stripeAccountId ?
            <PrimaryButton
              variant="secondry"
              text="Stripe Connected"
              onPress={() => navigate('StripeConnect')}
              disabled={true}
            />
            : restaurent?.stripeStatus === 'pending' && restaurent?.stripeAccountId ?
              <PrimaryButton
                variant="secondry"
                text="Stripe Acccount Waiting Approval "
                onPress={() => navigate('StripeConnect')}
                disabled={true}
              />
              :
              <PrimaryButton
                variant="secondry"
                text="Restaurent Wallet"
                onPress={() => navigate('StripeConnect')}
              />}
        </VStack>
      </ScrollView >
    </Box >
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

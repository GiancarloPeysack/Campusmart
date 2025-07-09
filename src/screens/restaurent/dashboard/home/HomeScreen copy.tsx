import {
  Box,
  Button,
  ButtonText,
  Center,
  ClockIcon,
  EditIcon,
  HStack,
  Icon,
  Pressable,
  Spinner,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import React, { useCallback, useState } from 'react';
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

  const handleLogout = () => {
    try {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: async () => await auth().signOut() },
      ]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
        {restaurent && (
          <Image
            height={200}
            resizeMode="cover"
            source={{
              uri: restaurent?.coverImage,
            }}
            alt="cover"
          />
        )}
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
      <Box flex={1}>
        <Box
          p={16}
          gap={12}
          borderBottomColor={colors.gray1}
          borderBottomWidth={1}>
          <HStack justifyContent="space-between">
            <HStack alignItems="center" gap={12}>
              <Image
                height={48}
                width={48}
                // style={{borderRadius: '100%'}}
                resizeMode="cover"
                source={{
                  uri: user?.profilePicture,
                }}
                alt="cover"
              />
              <VStack gap={6}>
                <Text color="$black" fontWeight="$bold" fontSize={18}>
                  {user?.firstName} Admin
                </Text>
                <HStack alignItems="center" gap={8}>
                  <Box w={8} h={8} rounded="$full" bg="#22C55E" />
                  <Text color={colors.gray5} fontSize={14} fontWeight="$light">
                    Open until {restaurent && restaurent.closeTime}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Pressable
              onPress={() => navigate('EditProfile', { title: 'Edit Profile' })}>
              <Icon as={EditIcon} color={colors.primary} w={20} h={20} />
            </Pressable>
          </HStack>
          <HStack gap={8}>
            <Box
              h={32}
              rounded={8}
              px={12}
              flexDirection="row"
              alignItems="center"
              gap={5}
              bg={colors.light_blue}>
              <Icon as={ClockIcon} color={colors.primary} w={14} h={14} />
              <Text color={colors.primary} fontSize={14} fontWeight="$light">
                From: {restaurent && restaurent.openTime}
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
              <Text color={colors.primary} fontSize={14} fontWeight="$light">
                Until: {restaurent && restaurent.closeTime}
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
            gap={8}
            p={17}>
            <Text color={colors.title} fontSize={16} fontWeight="$medium">
              Restaurant Bio
            </Text>
            <Text color={colors.title} fontSize={14} fontWeight="$light">
              {(restaurent && restaurent.bio) || '{ Placeholder } '}
            </Text>
          </Box>
          <PrimaryButton
            variant="secondry"
            text="Restaurent Wallet"
            onPress={() => navigate('StripeConnect')}
          />

        </VStack>
        <Box p={16}>
          <Button rounded={8} onPress={handleLogout} bg='$red500' size="md">
            <ButtonText>Logout</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay with 40% opacity
  },
});

import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Pressable,
  ArrowLeftIcon,
  PhoneIcon,
  MailIcon,
  View,
  Avatar,
  EditIcon,
  ArrowRightIcon,
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Icons } from '../../../assets/icons';
import { useTheme } from '../../../theme/useTheme';
import { navigate } from '../../../navigators/Root';
import { CustomButton, ImagePick, InputFiled } from '../../../components';
import useAuth from '../../../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useLoading } from '../../../hooks/useLoading';

import Toast from 'react-native-toast-message';


export const EditOnboard = () => {
  const { colors } = useTheme();

  const currentUser = auth().currentUser;

  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture ?? '',
  );

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const { isLoading, onLoad, onLoaded } = useLoading();

  const [imageSource, setImageSource] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [userDetails, setUserDetails] = useState({
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    whatsapp: user?.phoneNumber ?? '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser?.uid) return;

      onLoad();
      try {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const data = userDoc.data();

          setUserDetails({
            email: data?.email ?? '',
            phoneNumber: data?.phoneNumber ?? '',
            whatsapp: data?.whatsapp ?? '',
            address: data?.address ?? '',
            bio: data?.bio ?? '',
          });

          if (data?.profilePicture) {
            setImage(data.profilePicture);
            setProfilePicture(data.profilePicture);
          }
        }
      } catch (error) {

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch user details.'
        });
      } finally {
        onLoaded();
      }
    };

    fetchUserDetails();
  }, []);


  const handleSelectProfilePicture = async (imageUri: string) => {
    onLoad();
    try {
      const reference = storage().ref(`users/${currentUser?.uid}/profile.jpg`);
      await reference.putFile(imageUri);

      const downloadURL = await reference.getDownloadURL();

      await firestore().collection('users').doc(currentUser?.uid).update({
        profilePicture: downloadURL,
      });

      setUserDetails({ ...userDetails, profilePicture: downloadURL }); // Update local state

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile picture updated!',
      });
    } catch (error) {

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update profile picture.'
      });

    } finally {
      onLoaded();
    }
  };

  const handleSaveContact = async () => {
    try {
      const userRef = firestore().collection('users').doc(currentUser?.uid);
      const userDoc = await userRef.get();
      const existing = userDoc.data();

      const updateData: any = {
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        whatsapp: userDetails.whatsapp,
        bio: userDetails.bio,
        profilePicture: profilePicture,
      };

      if (!existing?.hasOnboarded) {
        updateData.hasOnboarded = true;
      }

      await userRef.update(updateData);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User info updated!',
      });
      setIsEditingContact(false);
      setIsEditingAddress(false);
      navigate('Food');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update user info.'
      });
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

  return (
    <Box flex={1} bg={colors.background}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.lightGrey,
        }}>
        <View
          style={{
            paddingTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey100,
          }}>
          <HStack alignItems="center" mb={12} mt={20} ml={10}>
            <Pressable onPress={() => navigate('Food')} mr={10}>
              <Icon as={ArrowLeftIcon} size="lg" mr={2} />
            </Pressable>
            <Text fontWeight="$bold" fontSize={18}>
              Let's Get Started
            </Text>
          </HStack>
          <Box h={4} bg={colors.primary} width={100} mb={16} ml={10} />
        </View>

        <View style={{ backgroundColor: colors.white, flex: 1 }}>
          <HStack space="sm" p={20}>
            <ImagePick
              isLoading={isLoading}
              onPress={triggerAlert}
              setSource={setImageSource}
              source={imageSource ?? profilePicture}
              setImage={setImage}
              image={image ?? profilePicture}
              type="profile"
              uploadImage={handleSelectProfilePicture}
            />
            <View>
              <Text mt={4} fontSize={14} color={'#404040'}>
                Profile Picture
              </Text>
              <Text fontSize={14} color={colors.gray}>
                Optional
              </Text>
            </View>
          </HStack>

          <VStack m={20}>
            <HStack justifyContent="space-between" alignItems="center" mb={2}>
              <Text fontWeight="$bold" fontSize={16} color={colors.blackDark}>
                Contact Information
              </Text>
              <Pressable
                onPress={() => setIsEditingContact(!isEditingContact)}
                flexDirection="row">
                <Icon as={EditIcon} color={colors.primary} />
                <Text color={colors.primary} ml={4}>
                  {isEditingContact ? 'Cancel' : 'Edit'}
                </Text>
              </Pressable>
            </HStack>
            <View style={{ height: 1, marginVertical: 4 }} />
            <InputFiled
              placeholder="Email"
              type="text"
              rightIcon={<Icon as={MailIcon} color={colors.primary} />}
              defaultValue={userDetails.email}
              onChangeText={text =>
                setUserDetails({ ...userDetails, email: text })
              }
              editable={isEditingContact}
            />
            <View style={{ height: 1, marginVertical: 10 }} />
            <InputFiled
              placeholder="Phone Number"
              type="text"
              rightIcon={<Icon as={PhoneIcon} color={colors.primary} />}
              defaultValue={userDetails.phoneNumber}
              onChangeText={text =>
                setUserDetails({ ...userDetails, phoneNumber: text })
              }
              editable={isEditingContact}
            />
            <View style={{ height: 1, marginVertical: 10 }} />
            <InputFiled
              placeholder="WhatsApp Number"
              type="text"
              rightIcon={<Icons.Whatsapp />}
              defaultValue={userDetails.whatsapp}
              onChangeText={text =>
                setUserDetails({ ...userDetails, whatsapp: text })
              }
              editable={isEditingContact}
            />
            <View style={{ height: 1, marginVertical: 10 }} />
            {/* <HStack
              justifyContent="space-between"
              alignItems="center"
              mt={6}
              mb={2}>
              <Text fontWeight="$bold" color={colors.blackDark} fontSize={16}>
                Delivery Address
              </Text>
              <Pressable
                onPress={() => setIsEditingAddress(!isEditingAddress)}
                flexDirection="row">
                <Icon as={EditIcon} color={colors.primary} />
                <Text color={colors.primary} ml={4}>
                  {isEditingAddress ? 'Cancel' : 'Edit'}
                </Text>
              </Pressable>
            </HStack> */}
            {/* <View style={{ height: 1, marginVertical: 4 }} />
            <InputFiled
              placeholder="Bio (optional)"
              type="text"
              rightIcon={<Icons.MapPin color={colors.primary} />}
              defaultValue={userDetails.address}
              onChangeText={text =>
                setUserDetails({ ...userDetails, address: text })
              }
              editable={isEditingAddress}
              muliline={true}
            />{' '} */}
            <View style={{ height: 1, marginVertical: 6 }} />
            <Text fontSize={12} color={colors.blackDark}>
              Bio (optional)
            </Text>
            <InputFiled
              placeholder="Tell us a bit about yourself..."
              type="text"
              defaultValue={userDetails.bio}
              onChangeText={text => setUserDetails({ ...userDetails, bio: text })}
              editable={isEditingAddress}
              muliline={true}
            />
            <View style={{ height: 1, marginVertical: 10 }} />
            <CustomButton
              text="Complete Setup"
              icon={<Icon as={ArrowRightIcon} w={16} color={colors.white} />}
              onPress={handleSaveContact}
            />
            <Text mt={12} textAlign="center" fontSize={12} color={colors.gray}>
              You can always edit these details later
            </Text>
          </VStack>
        </View>
      </ScrollView>
    </Box>
  );
};

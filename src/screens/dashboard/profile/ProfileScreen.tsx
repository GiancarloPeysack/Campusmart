import {
  Box,
  Center,
  EditIcon,
  HStack,
  Icon,
  MailIcon,
  PhoneIcon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { ImagePick, InputFiled } from '../../../components';
import { Alert, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useLoading } from '../../../hooks/useLoading';
import { navigate } from '../../../navigators/Root';
import { useFocusEffect } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

interface Props {
  title: string;
  buttonText: string;
  onPress?: () => void;
}

const Card: React.FC<PropsWithChildren<Props>> = ({
  title,
  buttonText,
  onPress,
  children,
}) => {
  const { colors } = useTheme();
  return (
    <Box bg={colors.white} p={16} gap={16}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="$black" fontSize={18} fontWeight="$bold">
          {title}
        </Text>
        <Pressable
          onPress={onPress}
          flexDirection="row"
          alignItems="center"
          gap={5}>
          <Icon as={EditIcon} color={colors.primary} />
          <Text color={colors.primary} fontSize={14} fontWeight="$medium">
            {buttonText}
          </Text>
        </Pressable>
      </HStack>
      {children}
    </Box>
  );
};

export const ProfileScreen = (): React.JSX.Element => {
  const { colors } = useTheme();

  const currentUser = auth().currentUser;
  const [userDetails, setUserDetails] = useState<any>(null);
  const { isLoading, onLoad, onLoaded } = useLoading();

  const [imageSource, setImageSource] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [savedCards, setSavedCards] = useState<any[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        try {
          onLoad();
          if (currentUser) {
            const userDoc = await firestore()
              .collection('users')
              .doc(currentUser.uid)
              .get();

            if (userDoc.exists) {
              setUserDetails(userDoc.data());
              const image = userDoc.data()?.profilePicture || '';
              setImage(image);
            }
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          onLoaded();
        }
      };

      fetchUserDetails();
    }, [currentUser]),
  );


  useEffect(() => {
    if (currentUser) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('cards')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const cards = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSavedCards(cards);
        });

      return () => unsubscribe();
    }
  }, [currentUser]);


  const updateProfilePictuer = async (imageUri: string) => {
    onLoad();
    try {
      const reference = storage().ref(`users/${currentUser?.uid}/profile.jpg`);
      await reference.putFile(imageUri);

      const downloadURL = await reference.getDownloadURL();

      await firestore().collection('users').doc(currentUser?.uid).update({
        profilePicture: downloadURL,
      });

      setUserDetails({ ...userDetails, profilePicture: downloadURL });


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

  const deleteCard = async (cardId: string) => {
    try {
      if (currentUser) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('cards')
          .doc(cardId)
          .delete();

        Toast.show({
          type: 'success',
          text1: 'Deleted',
          text2: 'Card removed successfully',
        });
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <Box flex={1} bg={colors.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack gap={16} flex={1}>
          <Center h={152} bg={colors.white}>
            <ImagePick
              isLoading={isLoading}
              onPress={triggerAlert}
              setSource={setImageSource}
              source={imageSource}
              setImage={setImage}
              image={image}
              type="profile"
              uploadImage={updateProfilePictuer}
            />
            <Text fontWeight="$bold" color="$black" mt={14}>
              {userDetails?.firstName} {userDetails?.lastName}
            </Text>
            {/* <Pressable mt={5} onPress={handleLogout} w={100}>
              <Text
                color={colors.primary}
                fontSize={14}
                textTransform="uppercase"
                textAlign="center">
                Logout
              </Text>
            </Pressable> */}
          </Center>
          <Card
            title="Contact Information"
            buttonText="Edit"
            onPress={() =>
              navigate('editProfile', {
                option: 'contact',
                title: 'Edit Contact Info',
              })
            }>
            <InputFiled
              type="text"
              isDisabled={true}
              rightIcon={<Icon as={MailIcon} />}
              placeholder="sarah.j@constructor.university"
              defaultValue={userDetails?.email}
            />
            <InputFiled
              type="text"
              isDisabled={true}
              rightIcon={<Icon as={PhoneIcon} />}
              placeholder="+1 234 567 8900"
              defaultValue={userDetails?.phoneNumber}
            />
            <InputFiled
              type="text"
              isDisabled={true}
              placeholder="Whatsapp"
              rightIcon={<Icons.Whatsapp />}
              defaultValue={userDetails?.whatsapp}
            />
          </Card>

          <Card
            title="Delivery Address"
            buttonText={`${userDetails?.address ? 'Edit' : 'Add New'}`}
            onPress={() =>
              navigate('editProfile', { option: 'address', title: 'Address' })
            }>
            <Box
              bg={colors.gray6}
              borderWidth={1}
              borderColor={colors.buttonGray}
              rounded={12}>
              {userDetails?.address && (
                <HStack p={16} alignItems="flex-start" gap={10}>
                  <Icons.MapPin fill={colors.primary} />
                  <Text
                    fontWeight="$light"
                    color={colors.title}
                    flex={1}
                    numberOfLines={2}>
                    {userDetails.address.street +
                      ', ' +
                      userDetails.address?.apartment +
                      userDetails.address?.city +
                      ' ' +
                      userDetails.address?.postalCode}
                  </Text>
                </HStack>
              )}
            </Box>
          </Card>

          <Card title=" Payment Method" buttonText="Add New" onPress={() =>
            navigate('addPaymentMethod', { option: 'addPayment', title: 'Add Payment Method' })
          }>
            {savedCards?.length > 0 && savedCards.map((item => <VStack
              space="md"
              bg="#F9FAFB"
              p={16}
              borderRadius={10}
              borderColor="#E5E7EB"
              borderWidth={1}
              mb={25}
            >
              <Box>
                <Box>
                  <Box mt={4}>
                    <Text fontSize={16} color="#374151">
                      **** **** **** {item.cardNumber?.slice(-4)}
                    </Text>
                  </Box>
                  <Box mt={4}>
                    <Text fontSize={14} color="#6B7280">
                      Expires: {item.expiry}
                    </Text>
                  </Box>
                </Box>
                <Pressable onPress={() => deleteCard(item.id)}>
                  <Text style={{ color: 'red', paddingTop: 5, fontWeight: '800' }}>Delete</Text></Pressable>
              </Box>

            </VStack>)

            )}
          </Card>
        </VStack>
      </ScrollView>
    </Box>
  );
};

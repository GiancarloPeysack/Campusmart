import {
  Avatar,
  Box,
  Center,
  ChevronRightIcon,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';

import { useTheme } from '../../../../theme/useTheme';
import { Alert, ScrollView } from 'react-native';
import { Icons } from '../../../../assets/icons';
import { PrimaryButton, ProfileCard } from '../../../../components';
import useDriver from '../../hooks/useDriver';
import useAuth from '../../../../hooks/useAuth';
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import { useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import DeleteIcon from '../../../../assets/images/delete.png';

export default function ProfileScreen() {
  const { colors } = useTheme();

  const { driver, isLoading } = useDriver();
  const { user } = useAuth();

  const bottomSheetRef = useRef(null);

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

  const handleDeleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await firestore().collection('users').doc(user.uid).update({
          accountStatus: 'deleted',
          deletedAt: firestore.FieldValue.serverTimestamp(),
        });
        setTimeout(async () => {
          await auth().signOut();
        }, 500);

        Alert.alert('Account deleted.');
      }
    } catch (error) {
      console.error('Soft delete failed:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <Box flex={1} bg={colors.newBg}>
      <HStack bg={colors.white} p={16}>
        <Text fontSize={18} color="$black" fontWeight="$medium">
          Profile
        </Text>
      </HStack>
      {isLoading && (
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Box flex={1} p={16}>
          <HStack space="md">
            <Avatar bgColor="#DBEAFE">
              <Icons.SmallBike />
            </Avatar>
            <VStack>
              <Heading size="sm">{user?.firstName}</Heading>
              <Text size="sm">{driver?.driverId}</Text>
            </VStack>
          </HStack>
          <VStack mt={16} gap={16}>
            <ProfileCard
              label="Full Name"
              value={user?.firstName}
              icon={<Icons.User color={colors.primary} />}
            />
            <ProfileCard
              label="Phone Number"
              value={user?.phoneNumber}
              icon={<Icons.Call color={colors.primary} />}
            />
            <ProfileCard
              label="Email"
              value={user?.email}
              icon={<Icons.Mail color={colors.primary} />}
            />
            <ProfileCard
              label="Restaurent"
              value={driver?.restaurent?.nameOfRestaurent}
              icon={<Icons.Rest color={colors.primary} />}
            />
            <PrimaryButton
              onPress={handleLogout}
              text="Sign Out"
              variant="primary"
              bgColor="#DC2626"
            />

            <Pressable
              onPress={() => bottomSheetRef.current?.open()}
              paddingVertical={10}
              paddingHorizontal={4}>
              <HStack p={12} justifyContent="space-between">
                <HStack>
                  <Image
                    source={DeleteIcon}
                    resizeMode="contain"
                    height={16}
                    width={16}
                    marginTop={3}
                  />
                  <Text color={colors.gray} fontSize={14} marginLeft={10}>
                    Delete Account
                  </Text>
                </HStack>
                <Icon as={ChevronRightIcon} />
              </HStack>
            </Pressable>
          </VStack>
        </Box>
      </ScrollView>

      <CustomBottomSheet ref={bottomSheetRef}>
        <VStack p={20}>
          <Text fontWeight="bold" fontSize="$lg" color="red" mb={12}>
            Delete Account
          </Text>
          <Text mb={16}>Are you sure? This action cannot be undone.</Text>
          <Pressable
            onPress={handleDeleteAccount}
            bg="red"
            p={12}
            rounded={8}
            alignItems="center">
            <Text color="white" fontWeight="bold">
              Yes, Delete My Account
            </Text>
          </Pressable>
        </VStack>
      </CustomBottomSheet>
    </Box>
  );
}

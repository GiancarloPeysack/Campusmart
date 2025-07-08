import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
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

export default function ProfileScreen() {
  const { colors } = useTheme();

  const { driver, isLoading } = useDriver();
  const { user } = useAuth();

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

  return (
    <Box flex={1} bg={colors.newBg}>
      <HStack bg={colors.white} p={16}>
        <Text fontSize={18} color='$black' fontWeight='$medium'>Profile</Text>
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
            <PrimaryButton onPress={handleLogout} text='Sign Out' variant='primary' bgColor='#DC2626' />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

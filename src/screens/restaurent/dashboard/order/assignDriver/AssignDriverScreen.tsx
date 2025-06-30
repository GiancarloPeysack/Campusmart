import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Center,
  ClockIcon,
  Divider,
  Heading,
  HStack,
  Spinner,
  StarIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import firestore from '@react-native-firebase/firestore';

import { useTheme } from '../../../../../theme/useTheme';
import { Icons } from '../../../../../assets/icons';
import { PrimaryButton } from '../../../../../components';
import useDriver from '../../delivery/hooks/useDriver';
import { useState } from 'react';
import { goBack } from '../../../../../navigators/Root';
import Toast from 'react-native-toast-message';

export default function AssignDriverScreen({ route }: any) {
  const { order } = route.params;
  const { colors } = useTheme();
  const { availableDrivers, isLoading: isLoadingDrivers } = useDriver();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const assignDriver = async (id: string) => {
    console.log('Assigning driver with ID:', id);
    try {
      setIsLoading(true);

      await firestore().collection('deliveries').add({
        orderId: order.id,
        driverId: id,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      await firestore().collection('orders').doc(order.id).update({
        status: 'completed',
        assignDriverId: id,
      });

      await firestore().collection('drivers').doc(id).update({
        isAvailable: false,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Driver has been assigned successfully!',
      });
      goBack();

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} bg={colors.newBg} p={16}>
      {(isLoadingDrivers || isLoading) && (
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
      <Box
        bg="$white"
        rounded={12}
        p={16}
        gap={10}
        shadowColor="#E5E7EB"
        elevation={5}
        shadowOpacity={0.8}
        shadowRadius={2}
        shadowOffset={{ width: 0, height: 1 }}>
        <HStack gap={10} alignItems="center">
          <Icons.Invoice />
          <VStack gap={5}>
            <Text color="#000" fontWeight={600}>
              #{order.orderNumber}
            </Text>
            <Text fontSize={14}>Delivery</Text>
          </VStack>
        </HStack>
        <Divider />
        <HStack alignItems="center" gap={8}>
          <Icons.MapPin color="#2563EB" h={16} w={16} />
          <Text flex={1} fontWeight={300}>
            {order.address}
          </Text>
        </HStack>
        <HStack alignItems="center" gap={8}>
          <ClockIcon w={14} h={14} />
          <Text flex={1} fontWeight={300}>
            Estimated delivery time: 25-30 mins
          </Text>
        </HStack>
      </Box>
      <Text color="$black" fontWeight="$semibold" fontSize={18} mt={20}>
        Available Drivers ({availableDrivers?.length})
      </Text>
      <VStack mt={20}>
        {availableDrivers?.length > 0 &&
          availableDrivers.map((driver: any, key: number) => (
            <HStack
              key={key}
              alignItems="center"
              justifyContent="space-between"
              bg="$white"
              p={16}
              rounded={12}
              shadowColor="#E5E7EB"
              elevation={5}
              shadowOpacity={0.8}
              shadowRadius={2}
              shadowOffset={{ width: 0, height: 1 }}>
              <HStack space="md">
                <Avatar>
                  <AvatarFallbackText>{driver.user.firstName}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: driver.user.profilePicture,
                    }}
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm" fontWeight="$medium">
                    {driver.user.firstName}
                  </Heading>
                  <HStack space="sm">
                    <StarIcon color="#FACC15" fill="#FACC15" />
                    <Text size="sm" color="#6B7280" fontWeight="$light">
                      4.8
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <PrimaryButton isLoading={isLoading} disabled={isLoading} onPress={() => assignDriver(driver.id)} text="Select" variant="primary" height={36} />
            </HStack>
          ))}
      </VStack>
    </Box>
  );
}

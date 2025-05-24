import {ScrollView} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../../theme/useTheme';
import {Icons} from '../../../../assets/icons';
import {DriverCard} from '../../../../components';
import useDriver from './hooks/useDriver';

export default function DeliveryScreen(): React.JSX.Element {
  const {colors} = useTheme();

  const {newApplicants, isLoading, activeDrivers, updateDriverRequest} = useDriver();


  const handleApplicant = async (status: boolean, id: string) =>{
    await updateDriverRequest(status, id)
  }

  return (
    <Box flex={1} bg={colors.white}>
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
      <HStack p={10} alignItems="center" justifyContent="space-between">
        <Text color="$black" fontWeight="$bold" fontSize={20}>
          Delivery Staff
        </Text>
        <Pressable
          rounded="$full"
          $active-opacity={0.5}
          bg="#F3F4F6"
          w={44}
          h={44}>
          <Center flex={1}>
            <Icons.Message />
          </Center>
        </Pressable>
      </HStack>

      <ScrollView
        style={{backgroundColor: colors.newBg}}
        contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1} gap={20}>
          {activeDrivers?.length > 0 && (
            <VStack gap={20}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="$black" fontWeight="$semibold" fontSize={18}>
                  Active Drivers
                </Text>
                <Pressable $active-opacity={0.8}>
                  <Text color={colors.primary}>View All</Text>
                </Pressable>
              </HStack>
              <VStack gap={12}>
                {activeDrivers.map((item: any, key: number) => {
                  return (
                    <DriverCard
                      key={key}
                      name={item.user.firstName}
                      image={item.user.profilePicture}
                      createdAt={item.createdAt}
                      status={item.isAvailable ? 'available' : 'on-delivery'}
                      newApplicant={false}
                      driverId={item.driverId}
                    />
                  );
                })}
              </VStack>
            </VStack>
          )}
          {newApplicants?.length > 0 && (
            <VStack gap={20}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="$black" fontWeight="$semibold" fontSize={18}>
                  New Applications
                </Text>
                <Pressable $active-opacity={0.8}>
                  <Text color={colors.primary}>View All</Text>
                </Pressable>
              </HStack>
              <VStack gap={12}>
                {newApplicants.map((item: any, key: number) => {
                  return (
                    <DriverCard
                      key={key}
                      name={item.user.firstName}
                      image={item.user.profilePicture}
                      createdAt={item.createdAt}
                      status="pending"
                      newApplicant={true}
                      onPressAccept={()=> handleApplicant(true, item.id)}
                      onPressDecline={()=> handleApplicant(false, item.id)}
                    />
                  );
                })}
              </VStack>
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
}

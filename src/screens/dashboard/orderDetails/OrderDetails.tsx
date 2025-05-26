import {
  Box,
  CalendarDaysIcon,
  Center,
  CheckIcon,
  ClockIcon,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';
import {Image, ScrollView} from 'react-native';

export const OrderDetails = ({route}: any): React.JSX.Element => {
  const {colors} = useTheme();

  const {data} = route.params;

  console.log('Order Details Data:', data);

  return (
    <Box bg={colors.newBg} flex={1}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Box bg={'#3B82F6'} h={148} justifyContent="center" px={16}>
          <HStack alignItems="center" justifyContent="space-between">
            <VStack space="sm">
              <Text fontSize={22} color="$white" fontWeight="$bold">
                Order #{data.orderNumber}
              </Text>
              <Text color="$white" fontWeight="$light">
                Tasty Burger House
              </Text>
            </VStack>
            <Box h={36} rounded="$full" bg="#60A5FA" px={16}>
              <Center flex={1}>
                <Text fontSize={14} color="$white">
                  In Progress
                </Text>
              </Center>
            </Box>
          </HStack>
          <HStack space="sm" alignItems="center" mt={18}>
            <ClockIcon color="$white" />
            <Text color="$white">Expected in 30-45 mins</Text>
          </HStack>
        </Box>
        <Box bg="$white" p={16}>
          <HStack
            alignItems="center"
            position="relative"
            justifyContent="space-between">
            <VStack zIndex={2} alignItems="center" space="sm">
              <Box
                w={40}
                h={40}
                rounded="$full"
                bg={colors.primary}
                alignItems="center"
                justifyContent="center">
                <CheckIcon color="$white" />
              </Box>
              <Text fontSize={14} color="$black" fontWeight="$medium">
                Confirmed
              </Text>
            </VStack>
            <VStack zIndex={2} alignItems="center" space="sm">
              <Box
                w={40}
                h={40}
                rounded="$full"
                bg={colors.primary}
                alignItems="center"
                justifyContent="center">
                <Icons.UserFill color="#fff" />
              </Box>
              <Text fontSize={14} color="$black" fontWeight="$medium">
                Assigned Driver
              </Text>
            </VStack>
            <VStack zIndex={2} alignItems="center" space="sm">
              <Box
                w={40}
                h={40}
                rounded="$full"
                bg={colors.gray1}
                alignItems="center"
                justifyContent="center">
                <CalendarDaysIcon color={colors.gray3} />
              </Box>
              <Text fontSize={14} color={colors.gray3} fontWeight="$medium">
                Delivered
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Box bg="$white" p={16} mt={8}>
          <Text color="$black" fontWeight="$semibold" fontSize={18}>
            Delivery Details
          </Text>

          <HStack alignItems="flex-start" space="md" mt={15}>
            <Box mt={3}>
              <Icons.MapPin fill={colors.primary} />
            </Box>
            <VStack space="sm">
              <Text color="$black" fontWeight="$medium">
                Delivery Address
              </Text>
              <Text fontSize={14}>{data?.deliveryAddress}</Text>
            </VStack>
          </HStack>
        </Box>
        <Box bg="$white" p={16} mt={8}>
          <Text color="$black" fontWeight="$semibold" fontSize={16}>
            Order Summary
          </Text>
          <VStack mt={15} space="md">
            {data?.items?.map((item: any, index: number) => (
              <HStack key={index} alignItems="center" space="lg">
                <Image
                  source={{
                    uri: item.image || 'https://via.placeholder.com/64',
                  }}
                  resizeMode="cover"
                  height={64}
                  width={64}
                  alt="cart-image"
                  style={{borderRadius: 8}}
                />

                <VStack space="md">
                  <Text fontSize={16} fontWeight="$medium" color="$black">
                   {item.itemName}
                  </Text>
                  <Text fontSize={14} fontWeight="$light" color={colors.gray5}>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Box>
        <Box bg="$white" p={16} mt={8}>
          <Text color="$black" fontWeight="$semibold" fontSize={16}>
            Payment Details
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

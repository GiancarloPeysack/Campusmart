import {
  Box,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import useAuth from '../../../hooks/useAuth';

export const OrderDetails = ({ route }: any): React.JSX.Element => {
  const { colors } = useTheme();
  const { data } = route.params;

  const { user } = useAuth();

  return (
    <Box bg={colors.newBg} flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box
          bg={data.status === 'delivered' ? '#DCFCE7' : '#3B82F6'}
          h={160}
          justifyContent="center"
          px={16}>
          <VStack space="md">
            <HStack alignItems="center" justifyContent="space-between">
              <VStack space="xs">
                <Text
                  fontSize={22}
                  color={data.status === 'delivered' ? '$black' : '$white'}
                  fontWeight="$bold">
                  Order #{data.orderNumber}
                </Text>
                <Text color={data.status === 'delivered' ? '$black' : '$white'}>
                  {data?.restaurantInfo?.nameOfRestaurent}
                </Text>
              </VStack>
              <Box
                bg={data.status === 'delivered' ? '#F0FDF4' : '#60A5FA'}
                px={12}
                py={6}
                rounded="$full">
                <Text
                  color={data.status === 'delivered' ? '$green' : '$white'}
                  fontSize={12}>
                  {data.status === 'pending'
                    ? 'In Progress'
                    : data.status === 'accepted'
                      ? 'Accepted'
                      : data.status}
                </Text>
              </Box>
            </HStack>

            <HStack space="sm" alignItems="center">
              <ClockIcon
                color={data.status === 'delivered' ? '$black' : '$white'}
              />
              <Text color={data.status === 'delivered' ? '$black' : '$white'}>
                Expected in 30-45 mins
              </Text>
            </HStack>
          </VStack>
        </Box>

        <Box bg="$white" p={16}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack alignItems="center" space="sm">
              <Box
                w={40}
                h={40}
                mt={20}
                rounded="$full"
                bg={colors.primary}
                alignItems="center"
                justifyContent="center">
                <CheckIcon color="$white" />
              </Box>
              <Text fontSize={14} color="$black">
                Confirmed
              </Text>
            </VStack>

            <Box h={2} bg={colors.primary} flex={1} mx={4} />

            <VStack alignItems="center" space="sm">
              <Box
                w={40}
                h={40}
                mt={20}
                rounded="$full"
                bg={colors.primary}
                alignItems="center"
                justifyContent="center">
                <Icons.UserFill color="#fff" />
              </Box>
              <Text fontSize={14} color="$black">
                Driver Assigned
              </Text>
            </VStack>
            <Box h={2} bg={colors.gray1} flex={1} mx={4} />

            <VStack alignItems="center" space="sm">
              <Box
                w={40}
                h={40}
                mt={20}
                rounded="$full"
                bg={data.status === 'pending' ? colors.gray1 : colors.primary}
                alignItems="center"
                justifyContent="center">
                <CalendarDaysIcon
                  color={
                    data.status === 'pending' ? colors.gray3 : colors.white
                  }
                />
              </Box>
              <Text
                fontSize={14}
                color={data.status === 'pending' ? colors.gray3 : '$black'}>
                Delivered
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Delivery Details */}
        <Box bg="$white" p={16} mt={8}>
          <Text fontSize={16} fontWeight="$semibold" color="$black">
            Delivery Details
          </Text>

          <VStack space="md" mt={16}>
            <HStack space="md">
              <Icons.MapPin fill={colors.primary} />
              <Text fontSize={14} color="$black">
                {data?.deliveryAddress || 'No address provided'}
              </Text>
            </HStack>

            <HStack space="md">
              <Icons.User color={colors.primary} style={{ marginTop: 4 }} />
              <Text fontSize={14} color="$black">
                {user?.firstName + ' ' + user?.lastName || 'John Smith'}
                {'\n'}
                {user?.phoneNumber || '+1 (555) 123-4567'}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Order Summary */}
        <Box bg="$white" p={16} mt={8}>
          <Text fontSize={16} fontWeight="$semibold" color="$black">
            Order Summary
          </Text>

          <VStack mt={16} space="md">
            {data?.items?.map((item: any, index: number) => (
              <HStack key={index} alignItems="center" space="lg">
                <Image
                  source={{ uri: item.image || 'https://via.placeholder.com/64' }}
                  resizeMode="cover"
                  height={64}
                  width={64}
                  alt="cart-image"
                  style={{ borderRadius: 8 }}
                />
                <VStack space="xs">
                  <Text fontSize={16} fontWeight="$medium" color="$black">
                    {item.itemName}
                  </Text>
                  <Text fontSize={14} color={colors.gray4}>
                    {item.description || 'No description'}
                  </Text>
                </VStack>
                <Text
                  fontSize={14}
                  fontWeight="$medium"
                  color="$black"
                  ml="auto">
                  ${item.price.toFixed(2)}
                </Text>
              </HStack>
            ))}
          </VStack>

          {/* Summary Totals */}
          <VStack mt={16} space="sm">
            <HStack justifyContent="space-between">
              <Text color={colors.gray5}>Subtotal</Text>
              <Text color={colors.gray5}>${data?.subtotal?.toFixed(2)}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color={colors.gray5}>Delivery Fee</Text>
              <Text color={colors.gray5}>${data?.deliveryFee?.toFixed(2)}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt={8}>
              <Text fontWeight="$semibold" fontSize={16} color="$black">
                Total
              </Text>
              <Text fontWeight="$semibold" fontSize={16} color="$black">
                ${data?.totalAmount}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Payment Details */}
        <Box bg="$white" p={16} mt={8}>
          <Text fontSize={16} fontWeight="$semibold" color="$black">
            Payment Details
          </Text>
          <HStack mt={12} space="md" alignItems="center">
            <Icons.Card fill={colors.primary} />
            <VStack space="xs">
              <Text fontSize={14} color="$black">
                Visa card ending in 4242
              </Text>
              <Text fontSize={12} color={colors.gray4}>
                Paid on Jan 15, 2025
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Verification Button */}
        {/* <Box bg="$white" p={16} mt={8} mb={24}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              height: 48,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text color="$white" fontSize={16} fontWeight="$semibold">
              🔒 Verification
            </Text>
          </TouchableOpacity>
        </Box> */}
      </ScrollView>
    </Box>
  );
};

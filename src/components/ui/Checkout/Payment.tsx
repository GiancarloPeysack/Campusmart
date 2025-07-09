import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';

export const Payment = ({ orderData, isSuccess, resturant, onNavigate, onBack }: any) => {
  const { colors } = useTheme();

  const transactionDate = new Date(orderData?.createdAt?.seconds * 1000);
  const formattedDate = transactionDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Box flex={1} bg={colors.white} p={20} pt={40} justifyContent="space-between">
      <VStack gap={30}>
        <Center>
          <VStack alignItems="center" gap={24}>
            {isSuccess ? (
              <Icons.Success width={64} height={64} />
            ) : (
              <Icons.Failed width={80} height={80} />
            )}
            <VStack alignItems="center" gap={6}>
              <Text fontSize={22} fontWeight="$semibold" color={colors.title_1}>
                {isSuccess ? 'Payment Successful! 🎉' : 'Payment Failed'}
              </Text>
              <Text
                fontSize={14}
                fontWeight="$light"
                color={colors.gray5}
                textAlign="center"
              >
                {isSuccess
                  ? 'Your order has been placed.'
                  : 'Oops! Payment failed. Please try again or use a different method.'}
              </Text>
            </VStack>
          </VStack>
        </Center>

        {isSuccess ? (
          <VStack
            bg={colors.gray6}
            rounded={12}
            w="$full"
            p={16}
            gap={14}
          >
            <HStack justifyContent="space-between" borderBottomWidth={1} borderBottomColor={colors.gray1} pb={20}>
              <Text fontSize={14} fontWeight="$light" color={colors.title}>
                Order Number
              </Text>
              <Text fontSize={14} fontWeight="$medium" color={colors.title_1}>
                #{orderData?.orderNumber || '123456'}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" borderBottomWidth={1} mt={6} borderBottomColor={colors.gray1} pb={20}>
              <Text fontSize={14} fontWeight="$light" color={colors.title}>
                Estimated Delivery
              </Text>
              <Text fontSize={14} fontWeight="$medium" color={colors.greenSuccess}>
                Arriving in {formattedDate || '30 min'}
              </Text>
            </HStack>
            <HStack gap={10} alignItems="center">
              <Image
                source={resturant?.coverImage ? { uri: resturant?.coverImage } : require('../../../assets/images/resturant.png')}
                resizeMode="cover"
                height={80}
                width={80}
                alt="card-image"
              />
              <VStack>
                <Text fontSize={14} fontWeight="$medium" color={colors.title_1}>
                  {resturant?.nameOfRestaurent ?? "The Italian Place"}
                </Text>
                <Text fontSize={12} fontWeight="$light" color={colors.red}>
                  {resturant?.closeTime}
                </Text>
                {/* <Text fontSize={12} fontWeight="$light" color={colors.gray5}>
                  123 Restaurant Ave
                </Text> */}
              </VStack>
            </HStack>
          </VStack>
        ) : (
          <VStack bg="#FEE2E2" rounded={12} w="$full" p={16} gap={14}>
            <HStack gap={12} alignItems="center">
              <Icons.Info color="#DC2626" />
              <Text fontSize={14} fontWeight="$medium" color="#DC2626">
                Transaction Declined
              </Text>
            </HStack>
            <Text fontSize={14} fontWeight="$light" color="#DC2626">
              Your card was declined. Please check your card details or try a
              different payment method.
            </Text>
          </VStack>
        )}

        {isSuccess ? (
          <VStack mt={20} gap={12}>
            <PrimaryButton text="Track Order"
              onPress={onNavigate} icon={<Icons.MapPin />} />
            <PrimaryButton text="Back to Home" variant="success"
              onPress={onNavigate} icon={<Icons.Home />} />
          </VStack>
        ) : (
          <VStack mt={20} gap={12}>
            <PrimaryButton
              text="Try Again"
              icon={<Icons.Refresh />}
              onPress={onBack}
            />
            <PrimaryButton text="Change Payment Method" variant="success"
              onPress={onNavigate} icon={<Icons.Card />} />
          </VStack>
        )}
      </VStack>

      {!isSuccess && (
        <Center mt={30}>
          <Text fontSize={12} fontWeight="$light" color={colors.gray5}>
            Powered by{' '}
            <Text fontWeight="$medium" color="#6366F1">
              stripe
            </Text>
          </Text>
        </Center>
      )}
    </Box>
  );
};

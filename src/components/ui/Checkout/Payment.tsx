import {
  Box,
  Center,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {ReactNode} from 'react';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';
import {PrimaryButton} from '../../common/Buttons/PrimaryButton';
import {navigate} from '../../../navigators/Root';

export const Payment = ({orderData, onNavigate}: any) => {
  const {colors} = useTheme();
  const isSuccess = true;

  const transactionDate = new Date(orderData?.createdAt?.seconds * 1000);
  const formattedDate = transactionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Box flex={1} bg={colors.white} p={16} mt={6}>
      <Center>
        <VStack alignItems="center" gap={20}>
          {isSuccess ? <Icons.Success /> : <Icons.Failed />}
          <VStack alignItems="center" gap={14}>
            <Text fontSize={24} fontWeight="$semibold" color={colors.title_1}>
              {isSuccess ? ' Payment Successfull!' : ' Payment Failed!'}
            </Text>
            <Text
              fontSize={16}
              fontWeight="$light"
              color={colors.gray5}
              textAlign="center">
              {isSuccess
                ? 'Your transaction has been completed'
                : 'Oops! Payment failed. Please try again or use a different method.'}
            </Text>
            {isSuccess && (
              <Text fontSize={24} fontWeight="$bold" color={colors.title_1}>
                ${orderData?.totalAmount || '0.00'}
              </Text>
            )}
          </VStack>
        </VStack>
      </Center>
      {isSuccess ? (
        <VStack
          bg={colors.gray6}
          rounded={12}
          w="$full"
          mt={30}
          p={16}
          gap={14}>
          <HStack justifyContent="space-between">
            <Text fontSize={14} fontWeight="$light" color={colors.title}>
              Transaction ID
            </Text>
            <Text fontSize={14} fontWeight="$medium" color={colors.title_1}>
              {orderData?.orderNumber || 'N/A'}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontSize={14} fontWeight="$light" color={colors.title}>
              Date
            </Text>
            <Text fontSize={14} fontWeight="$medium" color={colors.title_1}>
              {formattedDate}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontSize={14} fontWeight="$light" color={colors.title}>
              Payment Method
            </Text>
            <Text fontSize={14} fontWeight="$medium" color={colors.title_1}>
              ••••4242
            </Text>
          </HStack>
        </VStack>
      ) : (
        <VStack bg={colors.red1} rounded={12} w="$full" mt={30} p={16} gap={14}>
          <HStack gap={12} alignItems="center">
            <Icons.Info />
            <Text fontSize={14} fontWeight="$medium" color={colors.red}>
              Transaction Declined
            </Text>
          </HStack>
          <Text fontSize={14} fontWeight="$light" color={colors.red}>
            Your card was declined. Please check your card details or try a
            different payment method.
          </Text>
        </VStack>
      )}

      {isSuccess ? (
        <VStack mt={30} gap={12}>
          <PrimaryButton text="Download Receipt" />
          <PrimaryButton text="Back to Home" variant="success" 
            onPress={onNavigate}/>
          <HStack gap={5} mt={30} alignItems="center" justifyContent="center">
            <Text fontSize={14} fontWeight="$light">
              Having trouble?
            </Text>
            <Pressable>
              <Text fontSize={14} fontWeight="$medium" color={colors.primary}>
                Contact Support
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      ) : (
        <VStack mt={30} gap={12}>
          <PrimaryButton icon={<Icons.Refresh />} text="Try Again" />
          <PrimaryButton
            icon={<Icons.Card color="#374151" />}
            text="Change Payment Method"
            variant="success"
          />
        </VStack>
      )}
    </Box>
  );
};
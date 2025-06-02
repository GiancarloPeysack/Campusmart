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

type BlockProps = {
  title: string;
  iconText: string;
  icon: ReactNode;
  desc: string;
  onPress?: () => void;
};

const Block = (props: BlockProps): React.JSX.Element => {
  const {colors} = useTheme();
  return (
    <VStack p={16} gap={12}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={16} fontWeight="$semibold" color="$black">
          {props.title}
        </Text>
        <Pressable $active-opacity={0.8}>
          <Text fontSize={14} fontWeight="$medium" color={colors.primary}>
            Change
          </Text>
        </Pressable>
      </HStack>
      <HStack gap={12}>
        <Box bg={colors.light_blue} w={40} h={40} rounded="$full">
          <Center flex={1}>{props.icon}</Center>
        </Box>
        <VStack gap={6}>
          <Text fontSize={16} fontWeight="$medium" color="$black">
            {props.iconText}
          </Text>
          <Text fontSize={14} fontWeight="$light" color={colors.title}>
            {props.desc}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export const Payment = (): React.JSX.Element => {
  const {colors} = useTheme();

  const isSuccess = true;

  return (
    <Box flex={1} bg={colors.white} p={16}>
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
                $149.99
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
              TXN25698741
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontSize={14} fontWeight="$light" color={colors.title}>
              Date
            </Text>
            <Text fontSize={14} fontWeight="$medium" color={colors.title_1}>
              Feb 15, 2025
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
        <PrimaryButton text="Back to Home" variant="success" />
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

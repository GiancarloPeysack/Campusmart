import {
  AddIcon,
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  RemoveIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';

type CartCardProps = {
  text: string;
  details: string;
  amount: number;
  qty: number;
  img: string;
  isPressed?: boolean;
  onIncrement: any
  onDecrement: any
};

export const CartCard = (props: CartCardProps): React.JSX.Element => {
  const {colors} = useTheme();

  return (
    <Pressable>
      <Box px={8} py={10} flex={1} rounded={12} bg={colors.light_blue}>
        <HStack gap={10} alignItems="center">
        
          <Image
            source={{uri: props.img}}
            resizeMode="cover"
            h={64}
            w={64}
            alt="cart-image"
            rounded={8}
          />
          <VStack gap={7} w={150}>
            <Text flex={1} fontSize={16} fontWeight="$medium" color="$black">
              {props.text}
            </Text>
            <Text fontSize={14} fontWeight="$light" color={colors.gray5}>
              {props.details}
            </Text>
            <Text fontSize={16} fontWeight="$medium" color={colors.primary}>
              ${(props.amount * props.qty).toFixed(2)}
            </Text>
          </VStack>
          <HStack alignItems="center" gap={8}>
            <Pressable onPress={props.onDecrement} $active-opacity={0.8} w={28} h={28} rounded="$full" bg={colors.buttonGray}>
              <Center flex={1}>
                <Icon as={RemoveIcon} color={colors.primary} />
              </Center>
            </Pressable>
            <Text color="$black" fontWeight="$semibold">
              {props.qty}
            </Text>
            <Pressable onPress={props.onIncrement} $active-opacity={0.8} w={28} h={28} rounded="$full" bg={colors.buttonGray}>
              <Center flex={1}>
                <Icon as={AddIcon} color={colors.primary} />
              </Center>
            </Pressable>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

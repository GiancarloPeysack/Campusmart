import { Box, Divider, HStack, Text, VStack } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { CartCard } from './CartCard';
import { useState } from 'react';
import { useTheme } from '../../../theme/useTheme';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import { navigate } from '../../../navigators/Root';
import { useCart } from '../../../context/cart';

export const Cart = () => {
  const { colors } = useTheme();

  const { cart, updateQuantity, total, deliveryFee, subtotal } = useCart();

  return (
    <Box flex={1}>
      <Box flex={1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <VStack gap={12}>
            {cart
              ? cart.map((item, index) => {
                return (
                  <CartCard
                    key={index}
                    img={item.image}
                    text={item.itemName}
                    details="+ French Fries"
                    amount={item.price}
                    qty={item.quantity}
                    onDecrement={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    onIncrement={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  />
                );
              })
              : null}
          </VStack>
        </ScrollView>
      </Box>

      <VStack gap={15} mb={5}>
        <Divider bg={colors.gray1} />
        <HStack justifyContent="space-between">
          <Text fontSize={16} fontWeight="$light" color={colors.title}>
            Selected Items ({cart.length})
          </Text>
          <Text fontSize={16} fontWeight="$light" color={colors.title}>
            ${subtotal.toFixed(2)}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize={16} fontWeight="$light" color={colors.title}>
            Delivery Fee
          </Text>
          <Text fontSize={16} fontWeight="$light" color={colors.title}>
            ${deliveryFee}
          </Text>
        </HStack>
        <Divider bg={colors.gray1} />
        <HStack justifyContent="space-between">
          <Text fontSize={18} fontWeight="$semibold" color="$black">
            Total
          </Text>
          <Text fontSize={18} fontWeight="$semibold" color={colors.primary}>
            ${total.toFixed(2)}
          </Text>
        </HStack>
        <PrimaryButton
          disabled={cart.length > 0 ? false : true}
          text="Proceed to Checkout"
          onPress={() => navigate('Checkout', { title: 'Checkout' })}
        />
      </VStack>
    </Box>
  );
};

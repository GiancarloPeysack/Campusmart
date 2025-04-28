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
import useAuth from '../../../hooks/useAuth';
import { useCart } from '../../../context/cart';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
import { useLoading } from '../../../hooks/useLoading';

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
        <Pressable $active-opacity={0.8} onPress={props.onPress}>  
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

export const Checkout = (): React.JSX.Element => {
  const {colors} = useTheme();

  const {user, loading} = useAuth();
  const {cart, total, deliveryFee, subtotal, clearCart} = useCart();
  const {isLoading, onLoad, onLoaded} = useLoading();

  const placeOrder = async () => {
    const currentUser = auth().currentUser;

    try {
      if (!currentUser) {
        Alert.alert('Failed', 'User not authenticated');
        return;
      }
      onLoad();
      const orderData = {
        userId: currentUser.uid,
        restaurentId: cart[0].restaurantId,
        items: cart.map(item => ({
          id: item.id,
          itemName: item.itemName,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryAddress: user.address.street,
        totalAmount: total,
        deliveryFee: deliveryFee,
        subtotal: subtotal,
        timestamp: serverTimestamp(),
        status: 'pending', 
      };

      console.log('Order Data:', orderData);
      await firestore().collection('orders').add(orderData);
      
      Alert.alert('Success', 'Order placed successfully!');
      clearCart(); 

      navigate('Home');
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Failed', 'Failed to place order. Please try again.');
    } finally {
      onLoaded();
    }
  };

  if (loading) {
    return (
      <Box flex={1} p={16} bg={colors.white}>
        <Text fontSize={14} fontWeight="$light">
          Fetching data...
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={colors.white}>
      <VStack gap={10} flex={1}>
        <Block
          title="Delivery Address"
          iconText="Home"
          onPress={() =>
            navigate('editProfile', {option: 'address', title: 'Address'})
          }
          desc={
            user?.address.street +
            ', ' +
            user?.address?.apartment +
            user?.address?.city +
            ' ' +
            user?.address?.postalCode
          }
          icon={<Icons.MapTag color={colors.primary} />}
        />
        <Divider bg={colors.gray1} />
        <Block
          title="Payment Method"
          iconText="Visa ending in 4242"
          desc="Expires 12/25"
          icon={<Icons.Card color={colors.primary} />}
        />
        <Divider bg={colors.gray1} />
        <VStack p={16} gap={18}>
          <Text fontSize={16} fontWeight="$semibold" color="$black">
            Order Summary
          </Text>
          <VStack gap={14}>
            <HStack justifyContent="space-between">
              <Text fontSize={14} fontWeight="$light" color={colors.title}>
                Selected Items ({cart.length})
              </Text>
              <Text fontSize={14} fontWeight="$light" color={colors.title}>
               ${subtotal.toFixed(2)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize={14} fontWeight="$light" color={colors.title}>
                Delivery Fee
              </Text>
              <Text fontSize={14} fontWeight="$light" color={colors.green}>
                ${deliveryFee}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize={14} fontWeight="$light" color={colors.green}>
                Discount (0%)
              </Text>
              <Text fontSize={14} fontWeight="$light" color={colors.green}>
                
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
          </VStack>
        </VStack>
      </VStack>
      <Box p={16}>
        <PrimaryButton
          isLoading={isLoading}
          icon={<Icons.Lock />}
          text="Pay €27.85"
          onPress={placeOrder}
        />
      </Box>
    </Box>
  );
};

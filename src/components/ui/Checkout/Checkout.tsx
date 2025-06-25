import {
  Box,
  Center,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { useTheme } from '../../../theme/useTheme';
import { Icons } from '../../../assets/icons';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import { navigate } from '../../../navigators/Root';
import useAuth from '../../../hooks/useAuth';
import { useCart } from '../../../context/cart';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useLoading } from '../../../hooks/useLoading';

import { CardField, confirmPayment } from '@stripe/stripe-react-native';

export const Checkout = (): React.JSX.Element => {
  const { colors } = useTheme();
  const { user, loading } = useAuth();
  const { cart, total, deliveryFee, subtotal, clearCart } = useCart();
  const { isLoading, onLoad, onLoaded } = useLoading();

  const [cardDetails, setCardDetails] = useState<any>(null);

  const fetchPaymentIntentClientSecret = async () => {
    try {
      if (!cart || cart.length === 0 || !cart[0].restaurantId) {
        throw new Error('Invalid cart or restaurant ID');
      }


      const restaurantId = cart[0].restaurantId;
      const restaurantDoc = await firestore()
        .collection('restaurants')
        .doc(restaurantId)
        .get();

      if (!restaurantDoc.exists) {
        throw new Error('Restaurant not found');
      }

      const { stripeAccountId } = restaurantDoc.data();

      if (!stripeAccountId) {
        throw new Error('Stripe account ID not found for this restaurant');
      }

      const response = await fetch('https://us-central1-campusmart-4a549.cloudfunctions.net/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          restaurantId: stripeAccountId,
        }),
      });

      const { clientSecret } = await response.json();

      return clientSecret;
    } catch (e) {
      console.error('Error fetching client secret:', e);
      throw new Error('Unable to process payment');
    }
  };


  const placeOrder = async () => {
    const currentUser = auth().currentUser;

    try {
      if (!currentUser) {
        Alert.alert('Failed', 'User not authenticated');
        return;
      }

      const requiredFields = ['street', 'city'];
      const missingFields = requiredFields.filter(field => !user?.address?.[field]);

      if (missingFields.length > 0) {
        Alert.alert(
          'Incomplete Address',
          'Please complete your address before placing an order.',
          [
            {
              text: 'Go to Address',
              onPress: () =>
                navigate('editProfile', {
                  option: 'address',
                  title: 'Address',
                }),
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
        return;
      }

      if (!cardDetails?.complete) {
        Alert.alert('Invalid Card', 'Please enter complete card details.');
        return;
      }

      onLoad();

      const clientSecret = await fetchPaymentIntentClientSecret();

      if (!clientSecret) {
        Alert.alert('Failed', 'Issue processing your request!');
        return;
      }


      // Step 2: Confirm the payment
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        console.error('Payment failed:', error);
        Alert.alert('Payment Failed', error.message);
        return;
      }

      if (paymentIntent?.status !== 'Succeeded' && paymentIntent?.status !== 'succeeded') {
        Alert.alert('Payment Failed', 'Unable to complete the payment.');
        return;
      }

      // Step 3: Store order after successful payment
      const orderData = {
        orderNumber: Math.floor(1000 + Math.random() * 9000).toString(),
        userId: currentUser.uid,
        restaurentId: cart[0].restaurantId,
        items: cart.map(item => ({
          id: item.id,
          itemName: item.itemName,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        deliveryAddress: user.address.street,
        totalAmount: total.toFixed(2),
        deliveryFee: deliveryFee,
        subtotal: subtotal,
        status: 'pending',
        createdAt: Timestamp.now(),
        paymentId: paymentIntent.id,
      };

      await firestore().collection('orders').add(orderData);

      Alert.alert('Success', 'Order placed successfully!');
      clearCart();

      navigate('Payment', { title: 'Payment', orderData: orderData });
    } catch (error) {
      console.error('Order Placement Error:', error);
      Alert.alert('Failed', 'Something went wrong. Please try again.');
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

  type BlockProps = {
    title: string;
    iconText: string;
    icon: ReactNode;
    desc: string;
    onPress?: () => void;
  };

  const Block = (props: BlockProps): React.JSX.Element => {
    const { colors } = useTheme();
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

  return (
    <Box flex={1} bg={colors.white}>
      <VStack gap={10} flex={1}>
        <Block
          title="Delivery Address"
          iconText="Home"
          onPress={() =>
            navigate('editProfile', { option: 'address', title: 'Address' })
          }
          desc={
            user?.address?.street +
            ', ' +
            user?.address?.apartment +
            user?.address?.city +
            ' ' +
            user?.address?.postalCode
          }
          icon={<Icons.MapTag color={colors.primary} />}
        />
        <Divider bg={colors.gray1} />
        <VStack p={16}>
          <Text fontSize={16} fontWeight="$semibold" color="$black">
            Payment Method
          </Text>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              //   backgroundColor: colors.white,
              // textColor: '#000',
              borderWidth: 1,
              //   borderColor: colors.primary,
              borderRadius: 8,
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={setCardDetails}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
        </VStack>
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
              <Text fontSize={14} fontWeight="$light" color={colors.green}></Text>
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
          text={`Pay ${total.toFixed(2)}`}
          onPress={placeOrder}
        />
      </Box>
    </Box>
  );
};

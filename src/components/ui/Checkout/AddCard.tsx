import { Box, Center, HStack, VStack } from '@gluestack-ui/themed';
import { Image, ScrollView } from 'react-native';

import { useTheme } from '../../../theme/useTheme';
import { InputFiled, PrimaryButton } from '../../../components';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';


import Toast from 'react-native-toast-message';

export const AddCard = () => {
  const { colors } = useTheme();
  const { confirmSetupIntent, createPaymentMethod } = useStripe();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState<{
    complete: boolean;
    postalCode?: string;
  } | null>(null);

  const handleAddCard = async () => {
    if (!cardDetails?.complete) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter complete card details',
      });

      return;
    }

    setLoading(true);
    try {
      // 1. Create a Setup Intent on your backend
      const { data: { clientSecret } } = await axios.post('/payment-methods/create-setup-intent');

      // 2. Confirm the Setup Intent with Stripe
      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: '' + error.message
        });

      } else if (setupIntent) {

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Card saved successfully',
        });

        // Save payment method to user's account
        await axios.post('/payment-methods/save', {
          paymentMethodId: setupIntent.paymentMethodId,
          userId: auth().currentUser?.uid,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add card',
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg={colors.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack gap={16} flex={1}>
          <Center mt={15}>
            <Image
              source={require('../../../assets/images/CardHolder.png')}
              resizeMode="cover"
            />
          </Center>
          <VStack gap={16} p={16}>
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: colors.white,
                textColor: '#000',
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 8,
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 10,
              }}
              onCardChange={(cardDetails) => {
                setCardDetails(cardDetails);
              }}
            />
            <PrimaryButton
              variant="primary"
              text="Add Card"
              onPress={handleAddCard}
              isLoading={loading}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};
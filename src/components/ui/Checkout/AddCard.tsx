import {Box, Center, HStack, VStack} from '@gluestack-ui/themed';
import {Image, ScrollView} from 'react-native';

import {useTheme} from '../../../theme/useTheme';
import {InputFiled, PrimaryButton} from '../../../components';
import {Icons} from '../../../assets/icons';

export const AddCard = () => {
  const {colors} = useTheme();

  return (
    <Box flex={1} bg={colors.background}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack gap={16} flex={1}>
          <Center mt={15}>
            <Image
              source={require('../../../assets/images/CardHolder.png')}
              resizeMode="cover"
            />
          </Center>
          <VStack gap={16} p={16}>
            <InputFiled
              label="Card Number"
              type="text"
              icon={<Icons.Card />}
              placeholder="1234 5678 9012 3456"
            />
            <InputFiled
              label="Cardholder Name"
              type="text"
              placeholder="Name on card"
            />
            <HStack gap={10}>
              <InputFiled label="Expiry Date" type="text" placeholder="MM/YY" />
              <InputFiled
                label="CVV"
                type="text"
                icon={<Icons.CircleQuetion />}
                placeholder="123"
              />
            </HStack>
            <PrimaryButton
              variant="primary"
              text="Add Card"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

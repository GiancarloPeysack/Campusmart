import {Box} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';
import { Payment } from '../../../components/ui/Checkout/Payment';

export const PaymentScreen = (props: any): React.JSX.Element => {
  const {title,orderData} = props.route.params;
  const {colors} = useTheme();

  return (
    <Box flex={1} bg={colors.white}>
      <Payment title={title} orderData={orderData} onNavigate={()=>props.navigation.navigate('Food')}/>
    </Box>
  );
};

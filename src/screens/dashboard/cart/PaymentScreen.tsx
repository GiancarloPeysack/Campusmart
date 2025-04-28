import {Box} from '@gluestack-ui/themed';
import React from 'react';

import {Checkout} from '../../../components';
import {useTheme} from '../../../theme/useTheme';
import { Payment } from '../../../components/ui/Checkout/Payment';

export const PaymentScreen = (): React.JSX.Element => {
  const {colors} = useTheme();

  return (
    <Box flex={1} bg={colors.white}>
      <Payment />
    </Box>
  );
};

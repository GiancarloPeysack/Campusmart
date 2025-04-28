import {Box} from '@gluestack-ui/themed';
import React from 'react';

import {Checkout} from '../../../components';
import {useTheme} from '../../../theme/useTheme';

export const CheckoutScreen = (): React.JSX.Element => {
  const {colors} = useTheme();

  return (
    <Box flex={1} bg={colors.white}>
      <Checkout />
    </Box>
  );
};

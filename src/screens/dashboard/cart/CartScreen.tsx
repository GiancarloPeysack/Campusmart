import {Box, Text, VStack} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import { Cart } from '../../../components';
import { useCart } from '../../../context/cart';

export default function CartScreen(): React.JSX.Element {
  const {colors} = useTheme();

  const {cart} = useCart();

  return (
    <Box flex={1} bg={colors.white}>
      <VStack gap={16} p={16} flex={1}>
        <Text color="$black" fontWeight="$semibold" fontSize={16}>
          Foods Items ({cart.length})
        </Text>
        <Cart/>
      </VStack>
    </Box>
  );
}

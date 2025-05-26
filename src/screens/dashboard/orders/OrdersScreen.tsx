import {ScrollView} from 'react-native';
import React from 'react';
import {Box, Text, VStack} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import {Card} from '../../../components';
import {navigate} from '../../../navigators/Root';
import useUserOrders from './hooks/useUserOrders';

export default function OrdersScreen(): React.JSX.Element {
  const {colors} = useTheme();

  const {orders, isLoading} = useUserOrders();

  if (isLoading) {
    return (
      <Box flex={1} p={16} bg={colors.white}>
        <Text fontSize={14} fontWeight="$light">
          Fetching data...
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg={colors.newBg}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack space="lg" p={16} flex={1}>
          {orders?.map((item: any, index: number) => {
            return (
              <Card
                createdAt={item.createdAt}
                orderNumber={item.orderNumber}
                orderStatus={item.status}
                onPress={() =>
                  navigate('OrderDetails', {title: 'Order Details', data: item})
                }
              />
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
}

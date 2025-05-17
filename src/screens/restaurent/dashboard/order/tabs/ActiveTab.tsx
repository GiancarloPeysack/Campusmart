import {Box, Center, Spinner, Text, VStack} from '@gluestack-ui/themed';
import {OrderCard} from '../../../../../components';
import {useTheme} from '../../../../../theme/useTheme';
import {useCallback, useEffect} from 'react';
import useOrder from '../hooks/useOrder';
import {RefreshControl, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export const ActiveTab = () => {
  const {colors} = useTheme();
  const {fetchOrder, orders, isLoading} = useOrder();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await fetchOrder('accepted');
      };
      fetchData();
    }, []),
  );

  const loadOrders = useCallback(async () => {
    await fetchOrder('accepted');
  }, [fetchOrder]);

  return (
    <Box bg={colors.light_blue} flex={1} p={16}>
      {isLoading && (
        <Center
          zIndex={999}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}>
          <Box bg="$white" p={6} rounded={8}>
            <Spinner color={colors.primary} size="large" />
          </Box>
        </Center>
      )}

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadOrders}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }>
        {orders?.length > 0 && (
          <VStack gap={15}>
            {orders.map((item: any, key: number) => {
              return (
                <OrderCard
                  key={key}
                  orderNumber={item.orderNumber}
                  list={item.items}
                  status={item.status}
                  total={item.totalAmount}
                  address={item.deliveryAddress}
                  phoneNumber={item.user.phoneNumber}
                  whatsappNumber={item.user.whatsapp}
                />
              );
            })}
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
};

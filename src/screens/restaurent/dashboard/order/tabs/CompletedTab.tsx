import {Box, Center, Spinner, Text, VStack} from '@gluestack-ui/themed';
import {useTheme} from '../../../../../theme/useTheme';
import {OrderCard} from '../../../../../components';
import useOrder from '../hooks/useOrder';
import {useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const CompletedTab = () => {
  const {colors} = useTheme();
  const {fetchOrder, orders, isLoading} = useOrder();


  useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          await fetchOrder('completed');
        };
        fetchData();
      }, []),
    );

  return (
    <Box bg={colors.newBg} flex={1} p={16}>
      {isLoading && (
        <Center
          zIndex={999}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}>
          <Box
            bg="$white"
            borderWidth={1}
            borderColor={colors.primary}
            p={6}
            rounded={8}>
            <Spinner color={colors.primary} size="large" />
          </Box>
        </Center>
      )}

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {orders?.length > 0 ? (
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
        ) : (
          <Text
            textAlign="center"
            fontWeight="$semibold"
            color="$black"
            fontStyle="italic">
            No completed orders
          </Text>
        )}
      </ScrollView>
    </Box>
  );
};

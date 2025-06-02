import {Box, Center, Spinner, Text, VStack} from '@gluestack-ui/themed';
import {Alert, ScrollView} from 'react-native';
import {DriverOrderCard} from '../../../../../components';
import {useTheme} from '../../../../../theme/useTheme';
import useDeliveries from '../hooks/useDeliveries';

export const DeliveredTab = () => {
  const {colors} = useTheme();

  const {delivered, isLoading, updateDeliveryStatus} =
    useDeliveries();

  return (
    <Box flex={1}>
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
        showsVerticalScrollIndicator={false}>
        <VStack p={16} space='md'>
          {delivered?.length > 0 ? (
            delivered.map((item: any, key: number) => {
              return (
                <DriverOrderCard
                  key={key}
                  orderNumber={item.order?.orderNumber}
                  cost={item.order?.totalAmount}
                  address={item.order?.deliveryAddress}
                  phoneNumber={item.user?.phoneNumber}
                  whastapp={item.user?.whatsapp}
                 
                  status={item.status}
                />
              );
            })
          ) : (
            <Text
              textAlign="center"
              fontWeight="$semibold"
              color="$black"
              fontStyle="italic">
              No delivered today
            </Text>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

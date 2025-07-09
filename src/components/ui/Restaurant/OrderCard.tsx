import {
  Box,
  Button,
  ButtonText,
  ClockIcon,
  Divider,
  HStack,
  PhoneIcon,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { Icons } from '../../../assets/icons';
import { ViewProps } from 'react-native';
import { MapPin } from '../../../assets/icons/MapPin';
import { formatRelativeTime } from '../../../utils/helper/time';
import { Timestamp } from '@react-native-firebase/firestore';

type Items = {
  itemName: string;
  price: string;
  quantity: number;
};

type Props = ViewProps & {
  orderNumber?: string;
  createdAt?: Timestamp;
  status: 'pending' | 'accepted' | 'completed';
  list: Items[];
  address: string;
  phoneNumber: string;
  whatsappNumber: string;
  total: string;
  onPress?: any;
};

export const OrderCard = ({
  orderNumber,
  createdAt,
  status,
  list = [],
  address,
  phoneNumber,
  whatsappNumber,
  total,
  onPress,
}: Props) => {
  return (
    <View bg="$white" p={17} rounded={12}>
      <HStack justifyContent="space-between">
        <HStack alignItems="center" gap={10}>
          <Icons.DineIn
            bgColor={
              status === 'pending'
                ? '#DBEAFE'
                : status === 'accepted'
                  ? '#FEF9C3'
                  : '#DBEAFE'
            }
            color={status === 'pending'
              ? '#2563EB'
              : status === 'accepted'
                ? '#CA8A04'
                : '#2563EB'}
          />
          <VStack gap={8}>
            <Text color="#000" fontWeight={600}>
              #{orderNumber}
            </Text>
            <HStack alignItems="center" gap={8}>
              <ClockIcon w={14} h={14} />
              <Text fontSize={14}>
                {formatRelativeTime(createdAt?.toDate())}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Box
          bg={
            status === 'pending'
              ? '#FFEDD5'
              : status === 'accepted'
                ? '#FEF9C3'
                : '#DCFCE7'
          }
          px={12}
          py={4}
          alignSelf="flex-start"
          rounded={24}>
          <Text
            textTransform="capitalize"
            fontSize={14}
            fontWeight={300}
            color={
              status === 'pending'
                ? '#EA580C'
                : status === 'accepted'
                  ? '#A16207'
                  : '#16A34A'
            }>
            {status === 'accepted' ? 'Ready to Assign' : status}
          </Text>
        </Box>
      </HStack>
      <VStack bg="#F9FAFB" rounded={8} mt={14} p={10} gap={10}>
        {list.map((item, key) => {
          return (
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="$black" fontSize={14}>
                {item.quantity}× {item.itemName}
              </Text>
              <Text color="$black" fontSize={14}>
                ${item.price}
              </Text>
            </HStack>
          );
        })}
      </VStack>
      <VStack mt={14} gap={10}>
        <HStack alignItems="center" gap={8}>
          <PhoneIcon color="#2563EB" h={16} w={16} />
          <Text fontWeight={300}>{phoneNumber}</Text>
          <Icons.Whatsapp />
          <Text fontWeight={300}>{whatsappNumber}</Text>
        </HStack>
        <HStack alignItems="center" gap={8}>
          <MapPin color="#2563EB" h={16} w={16} />
          <Text flex={1} fontWeight={300}>
            {address}
          </Text>
        </HStack>
      </VStack>
      <Divider my={14} />
      <HStack alignItems="center" justifyContent="space-between">
        <VStack gap={8}>
          <Text fontSize={14}>Total Amount</Text>
          <Text color="#000" fontWeight={600}>
            ${total}
          </Text>
        </VStack>
        {status === 'pending' || status === 'accepted' ? (
          <Button
            rounded={8}
            onPress={onPress}
            $active-opacity={0.8}
            h={36}
            px={10}
            bg={status === 'pending' ? '#DC2626' : '#EAB308'}>
            <ButtonText fontSize={14}>
              {status === 'pending' ? 'Accept Order' : 'Assign a Driver'}
            </ButtonText>
          </Button>
        ) : // <Text color="#16A34A">Waiting for Driver Response</Text>
          null}
      </HStack>
    </View>
  );
};

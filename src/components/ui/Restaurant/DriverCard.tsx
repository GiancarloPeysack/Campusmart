import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {Icons} from '../../../assets/icons';
import {Timestamp} from '@react-native-firebase/firestore';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import { formatRelativeTime } from '../../../utils/helper/time';

type Props = {
  image: string;
  name: string;
  status: 'pending' | 'on-delivery' | 'available';
  driverId?: string;
  newApplicant: boolean;
  orders?: number;
  createdAt: Timestamp;
  onPressAccept?: any;
  onPressDecline?: any
};

export const DriverCard = ({
  image,
  name,
  status,
  driverId,
  newApplicant,
  orders,
  createdAt,
  onPressAccept,
  onPressDecline
}: Props) => {
  return (
    <Box
      p={15}
      bg="$white"
      borderRadius={12}
      w="$full"
      shadowColor="#E5E7EB"
      shadowOpacity={0.8}
      shadowRadius={2}
      shadowOffset={{width: 0, height: 1}}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space="md">
          <Avatar >
            <AvatarFallbackText>{name}</AvatarFallbackText>
            <AvatarImage source={{uri: image}} />
          </Avatar>
          <VStack>
            <Heading size="sm" fontWeight="$medium">
              {name}
            </Heading>
           {newApplicant ?  <Text size="sm" color="#6B7280" fontWeight="$light">
              Applied: {formatRelativeTime(createdAt?.toDate())}
            </Text> :  <Text size="sm" color="#6B7280" fontWeight="$light">
              ID: #{driverId}
            </Text>}
          </VStack>
        </HStack>
        <VStack gap={5}>
          <Badge
            size="md"
            variant="solid"
            borderRadius="$full"
            action={
              status === 'pending'
                ? 'warning'
                : status === 'available'
                ? 'info'
                : 'success'
            }>
            <BadgeText fontWeight="$light">{status}</BadgeText>
          </Badge>
         {!newApplicant &&  <Text size="sm" color="#6B7280" fontWeight="$light">
            {orders || 0} orders today
          </Text>}
        </VStack>
      </HStack>
      {newApplicant ? (
        <HStack mt={20} alignItems="center" gap={5} justifyContent="flex-end">
          <PrimaryButton onPress={onPressDecline} variant='secondry' text='Decline' width={100} height={42} />
              <PrimaryButton  onPress={onPressAccept} variant='primary' text='Accept' height={42} />
        </HStack>
      ) : (
        <HStack mt={12} alignItems="center" gap={5} justifyContent="flex-end">
          <Icons.MessageSmall />
          <Text color="#2563EB" fontWeight="$light" fontSize={14}>
            Message Driver
          </Text>
        </HStack>
      )}
    </Box>
  );
};

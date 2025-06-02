import {Box, ClockIcon, HStack, Text, VStack} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import {Badge} from '../../common/Badge/Badge';
import {formatRelativeTime} from '../../../utils/helper/time';
import {PrimaryButton} from '../../common/Buttons/PrimaryButton';
import {Icons} from '../../../assets/icons';

type Props = {
  createdAt?: any;
  orderNumber?: string;
  restaurantName?: string;
  expectedDelivery?: string;
  orderStatus?: 'pending' | 'accepted' | 'delivered' | 'completed';
  onPress?: () => void;
};

export const Card = ({
  createdAt,
  orderStatus = 'delivered',
  restaurantName,
  orderNumber,
  expectedDelivery,
  onPress,
}: Props) => {
  const {colors} = useTheme();

  return (
    <VStack
      w="$full"
      bg={colors.white}
      p={16}
      rounded={8}
      gap={16}
      shadowColor="#E5E7EB"
      shadowOpacity={0.8}
      shadowRadius={2}
      shadowOffset={{width: 0, height: 1}}
      elevation={5}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontWeight="$bold" fontSize={14}>
          Order #{orderNumber}
        </Text>
        <Badge
          text={
            orderStatus === 'delivered'
              ? 'Delivered'
              : orderStatus === 'pending'
              ? 'Pending'
              : 'Accepted'
          }
          color={orderStatus === 'delivered' ? '#16A34A' : colors.primary}
          bg={orderStatus === 'delivered' ? '#F0FDF4' : '#DBEAFE'}
        />
      </HStack>
      <HStack space="md" alignItems="center">
        <ClockIcon w={14} h={14} />
        <Text fontSize={14} color={colors.gray5}>
          {formatRelativeTime(createdAt?.toDate())}
        </Text>
        <Text fontSize={14} color={colors.primary}>
          {restaurantName}
        </Text>
      </HStack>
      <Box
        h={44}
        rounded={8}
        bg={orderStatus === 'delivered' ? '#F0FDF4' : '#EFF6FF'}
        justifyContent="center"
        px={16}>
        <Text
          color={orderStatus === 'delivered' ? '#16A34A' : colors.primary}
          fontSize={14}>
          {orderStatus === 'delivered'
            ? 'Your order has been delivered successfully!'
            : 'Expected delivery in 30-45 minutes'}
        </Text>
      </Box>
      <HStack justifyContent="space-between" alignItems="center">
        <PrimaryButton
          onPress={onPress}
          text="Rate Order"
          variant="secondry"
          width={150}
          height={38}
          disabled={(orderStatus === 'pending' || orderStatus === 'accepted' || orderStatus === 'completed')}
        />
        <PrimaryButton
          onPress={onPress}
          text="Order Details"
          variant="primary"
          height={38}
          icon={<Icons.Bill />}
          bgColor="#3B82F6"
          width={150}
        />
      </HStack>
    </VStack>
  );
};

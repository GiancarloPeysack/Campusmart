import {
  Box,
  Center,
  CircleIcon,
  HStack,
  Link,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {Badge} from '../../common/Badge/Badge';
import {Icons} from '../../../assets/icons';
import {useTheme} from '../../../theme/useTheme';
import {PrimaryButton} from '../../common/Buttons/PrimaryButton';

type Props = {
  orderNumber?: string;
  cost?: string;
  address?: string;
  phoneNumber?: string;
  whastapp?: string;
  onPress?: any;
  status?: 'pending' | 'in_progress' | 'delivered';
};

export const DriverOrderCard = ({
  orderNumber,
  cost,
  address,
  phoneNumber,
  whastapp,
  status,
  onPress,
}: Props) => {
  const {colors} = useTheme();
  return (
    <Box
      p={15}
      bg="$white"
      borderRadius={8}
      w="$full"
      shadowColor="#E5E7EB"
      shadowOpacity={0.8}
      shadowRadius={2}
      shadowOffset={{width: 0, height: 1}}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={14} color="#000" fontWeight="$medium">
          #{orderNumber}
        </Text>
        {status === 'delivered' ? (
          <Badge text="Delivered" bg='#D1FAE5' color='#059669' />
        ) : (
          <Badge text={`$${cost || 0.0}`} color={colors.primary} bg="#DBEAFE" />
        )}
      </HStack>
      <VStack space="md" mt={10} mb={20}>
        <HStack alignItems="center" space="md">
          <Icons.MapPin />
          <Text fontSize={14} flex={1}>
            {address}
          </Text>
        </HStack>
        <HStack alignItems="center" space="sm">
          <Icons.Call />
          <Link>
            <Text
              fontSize={14}
              color={colors.primary}
              textDecorationLine="underline">
              {phoneNumber}
            </Text>
          </Link>
        </HStack>
        <HStack alignItems="center" space="sm">
          <Icons.Whatsapp />
          <Link>
            <Text
              fontSize={14}
              textDecorationLine="underline"
              color={colors.primary}>
              {whastapp}
            </Text>
          </Link>
        </HStack>
        {status === 'in_progress' && (
          <Center mt={15}>
            <HStack alignItems="center" space="sm">
              <Link $active-opacity={0.8}>
                <Badge
                  text="Live Tracking"
                  icon={<CircleIcon color={colors.white} w={10} />}
                  color={colors.white}
                  bg="#ED5151"
                />
              </Link>
            </HStack>
          </Center>
        )}
      </VStack>

      {(status === 'pending' || status === 'in_progress') && (
        <PrimaryButton
          onPress={onPress}
          text={status === 'pending' ? 'Accept Order' : 'Mark Delivered'}
          variant="primary"
          bgColor={status === 'pending' ? '#DC2626' : colors.primary}
          height={38}
        />
      )}
    </Box>
  );
};

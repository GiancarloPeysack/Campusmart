import {
  Box,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';
import { Image } from 'react-native';

type HCardProps = {
  title: string;
  description: string;
  image: string;
  onPress?: () => void;
  rate: number;
  price: string;
  discount_price: string;
  isFav?: boolean;
};
export const VCard = (props: HCardProps) => {
  const {colors} = useTheme();

  return (
    <Pressable
      bg="$white"
      borderColor="#E5E7EB"
      borderWidth={1}
      w={169}
      borderRadius={12}
      overflow="hidden"
      onPress={props.onPress}>
      <VStack>
        <Image
          source={{uri: props.image}}
          height={170}
          resizeMode="cover"
            style={{width: '100%'}}
          alt='card-image'
        />
        <HStack position="absolute" top={12} right={12} gap={10}>
          
          <Pressable
            bg={colors.white}
            w={32}
            h={32}
            rounded="$full"
            alignItems="center"
            justifyContent="center">
            <Icons.Heart color={props.isFav && colors.red} />
          </Pressable>
        </HStack>

        <VStack p={10} gap={10}>
          <Text fontSize={16} fontWeight="$bold" color="$black">
            {props.title}
          </Text>
          <HStack alignItems="center" gap={5}>
            <Text fontSize={16} fontWeight="$bold" color={colors.primary}>
              ${props.discount_price}
            </Text>
            <Text
              fontSize={14}
              fontWeight="$light"
              color={colors.gray3}
              textDecorationLine="line-through">
              ${props.price}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text flex={1} fontSize={12} fontWeight="$light" color="#4B5563" numberOfLines={1}>
              {props.description}
            </Text>
            <Box bg='#DCFCE7' rounded={12} px={4} py={4}>
            <Text fontSize={12} color={colors.green}>
              4.7 ★
            </Text>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
};

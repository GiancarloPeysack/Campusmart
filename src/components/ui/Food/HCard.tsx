import {
  Box,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import { Image } from 'react-native';

type HCardProps = {
  title: string;
  description: string;
  image: string;
  onPress?: () => void;
  discount: number;
  fullWidth?: boolean;
};

export const HCard = (props: HCardProps) => {
  const {colors} = useTheme();

  return (
    <Pressable
      bg="$white"
      borderColor="#E5E7EB"
      borderWidth={1}
      w={props.fullWidth ? 240 : 170}
      h={230}
      borderRadius={12}
      overflow="hidden"
      onPress={props.onPress}>
      <VStack>
        <Image
          source={{uri: props.image}}
          resizeMode="cover"
          height={144}
          style={{width: '100%'}}
          alt='card-image'
        />

        <Box
          bg={colors.red}
          py={6}
          px={8}
          rounded="$full"
          position="absolute"
          top={12}
          left={12}
          gap={25}>
          <Text fontSize={14} color={colors.white} fontWeight="$semibold">
            -{props.discount}% Students
          </Text>
        </Box>

        <VStack p={10}>
         <HStack alignItems='center' justifyContent='space-between'>
         <Text flex={1} fontSize={16} fontWeight="$bold" color="$black">
            {props.title}
          </Text>
          <Box bg='#DCFCE7' rounded={12} px={4} py={4}>
            <Text fontSize={12} color={colors.green}>
              Open Now
            </Text>
            </Box>
         </HStack>
          <Text mt={13} fontSize={14} fontWeight="$light" color="#4B5563" numberOfLines={1}>
            {props.description}
          </Text>
        </VStack>
      </VStack>
    </Pressable>
  );
};

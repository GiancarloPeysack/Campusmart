import {Box, HStack, Image, Pressable, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';

type CardProps = {
  title: string;
  image: string;
  description: string;
  price: string;
  onPress?: ()=> void;
};

export const ItemCard = (props: CardProps) => {
  const {colors} = useTheme();

  return (
   <Pressable onPress={props.onPress}>
     <Box borderWidth={1} borderColor={colors.gray1} bg={colors.white} p={17} rounded={12}>
      <HStack gap={16} justifyContent='space-between' alignItems='center'>
      <Image
          source={{uri: props.image}}
          resizeMode="cover"
          h={80}
          w={80}
          alt="card-image"
          rounded={8}
        />
        <VStack gap={8} flex={1}>
          <Text fontSize={16} fontWeight="$semibold" color="$black">
            {props.title}
          </Text>
          <Text fontSize={14} fontWeight="$light" color={colors.title}>
            {props.description}
          </Text>
          <Text fontSize={16} fontWeight="$semibold" color={colors.primary}>
            ${props.price}
          </Text>
          
        </VStack>
        
      </HStack>
    </Box>
   </Pressable>
  );
};

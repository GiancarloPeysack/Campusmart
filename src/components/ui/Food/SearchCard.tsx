import {Box, HStack, Image, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';

type CardProps = {
  title: string;
  image: string;
  description?: string;
  location: string;
};

export const SearchCard = (props: CardProps) => {
  const {colors} = useTheme();

  return (
    <Box borderWidth={1} borderColor={colors.gray1} p={17} rounded={12}>
      <HStack gap={16}>
        <Image
          source={{uri: props.image}}
          resizeMode="cover"
          h={96}
          w={96}
          alt="card-image"
          rounded={8}
        />
        <VStack gap={8}>
          <Text fontSize={16} fontWeight="$bold" color="$black">
            {props.title}
          </Text>
          <Text fontSize={12} color="#FACC15">
            ★{' '}
            <Text color="#4B5563" fontSize={12}>
              4.7
            </Text>
          </Text>

          <HStack alignItems="center" space="sm">
            <Icons.MapTag />
            <Text fontSize={14} fontWeight="$light" color="#4B5563">
              {props.location}
            </Text>
          </HStack>
          <HStack alignItems="center" space="sm">
            <Box bg="#DCFCE7" rounded={12} px={4} py={4} alignSelf="flex-start">
              <Text fontSize={12} color={colors.green}>
                Open Now
              </Text>
            </Box>
            <Text fontSize={12} fontWeight="$light" color="#4B5563">
              Until 10:00 PM
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

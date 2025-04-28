import {ScrollView} from 'react-native';
import React from 'react';
import {Box, Pressable, Text, VStack} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import { categories } from '../../../constant';

export default function MarketScreen(): React.JSX.Element {
  const {colors} = useTheme();


  return (
    <Box flex={1} bg={colors.white}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1} gap={20}>
          <Text color="$black" fontWeight="$bold" fontSize={20}>
            Category
          </Text>
          <Box flexWrap="wrap" flexDirection="row">
            {categories.map((item, index) => {
              return (
                <Pressable key={index}>
                  <Text>{item.category}</Text>
                </Pressable>
              );
            })}
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}

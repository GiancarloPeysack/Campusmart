import {ScrollView} from 'react-native';
import React from 'react';
import {Box, Pressable, Text, VStack} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import { categories } from '../../../constant';
import { Card } from '../../../components';

export default function NotificationScreen(): React.JSX.Element {
  const {colors} = useTheme();


  return (
    <Box flex={1} bg={colors.newBg}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        
          <VStack space='lg' p={16} flex={1}>
            {categories.map((item, index) => {
              return (
                <Card/>
              );
            })}
          </VStack>
        
      </ScrollView>
    </Box>
  );
}

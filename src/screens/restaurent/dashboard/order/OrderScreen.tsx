import {Box, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from '../../../../theme/useTheme';

export default function OrderScreen(): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Box flex={1} bg={colors.white}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack p={16} flex={1} gap={20}></VStack>
      </ScrollView>
    </Box>
  );
}

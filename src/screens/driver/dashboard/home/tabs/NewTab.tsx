import {Box, VStack} from '@gluestack-ui/themed';
import {ScrollView} from 'react-native';
import { DriverOrderCard } from '../../../../../components';
import { useTheme } from '../../../../../theme/useTheme';

export const NewTab = () => {
    const {colors} = useTheme();

  return (
    <Box flex={1} >
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
            <VStack  p={16}>
                <DriverOrderCard status='pending' />
            </VStack>
        </ScrollView>
    </Box>
  );
};

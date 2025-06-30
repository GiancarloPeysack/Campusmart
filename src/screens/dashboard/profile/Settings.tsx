import {
  Box,
  Center,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { useTheme } from '../../../theme/useTheme';
import { Alert, ScrollView } from 'react-native';

import auth from '@react-native-firebase/auth';


export const SettingsScreens = (): React.JSX.Element => {
  const { colors } = useTheme();

  const handleLogout = () => {
    try {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: async () => await auth().signOut() },
      ]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };




  return (
    <Box flex={1} bg={colors.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack gap={16} flex={1}>
          <Center h={152} bg={colors.white}>

            <Pressable mt={5} onPress={handleLogout} w={100}>
              <Text
                color={colors.primary}
                fontSize={14}
                textTransform="uppercase"
                textAlign="center">
                Logout
              </Text>
            </Pressable>
          </Center>

        </VStack>
      </ScrollView>
    </Box>
  );
};

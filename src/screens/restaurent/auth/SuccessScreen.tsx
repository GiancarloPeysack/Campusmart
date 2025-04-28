import {
  Box,
  Center,
  HStack,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';

import {useTheme} from '../../../theme/useTheme';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {navigate, navigateAndSimpleReset} from '../../../navigators/Root';
import {Icons} from '../../../assets/icons';

export default function SuccessScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();


  useEffect(()=>{
    setTimeout(()=>{
      navigateAndSimpleReset('home');
    },3000)
  },[])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>

            <Center gap={10} mb={34} flex={1} px={16}>
              <Icons.Success />

              <Text color="$black" fontSize={20} fontWeight={'$bold'}>
                Success
              </Text>
              <Text
                mt={9}
                textAlign="center"
                fontSize={14}
                fontWeight="$light"
                color={colors.title}>
                Congratulations, your account has been successfully created.
              </Text>
            </Center>
          
        </ScrollView>
        <Center mb={10}>
          <HStack gap={5}>
            <Text color={colors.title} fontSize={14} fontWeight="$light">
              Need help?
            </Text>
            <Pressable onPress={() => navigate('register')}>
              <Text fontSize={14} fontWeight="$light" color={colors.primary}>
                Contact Support
              </Text>
            </Pressable>
          </HStack>
        </Center>
      </Box>
    </KeyboardAvoidingView>
  );
}

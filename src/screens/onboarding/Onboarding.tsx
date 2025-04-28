import {
  Box,
  Center,
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../theme/useTheme';
import {Images} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {Icons} from '../../assets/icons';
import { navigate } from '../../navigators/Root';

export default function OnboardingScreen(): React.JSX.Element {
  const {colors, styles} = useTheme();

  return (
    <Box flex={1} bg={colors.background}>
      <Box px={16} mt={24}>
        <Center>
          <Images.Onboard />
          <Text mt={72} fontWeight={400} fontSize={18} color={colors.title}>
            Your University Marketplace
          </Text>
        </Center>
        <VStack mt={35}>
          <Text fontWeight={700} color={colors.title_1}>
            Select your university
          </Text>
          <Pressable
            onPress={()=> navigate('login')}
            shadowColor="$black"
            shadowOpacity={0.2}
            shadowOffset={{width: 0, height: 5}}
            borderLeftWidth={4}
            borderLeftColor={colors.primary}
            $active-opacity={0.5}
            mt={19}
            rounded={12}
            bg={colors.white}
            h={56}
            justifyContent="center"
            px={20}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={colors.title_1} fontWeight={500}>
                Constructor University
              </Text>
              <Icon as={ChevronRightIcon} color={colors.primary} size="lg" />
            </HStack>
          </Pressable>
          <Pressable
            onPress={()=> navigate('login')}
            shadowColor="$black"
            shadowOpacity={0.2}
            shadowOffset={{width: 0, height: 5}}
            borderLeftWidth={4}
            borderLeftColor={colors.secondary}
            $active-opacity={0.5}
            mt={12}
            rounded={12}
            bg={colors.white}
            h={56}
            justifyContent="center"
            px={20}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={colors.title_1} fontWeight={500}>
                Bremen University
              </Text>
              <Icon as={ChevronRightIcon} color={colors.secondary} size="lg" />
            </HStack>
          </Pressable>
        </VStack>
      </Box>

      <Box
        borderStyle="dashed"
        borderWidth={1}
        borderColor={colors.secondary}
        mt={12}
        rounded={5}
        p={16}>
        <VStack gap={20}>
          <Pressable
          onPress={()=> navigate('restLogin')}
          $active-opacity={0.8}
            overflow='hidden'
            rounded={12}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.primary, colors.secondary]} style={{width: '100%', height: 60, justifyContent: 'center', alignItems: 'center'}}>
              <HStack alignItems="center" gap={5}>
                <Icons.Shop />
                <Text fontSize={18} fontWeight={700} color={colors.white}>
                  Restaurant
                </Text>
              </HStack>
            </LinearGradient>
          </Pressable>
        </VStack>
      </Box>
    </Box>
  );
}

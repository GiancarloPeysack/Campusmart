import {
    ArrowRightIcon,
    Box,
    Center,
    HStack,
    Icon,
    Pressable,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import React, { useEffect } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { navigate } from '../../navigators/Root';
import { Icons } from '../../assets/icons';
import { useTheme } from '../../theme/useTheme';
import { CustomButton } from '../../components';

export default function RegisterSuccess(): React.JSX.Element {
    const { colors, styles } = useTheme();

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigateAndSimpleReset('home');
    //     }, 3000)
    // }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.flex}>
            <Box flex={1} bg={colors.background}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <VStack flex={1} justifyContent="center" padding={20}>
                        <Center gap={10} mb={60} px={16}>
                            <Icons.SuccessCheck />
                            <View
                                style={{
                                    backgroundColor: colors.greenLight,
                                    padding: 5,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                }}>
                                <Text color={colors.greenSuccess} fontSize={12}>
                                    Account Verified
                                </Text>
                            </View>

                            <Text color={colors.gray} fontSize={20} mt={10}>
                                Let's Set Up Your Profile
                            </Text>
                        </Center>
                        <CustomButton
                            text="Continue to Profile Setup"
                            icon={<Icon as={ArrowRightIcon} color={colors.white} />}
                            onPress={() => navigate('OnboardProfileEdit')}
                        />
                    </VStack>
                </ScrollView>
                <Center mb={10}>
                    <HStack gap={5}>
                        <Text color={colors.title} fontSize={14} fontWeight="$light">
                            Need help?
                        </Text>
                        <Pressable onPress={() => navigate('login')}>
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

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    Box,
    Text,
    VStack,
    Pressable,
    HStack,
    Icon,
    Image,
    ArrowLeftIcon,
    Center,
    ChevronRightIcon,
    Input,
    InputField,
} from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import { useTheme } from '../../../../theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import DocIcon from '../../../../assets/images/doc.png';
import InfoIcon from '../../../../assets/images/info.png';
import WorldIcon from '../../../../assets/images/world.png';
import CardIcon from '../../../../assets/images/CCard.png';
import DeleteIcon from '../../../../assets/images/delete.png';
import firestore from '@react-native-firebase/firestore';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import PrivacyPolicyScreen from '../../../dashboard/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../../../dashboard/TermsOfServiceScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n, { changeAppLanguage, getAppLang, loadAppLanguage } from '../../../../localization/i18n';


export default function SettingsScreen(props) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [feedback, setFeedback] = useState('');

    const bottomSheetRef = useRef(null);
    const [sheetType, setSheetType] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState<
        'English' | 'German'
    >('English');


    useEffect(() => {
        setSelectedLanguage(getAppLang() === 'en' ? 'English' : 'German')
    }, [])

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({ tabBarStyle: { display: 'none' } });
        return () => parent?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const openSheet = type => {
        setSheetType(type);
        bottomSheetRef.current?.open();
    };

    const closeSheet = () => {
        bottomSheetRef.current?.close();
        setSheetType(null);
    };

    const handleDeleteAccount = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
                await firestore().collection('users').doc(user.uid).update({
                    accountStatus: 'deleted',
                    deletedAt: firestore.FieldValue.serverTimestamp(),
                });
                setTimeout(async () => {
                    await auth().signOut();
                }, 500);

                Alert.alert('Account deleted.');
            }
        } catch (error) {
            console.error('Soft delete failed:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    const handleSendFeedback = async () => {
        if (!feedback.trim()) return;

        try {
            const user = auth().currentUser;
            await firestore()
                .collection('client_feedback')
                .add({
                    uid: user?.uid || null,
                    email: user?.email || null,
                    feedback: feedback.trim(),
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });

            setFeedback('');
            closeSheet('help');
            Alert.alert('Thank you!', 'Your feedback has been submitted.');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            Alert.alert('Error', 'Unable to send feedback. Try again later.');
        } finally {
            closeSheet('help');
        }
    };



    const toggleLanguage = async (lang) => {
        await changeAppLanguage(lang);
        setSelectedLanguage(lang === 'en' ? 'English' : 'German');
        Toast.show({ text1: `${lang} selected` });
        closeSheet();

        await loadAppLanguage();
        navigation.navigate('Home')
    };

    const renderSheetContent = () => {
        switch (sheetType) {
            case 'language':
                return (
                    <VStack p={20}>
                        <Text fontWeight="bold" fontSize="$lg" mb={12}>
                            {I18n.t('Language')}
                        </Text>
                        {['English', 'German'].map(lang => (
                            <Pressable
                                key={lang}
                                onPress={() => toggleLanguage(lang === 'English' ? 'en' : 'de')}
                                bg={selectedLanguage === lang ? '#E0ECFF' : 'transparent'}
                                p={10}
                                rounded={6}
                                mb={6}>
                                <Text
                                    fontSize="$md"
                                    color={selectedLanguage === lang ? '#2563EB' : '$black'}
                                    fontWeight={selectedLanguage === lang ? 'bold' : 'normal'}>
                                    {lang}
                                </Text>
                            </Pressable>
                        ))}
                    </VStack>
                );
            case 'payment':
                return (
                    <VStack p={20}>
                        <Text fontWeight="bold" fontSize="$lg" mb={12}>
                            {I18n.t('SetUpPayment')}
                        </Text>
                        <Text>Integrate Stripe or show saved cards here.</Text>
                    </VStack>
                );
            case 'help':
                return (
                    <VStack p={20}>
                        <Text fontWeight="bold" fontSize="$lg" mb={12}>
                            {I18n.t('HelpCenter')}
                        </Text>
                        <ScrollView contentContainerStyle={{ padding: 20 }}>
                            <Text fontSize={16} fontWeight="bold" marginBottom={10}>
                                We’d love your feedback!
                            </Text>
                            <Input
                                h={96}
                                bg={colors.gray6}
                                rounded={12}
                                py={10}
                                borderWidth={1}
                                $focus-borderColor={colors.primary}>
                                <InputField
                                    onChangeText={val => setFeedback(val)}
                                    multiline={true}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    defaultValue={feedback}
                                    placeholderTextColor="#ADAEBC"
                                />
                            </Input>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    backgroundColor: colors.primary,
                                    borderRadius: 5,
                                    paddingHorizontal: 20,
                                    height: 46,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                                onPress={handleSendFeedback}>
                                <Text style={{ color: '#fff' }}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </VStack>
                );
            case 'terms':
                return (
                    <VStack p={20} marginBottom={100}>
                        <Text fontWeight="bold" fontSize="$lg" mb={12}>
                            {I18n.t('T_Privacy')}
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <PrivacyPolicyScreen />
                            <TermsOfServiceScreen />
                        </ScrollView>
                    </VStack>
                );
            case 'delete':
                return (
                    <VStack p={20}>
                        <Text fontWeight="bold" fontSize="$lg" color="red" mb={12}>
                            <Text>{I18n.t('DeleteAccount')}</Text>
                        </Text>
                        <Text mb={16}>Are you sure? This action cannot be undone.</Text>
                        <Pressable
                            onPress={handleDeleteAccount}
                            bg="red"
                            p={12}
                            rounded={8}
                            alignItems="center">
                            <Text color="white" fontWeight="bold">
                                Yes, Delete My Account
                            </Text>
                        </Pressable>
                    </VStack>
                );
            default:
                return null;
        }
    };

    return (
        <Box flex={1} bg="white" px={16} pt={16}>
            <HStack alignItems="center" bg={colors.white} h={52}>
                <HStack flex={1} gap={10}>
                    <Pressable mt={2} onPress={() => props.navigation.goBack()}>
                        <Icon as={ArrowLeftIcon} color="$black" />
                    </Pressable>
                    <Text fontSize={18} fontWeight="$bold" color="$black">
                        Settings
                    </Text>
                </HStack>
            </HStack>

            <VStack gap={24}>
                {/* Account Section */}
                <VStack>
                    <Text color="gray" fontSize={14} mb={8}>
                        Account
                    </Text>
                    <Box bg="#F9FAFB" p={12} rounded={12}>
                        <Pressable
                            onPress={() => openSheet('language')}
                            paddingVertical={16}
                            paddingHorizontal={4}>
                            <HStack justifyContent="space-between">
                                <HStack>
                                    <Image
                                        source={WorldIcon}
                                        resizeMode="contain"
                                        height={16}
                                        width={16}
                                        marginTop={3}
                                    />
                                    <Text color={colors.gray} fontSize={14} marginLeft={10}>
                                        {I18n.t('Language')}
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Text color="#6B7280" fontSize={14}>
                                        {selectedLanguage}
                                    </Text>
                                    <Icon as={ChevronRightIcon} />
                                </HStack>
                            </HStack>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate('StripeConnect')}
                            paddingVertical={16}
                            paddingHorizontal={4}>
                            <HStack justifyContent="space-between">
                                <HStack>
                                    <Image
                                        source={CardIcon}
                                        resizeMode="contain"
                                        height={16}
                                        width={16}
                                        marginTop={3}
                                    />
                                    <Text color={colors.gray} fontSize={14} marginLeft={10}>
                                        {I18n.t('SetUpPayment')}
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Icon as={ChevronRightIcon} />
                                </HStack>
                            </HStack>
                        </Pressable>
                    </Box>
                </VStack>

                {/* Support Section */}
                <VStack>
                    <Text color="gray" fontSize={14} mb={8}>
                        Support
                    </Text>
                    <Box bg="#F9FAFB" p={12} rounded={12}>
                        <Pressable
                            onPress={() => openSheet('help')}
                            paddingVertical={16}
                            paddingHorizontal={4}>
                            <HStack justifyContent="space-between">
                                <HStack>
                                    <Image
                                        source={InfoIcon}
                                        resizeMode="contain"
                                        height={16}
                                        width={16}
                                        marginTop={3}
                                    />
                                    <Text color={colors.gray} fontSize={14} marginLeft={10}>
                                        {I18n.t('HelpCenter')}
                                    </Text>
                                </HStack>
                                <Icon as={ChevronRightIcon} />
                            </HStack>
                        </Pressable>
                        <Pressable
                            onPress={() => openSheet('terms')}
                            paddingVertical={16}
                            paddingHorizontal={4}>
                            <HStack justifyContent="space-between">
                                <HStack>
                                    <Image
                                        source={DocIcon}
                                        resizeMode="contain"
                                        height={16}
                                        width={16}
                                        marginTop={3}
                                    />
                                    <Text color={colors.gray} fontSize={14} marginLeft={10}>
                                        {I18n.t('T_Privacy')}
                                    </Text>
                                </HStack>
                                <Icon as={ChevronRightIcon} />
                            </HStack>
                        </Pressable>
                    </Box>
                </VStack>

                <Pressable
                    onPress={() => openSheet('delete')}
                    paddingVertical={10}
                    paddingHorizontal={4}>
                    <HStack p={12} justifyContent="space-between">
                        <HStack>
                            <Image
                                source={DeleteIcon}
                                resizeMode="contain"
                                height={16}
                                width={16}
                                marginTop={3}
                            />
                            <Text color={colors.gray} fontSize={14} marginLeft={10}>
                                {I18n.t('DeleteAccount')}
                            </Text>
                        </HStack>
                        <Icon as={ChevronRightIcon} />
                    </HStack>
                </Pressable>

                {/* Version */}
                <Center>
                    <Text color="#9CA3AF" fontSize={14}>
                        Version 1.0
                    </Text>
                </Center>
            </VStack>

            {/* Bottom Sheet */}
            <CustomBottomSheet
                ref={bottomSheetRef}
                height={sheetType === 'terms' ? 800 : 500}>
                {renderSheetContent()}
            </CustomBottomSheet>
        </Box>
    );
}

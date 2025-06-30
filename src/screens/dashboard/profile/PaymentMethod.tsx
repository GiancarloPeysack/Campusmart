import {
    Box,
    ChevronRightIcon,
    Divider,
    HStack,
    Icon,
    Text,
    VStack,
    Radio,
    RadioIcon,
    CircleIcon,
    useToast,
    RadioIndicator,
    RadioLabel,
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useLoading } from '../../../hooks/useLoading';
import { useTheme } from '../../../theme/useTheme';
import { PrimaryButton } from '../../../components';
import { Icons } from '../../../assets/icons';
import { Pressable } from 'react-native';
import { navigate } from '../../../navigators/Root';
import { RadioGroup } from '@gluestack-ui/themed';

export const PaymentMethod = (): React.JSX.Element => {
    const { colors } = useTheme();
    const { loading } = useAuth();
    const { isLoading, onLoad, onLoaded } = useLoading();

    const toast = useToast();
    const [savedCards, setSavedCards] = useState<any[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

    useEffect(() => {
        if (auth().currentUser) {
            const unsubscribe = firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('cards')
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    const cards = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setSavedCards(cards);

                    const defaultCard = cards.find(card => card.isDefault);
                    if (defaultCard) {
                        setSelectedCardId(defaultCard.id);
                    }
                });

            return () => unsubscribe();
        }
    }, [auth().currentUser]);

    const handleContinue = async () => {
        try {
            if (!selectedCardId || !auth().currentUser) {
                toast.show({ type: 'error', text1: 'Please select a card' });
                return;
            }

            onLoad();

            const batch = firestore().batch();
            const userCardsRef = firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('cards');

            savedCards.forEach(card => {
                const ref = userCardsRef.doc(card.id);
                batch.update(ref, { isDefault: card.id === selectedCardId });
            });

            await batch.commit();

            toast.show({
                type: 'success',
                text1: 'Default card updated successfully',
            });
        } catch (err) {
            console.error('Error updating default card:', err);
            toast.show({ type: 'error', text1: 'Something went wrong' });
        } finally {
            onLoaded();
        }
    };

    if (loading) {
        return (
            <Box flex={1} p={16} bg={colors.white}>
                <Text fontSize={14} fontWeight="$light">
                    Fetching data...
                </Text>
            </Box>
        );
    }

    return (
        <Box flex={1} bg={colors.white}>
            <VStack gap={10} p={20} flex={1}>
                <HStack justifyContent="space-between">
                    <Text fontSize={16} fontWeight="$semibold" color="$black">
                        Saved Payment Method
                    </Text>
                </HStack>

                <RadioGroup
                    value={selectedCardId}
                    onChange={val => setSelectedCardId(val)}>
                    {savedCards.map(item => (
                        <HStack
                            key={item.id}
                            space="md"
                            bg="#F9FAFB"
                            p={16}
                            borderRadius={10}
                            borderColor={selectedCardId === item.id ? '#2563EB' : '#E5E7EB'}
                            borderWidth={1}
                            mb={16}
                            alignItems="center"
                            justifyContent="space-between">
                            <HStack
                                alignItems="center"
                                w={'100%'}
                                justifyContent="space-between">
                                <HStack>
                                    <Icons.Card width={60} height={30} style={{ marginLeft: 10 }} />
                                    <VStack ml={10}>
                                        <Text fontSize={16} color="#374151">
                                            **** **** **** {item.cardNumber?.slice(-4)}
                                        </Text>
                                        <Text fontSize={14} color="#6B7280">
                                            Expires: {item.expiry}
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Radio
                                    value={item.id}
                                    size="sm"
                                    isInvalid={false}
                                    isDisabled={false}>
                                    <RadioIndicator>
                                        <RadioIcon as={CircleIcon} />
                                    </RadioIndicator>
                                </Radio>
                            </HStack>
                        </HStack>
                    ))}
                </RadioGroup>

                <Divider bg={colors.gray1} />

                <VStack p={16} gap={18}>
                    <Text fontSize={16} fontWeight="$semibold" color="$black">
                        Other Payment Methods
                    </Text>
                </VStack>

                <Pressable
                    onPress={() =>
                        navigate('addPaymentMethod', {
                            option: 'addPayment',
                            title: 'Add Payment Method',
                        })
                    }>
                    <HStack
                        space="md"
                        bg="#F9FAFB"
                        p={16}
                        borderRadius={10}
                        borderColor="#E5E7EB"
                        borderWidth={1}
                        mb={25}
                        justifyContent="space-between"
                        mt={10}>
                        <HStack justifyContent="center" alignItems="center">
                            <Icons.Card />
                            <Text fontSize={16} ml={10} color="#374151">
                                Add New Card
                            </Text>
                        </HStack>
                        <Icon as={ChevronRightIcon} />
                    </HStack>
                </Pressable>
            </VStack>

            <Box p={16}>
                <PrimaryButton
                    isLoading={isLoading}
                    text="Continue"
                    onPress={handleContinue}
                />
            </Box>
        </Box>
    );
};

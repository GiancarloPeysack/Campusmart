import React, { useEffect, useState } from 'react';
import {
    Box,
    VStack,
    Checkbox,
    CheckboxIndicator,
    CheckboxIcon,
    CheckboxLabel,
    CheckIcon,
    useToast,
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useLoading } from '../../../hooks/useLoading';
import CreditCardInput from './CreditCardInput/CreditCardInput';
import { CreditCardView } from 'react-native-credit-card-input';
import { PrimaryButton } from '../../../components';
import Toast from 'react-native-toast-message';


export const AddPaymentMethod = ({ route }: any): React.JSX.Element => {
    const { option } = route.params;
    const currentUser = auth().currentUser;

    const [userDetails, setUserDetails] = useState<any>(null);
    const [cardDetails, setCardDetails] = useState<any>(null);
    const [saveCard, setSaveCard] = useState(false);


    const { isLoading, onLoad, onLoaded } = useLoading();
    const { onLoad: onUpdate, onLoaded: onUpdated } = useLoading();


    useEffect(() => {
        if (userDetails?.paymentMethod) {
            setCardDetails(userDetails?.paymentMethod)
        }
    }, [userDetails?.paymentMethod])

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                onLoad();
                if (currentUser) {
                    const userDoc = await firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .get();

                    if (userDoc.exists) {
                        setUserDetails(userDoc.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                onLoaded();
            }
        };

        fetchUserDetails();
    }, []);

    const handleCardChange = (form: any) => {
        setCardDetails(form);
    };

    const handleSubmit = async () => {
        if (!cardDetails?.valid) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Card',
                text2: 'Please enter valid card details',
            });
            return;
        }

        try {
            onUpdate();

            const { number, name, expiry, cvc } = cardDetails.values;

            if (currentUser) {
                await firestore()
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('cards')
                    .add({
                        cardNumber: number,
                        cardHolder: name,
                        expiry,
                        cvv: cvc,
                        saved: saveCard,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    });

                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Card saved successfully',
                });
            }
        } catch (error) {
            console.error('Error saving card:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to save card',
            });
        } finally {
            onUpdated();
        }
    };

    return (
        <Box flex={1} bg="#fff" px={20} py={20}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Card Preview */}
                {cardDetails?.values && (
                    <VStack alignSelf="center" mb={20}>
                        <CreditCardView
                            focused={cardDetails.focused}
                            name={cardDetails.values.name}
                            number={cardDetails.values.number}
                            expiry={cardDetails.values.expiry}
                            cvc={cardDetails.values.cvc}
                        />
                    </VStack>
                )}

                {/* Input Form */}
                <CreditCardInput
                    onChange={handleCardChange}
                    inputStyle={{
                        borderWidth: 1,
                        borderColor: '#E5E5E5',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 16,
                        color: '#111827',
                        backgroundColor: '#FFF',
                    }}
                    labelStyle={{
                        color: '#374151',
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginBottom: 5,
                    }}
                    placeholderColor="#9CA3AF"
                />

                {/* Save Card Option */}
                <Checkbox
                    size="md"
                    isInvalid={false}
                    mt={20}
                    mb={20}
                    isChecked={saveCard}
                    onChange={() => setSaveCard(!saveCard)}
                    isDisabled={false}
                >
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} color="#fff" />
                    </CheckboxIndicator>
                    <CheckboxLabel> Save this card for future payments</CheckboxLabel>
                </Checkbox>

                {/* Submit */}
                <PrimaryButton
                    variant="primary"
                    text="Add Card"
                    isLoading={isLoading}
                    onPress={handleSubmit}
                />
            </ScrollView>
        </Box>
    );
};

import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    type TextStyle,
    type ViewStyle,
} from 'react-native';
import { useCreditCardForm } from '../../../../hooks/useCreditCardForm';


interface Props {
    autoFocus?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    placeholderColor?: string;
    labels?: {
        name: string;
        number: string;
        expiry: string;
        cvc: string;
    };
    placeholders?: {
        name: string;
        number: string;
        expiry: string;
        cvc: string;
    };
    onChange: (formData: any) => void;
    onFocusField?: (field: any) => void;
    testID?: string;
}

const s = StyleSheet.create({
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#374151',
    },
    input: {
        height: 48,
        fontSize: 16,
        paddingHorizontal: 12,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
        color: '#111827',
        // @ts-expect-error outlineWidth is for RN web
        outlineWidth: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    halfInput: {
        flex: 1,
    },
});

const CreditCardInput = (props: Props) => {
    const {
        autoFocus,
        style,
        labelStyle,
        inputStyle,
        placeholderColor = '#9CA3AF',
        labels = {
            name: 'Cardholder Name',
            number: 'Card Number',
            expiry: 'Expiry Date',
            cvc: 'CVV',
        },
        placeholders = {
            name: 'Name on card',
            number: '1234 5678 9012 3456',
            expiry: 'MM/YY',
            cvc: '123',
        },
        onChange = () => { },
        onFocusField = () => { },
        testID,
    } = props;

    const { values, onChangeValue } = useCreditCardForm(onChange);

    const numberInput = useRef<TextInput>(null);

    useEffect(() => {
        if (autoFocus) numberInput.current?.focus();
    }, [autoFocus]);

    return (
        <View style={[style]} testID={testID}>
            <View style={s.fieldContainer}>
                <Text style={[s.label, labelStyle]}>{labels.number}</Text>
                <TextInput
                    ref={numberInput}
                    keyboardType="numeric"
                    style={[s.input, inputStyle]}
                    placeholderTextColor={placeholderColor}
                    placeholder={placeholders.number}
                    value={values.number}
                    onChangeText={(v) => onChangeValue('number', v)}
                    onFocus={() => onFocusField('number')}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    testID="CC_NUMBER"
                />
            </View>

            <View style={s.fieldContainer}>
                <Text style={[s.label, labelStyle]}>{labels.name}</Text>
                <TextInput
                    style={[s.input, inputStyle]}
                    placeholderTextColor={placeholderColor}
                    placeholder={placeholders.name}
                    value={values.name}
                    onChangeText={(v) => onChangeValue('name', v)}
                    onFocus={() => onFocusField('name')}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    testID="CC_NAME"
                />
            </View>

            <View style={[s.row]}>
                <View style={[s.fieldContainer, s.halfInput]}>
                    <Text style={[s.label, labelStyle]}>{labels.expiry}</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={[s.input, inputStyle]}
                        placeholderTextColor={placeholderColor}
                        placeholder={placeholders.expiry}
                        value={values.expiry}
                        onChangeText={(v) => onChangeValue('expiry', v)}
                        onFocus={() => onFocusField('expiry')}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        testID="CC_EXPIRY"
                    />
                </View>

                <View style={[s.fieldContainer, s.halfInput]}>
                    <Text style={[s.label, labelStyle]}>{labels.cvc}</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={[s.input, inputStyle]}
                        placeholderTextColor={placeholderColor}
                        placeholder={placeholders.cvc}
                        value={values.cvc}
                        onChangeText={(v) => onChangeValue('cvc', v)}
                        onFocus={() => onFocusField('cvc')}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        testID="CC_CVC"
                    />
                </View>
            </View>
        </View>
    );
};

export default CreditCardInput;

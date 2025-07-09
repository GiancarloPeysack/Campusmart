import React from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    Pressable,
    Badge,
    Icon,
    ClockIcon,
    PhoneIcon,
} from '@gluestack-ui/themed';
import { Linking } from 'react-native';
import { MapPin } from '../../assets/icons/MapPin';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function OrderCard({ order, onPrimaryAction }) {
    const {
        id,
        status,
        timestamp,
        items,
        phone,
        address,
        total,
        whatsapp,
        onPress,
    } = order;

    const getStatusStyles = () => {
        switch (status) {
            case 'Pending':
                return { label: 'Pending', color: '#FBBF24', bg: '#FEF3C7' };
            case 'Ready to Assign':
                return { label: 'Ready to Assign', color: '#D97706', bg: '#FEF3C7' };
            default:
                return { label: status, color: '#6B7280', bg: '#F3F4F6' };
        }
    };

    const statusStyles = getStatusStyles();

    return (
        <Box
            bg="white"
            borderRadius={12}
            borderColor="#E5E7EB"
            borderWidth={1}
            p={16}
            mb={20}
            shadow={1}
        >
            {/* Header */}
            <HStack justifyContent="space-between" alignItems="center" mb={8}>
                <HStack alignItems="center" space="sm">
                    {/* <Icon as={FontAwesome} name="cutlery" size={16} color="#000" /> */}
                    <Text fontWeight="bold" fontSize="$md">#{id}</Text>
                </HStack>
                <Badge bg={statusStyles.bg} px={12} py={4} borderRadius={12}>
                    <Text color={statusStyles.color} fontSize="$xs" fontWeight="bold">
                        {statusStyles.label}
                    </Text>
                </Badge>
            </HStack>

            {/* Time */}
            <HStack alignItems="center" space="sm" mb={12}>
                {/* <Icon as={ClockIcon} size={14} color="#6B7280" /> */}
                <Text fontSize="$xs" color="#6B7280">{timestamp}</Text>
            </HStack>

            {/* Items */}
            <VStack space="xs" mb={12}>
                {items.map((item, index) => (
                    <HStack key={index} justifyContent="space-between">
                        <Text>{item.quantity}× {item.name}</Text>
                        <Text>${item.price?.toFixed(2)}</Text>
                    </HStack>
                ))}
            </VStack>

            {/* Contact */}
            <HStack alignItems="center" space="md" mb={8}>
                <Pressable onPress={() => Linking.openURL(`tel:${phone}`)}>
                    {/* <Icon as={PhoneIcon} size={16} color="#2563EB" /> */}
                </Pressable>
                <Pressable onPress={() => Linking.openURL(`https://wa.me/${whatsapp}`)}>
                    {/* <Icon as={FontAwesome} name="whatsapp" size={16} color="#22C55E" /> */}
                </Pressable>
            </HStack>

            {/* Address */}
            <HStack alignItems="center" space="sm" mb={12}>
                {/* <Icon as={MapPin} size={14} color="#6B7280" /> */}
                <Text color="#6B7280" fontSize="$sm">{address}</Text>
            </HStack>

            {/* Footer */}
            <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold" fontSize="$md">Total Amount</Text>
                <Text fontWeight="bold" fontSize="$md">${total?.toFixed(2)}</Text>
            </HStack>

            {/* Button */}
            <Pressable
                mt={12}
                bg={status === 'Pending' ? '#DC2626' : '#FACC15'}
                p={12}
                borderRadius={8}
                alignItems="center"
                onPress={onPrimaryAction}
            >
                <Text color="white" fontWeight="bold">
                    {status === 'Pending' ? 'Accept Order' : 'Assign a Driver'}
                </Text>
            </Pressable>
        </Box>
    );
}

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../../../context/cart';

const CartModal = ({
    onContinueShopping,
    onViewCart,
    onClose,
}) => {
    const { cart } = useCart();

    const itemsInCart = cart.length;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Added to Cart!</Text>

            {cart.map((item, index) => (
                <View key={item.id} style={styles.itemRow}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                    <View style={styles.itemInfo}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                        </View>
                        <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                        <Text style={styles.itemSize}>Regular Size</Text>

                        <View style={styles.optionsRow}>
                            {/* You can render options if available in your data */}
                        </View>
                    </View>
                </View>
            ))}

            <View style={styles.cartSummary}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Items in Cart</Text>
                    <Text style={styles.summaryValue}>{itemsInCart}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Cart Total</Text>
                    <Text style={styles.summaryTotal}>${total.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.continueButton} onPress={onContinueShopping}>
                    <Text style={styles.continueText}>Continue Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton} onPress={onViewCart}>
                    <Text style={styles.viewText}>View Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartModal;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 10,
    },
    closeText: {
        fontSize: 20,
        fontWeight: '600',

    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        // alignSelf: 'center',
    },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007AFF',
    },
    itemQty: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    itemSize: {
        fontSize: 14,
        color: '#666',
    },
    optionsRow: {
        flexDirection: 'row',
        marginTop: 6,
        flexWrap: 'wrap',
    },
    optionTag: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginTop: 4,
    },
    optionText: {
        fontSize: 12,
    },
    cartSummary: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    summaryTotal: {
        fontSize: 16,
        fontWeight: '700',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    continueButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    continueText: {
        color: '#007AFF',
        textAlign: 'center',
        fontWeight: '600',
    },
    viewButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    viewText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});

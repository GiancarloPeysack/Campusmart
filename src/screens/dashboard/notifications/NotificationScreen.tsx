import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Badge,
  Icon,
  Spinner,
  ClockIcon,
} from '@gluestack-ui/themed';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../../../theme/useTheme';
import { formatTime } from '../../../utils/helper/functions';
import ClipboardIcon from '../../../assets/clipboard.png'
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import { Star } from '../../../assets/icons/Star';
import auth from '@react-native-firebase/auth';

export default function NotificationScreen(props) {
  const { colors } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const ratingSheetRef = useRef(null);


  const openRatingSheet = (order) => {
    setSelectedOrder(order);
    setRating(order?.rating || 0); // preload if rating exists
    ratingSheetRef.current?.open();
  };

  const submitRating = async () => {
    if (!selectedOrder || rating === 0) return;

    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('User not authenticated');

      const orderDoc = await firestore()
        .collection('orders')
        .doc(selectedOrder.id)
        .get();

      const orderData = orderDoc.data();
      const alreadyRatedBy = orderData?.ratedBy?.userId;

      if (alreadyRatedBy === currentUser.uid) {
        Alert.alert('Already Rated', 'You have already rated this order.');
        return;
      }

      const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
      const userData = userDoc.data();

      const ratedBy = {
        userId: currentUser.uid,
        userName: `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim(),
        userAvatar: userData?.profilePicture || '',
      };

      await firestore()
        .collection('orders')
        .doc(selectedOrder.id)
        .update({
          rating,
          ratedBy,
          ratedAt: firestore.FieldValue.serverTimestamp(),
        });

      ratingSheetRef.current?.close();
      setSelectedOrder(null);
    } catch (err) {
      console.error('Failed to submit rating:', err);
      Alert.alert('Error', 'Failed to submit your rating. Please try again later.');
    }
  };


  useEffect(() => {
    const fetchOrdersWithRestaurants = async () => {
      const currentUserId = auth().currentUser?.uid;
      if (!currentUserId) return;

      try {
        const orderSnapshot = await firestore()
          .collection('orders')
          .where('userId', '==', currentUserId)
          .orderBy('createdAt', 'desc')
          .get();

        const orderData = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const restaurantIds = [
          ...new Set(orderData.map(order => order.restaurentId)),
        ];

        const restaurantDocs = await Promise.all(
          restaurantIds.map(id =>
            firestore().collection('restaurants').doc(id).get(),
          ),
        );

        const restaurantMap = {};
        restaurantDocs.forEach(doc => {
          if (doc.exists) {
            restaurantMap[doc.id] = doc.data();
          }
        });

        const enrichedOrders = orderData.map(order => ({
          ...order,
          restaurantInfo: restaurantMap[order.restaurentId],
        }));

        setOrders(enrichedOrders);
      } catch (err) {
        console.error('Error fetching orders/restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersWithRestaurants();
  }, []);


  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return { label: 'Order Accepted', bg: '#E0ECFF', color: '#2563EB' };
      case 'delivered':
        return { label: 'Delivered', bg: '#DCFCE7', color: '#15803D' };
      default:
        return { label: status, bg: '#F3F4F6', color: '#6B7280' };
    }
  };

  return (
    <Box flex={1} bg={colors.newBg} px={12} pt={12}>
      <HStack space="md" mb={12}>
        <Pressable
          onPress={() => setSelectedTab('all')}
          px={12}
          py={4}
          height={40}
          justifyContent='center'
          alignItems='center'
          bg={selectedTab.toLowerCase() === 'all' ? '#2563EB' : '#F3F4F6'}
          borderRadius={20}>
          <Text
            color={selectedTab.toLowerCase() === 'all' ? 'white' : '#6B7280'}
            fontWeight="bold">
            All
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab('unread')}
          px={12}
          py={4}
          height={40}
          justifyContent='center'
          alignItems='center'
          bg={selectedTab.toLowerCase() === 'unread' ? '#2563EB' : '#F3F4F6'}
          borderRadius={20}>
          <Text
            color={
              selectedTab.toLowerCase() === 'unread' ? 'white' : '#6B7280'
            }>
            Unread
          </Text>
        </Pressable>
      </HStack>

      {loading ? (
        <Spinner size="large" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="md">
            {selectedTab?.toLowerCase() === 'unread' && (
              <VStack space="md" mb={12} alignItems="center" mt={50}>
                <Text>no new notifications</Text>
              </VStack>
            )}
            {selectedTab?.toLowerCase() === 'all' &&
              orders.map(order => {
                const status = getStatusLabel(order.status);
                const isDelivered = order.status === 'delivered';
                const restaurant = order.restaurantInfo || {};
                const createdAt = order.createdAt
                  ? formatTime(order.createdAt)
                  : '';

                return (
                  <Box
                    key={order.id}
                    bg="white"
                    p={16}
                    borderRadius={12}
                    shadow={1}
                    borderWidth={1}
                    borderColor="#E5E7EB">
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text fontWeight="bold" fontSize="$md">
                        Order #{order.orderNumber}
                      </Text>
                      <Badge bg={status.bg} borderRadius={20} px={10}>
                        <Text
                          color={status.color}
                          fontWeight="bold"
                          fontSize="$sm">
                          {status.label}
                        </Text>
                      </Badge>
                    </HStack>

                    <HStack mt={6} alignItems="center" space="sm">
                      <Icon as={ClockIcon} size="sm" color="#6B7280" />
                      <Text fontSize="$sm" color="#6B7280">
                        {createdAt} •{' '}
                        <Text color="#2563EB">
                          {restaurant.nameOfRestaurent || 'Restaurant'}
                        </Text>
                      </Text>
                    </HStack>

                    <Box
                      mt={12}
                      p={12}
                      bg={isDelivered ? '#DCFCE7' : '#E0ECFF'}
                      borderRadius={10}>
                      <Text
                        fontSize="$sm"
                        color={isDelivered ? '#15803D' : '#2563EB'}>
                        {isDelivered
                          ? 'Your order has been delivered successfully!'
                          : 'Expected delivery in 30–45 minutes'}
                      </Text>
                    </Box>

                    <HStack mt={12} space="md" justifyContent="space-between">
                      {isDelivered && (
                        <Pressable
                          borderColor="#E5E7EB"
                          borderWidth={1}
                          px={16}
                          py={8}
                          justifyContent="center"
                          alignItems="center"
                          width={'46%'}
                          onPress={() => openRatingSheet(order)}
                          borderRadius={8}>
                          <Text fontSize="$sm">Rate Order</Text>
                        </Pressable>
                      )}
                      <Pressable
                        bg="#2563EB"
                        px={16}
                        py={8}
                        borderRadius={8}
                        flexDirection="row"
                        width={isDelivered ? '46%' : '100%'}
                        justifyContent="center"
                        alignItems="center"
                        onPress={() => {
                          props.navigation.navigate('OrderDetails', {
                            title: 'Order Details',
                            data: order,
                          });
                        }}>
                        <Image
                          resizeMode="contain"
                          source={ClipboardIcon}
                          style={{ width: 14, height: 14 }}
                        />
                        <Text color="white" ml={6} fontSize="$sm">
                          Order Details
                        </Text>
                      </Pressable>
                    </HStack>
                  </Box>
                );
              })}
          </VStack>
        </ScrollView>
      )}
      <CustomBottomSheet ref={ratingSheetRef}>
        <Box p={20}>
          <Text fontSize="$lg" fontWeight="bold" mb={12}>Rate Your Order</Text>

          <HStack justifyContent="center" mb={16} mt={20}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Icon
                  as={() => <Star color={rating >= star ? '#FBBF24' : '#E5E7EB'} size={40} />}
                  size="xl"
                  m={4}
                />
              </TouchableOpacity>
            ))}
          </HStack>

          <Pressable
            bg="#2563EB"
            py={12}
            mt={20}
            borderRadius={8}
            justifyContent="center"
            alignItems="center"
            onPress={submitRating}
          >
            <Text color="white" fontWeight="bold">Submit Rating</Text>
          </Pressable>
        </Box>
      </CustomBottomSheet>

    </Box>
  );
}

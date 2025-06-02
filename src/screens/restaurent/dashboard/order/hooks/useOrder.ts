import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function useOrder() {
  const [orders, setOrders] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOrder = async (status: string) => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const orderSnapshot = await firestore()
          .collection('orders')
          .where('restaurentId', '==', currentUser.uid)
          .where('status', '==', status)
          .get();

        const orderItems = await Promise.all(
          orderSnapshot.docs.map(async doc => {
            const orderData = doc.data();
            let userData = null;

            if (orderData.userId) {
              const userDoc = await firestore()
                .collection('users')
                .doc(orderData.userId)
                .get();
              userData = userDoc.exists ? userDoc.data() : null;
            }
            return {
              id: doc.id,
              ...orderData,
              user: userData,
            };
          }),
        );

        setOrders(orderItems);
      } else {
        setOrders(null);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (status: string, id: string) => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        await firestore()
        .collection('orders')
        .doc(id)
        .update({
          status: status,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {orders, isLoading, fetchOrder, updateOrderStatus};
}

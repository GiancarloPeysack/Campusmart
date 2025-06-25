import {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {set} from '@gluestack-style/react';
import {useFocusEffect} from '@react-navigation/native';

export default function useUserOrders() {
  const [orders, setOrders] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, []),
  );

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;

      if (currentUser) {
        const orderSnapshot = await firestore()
          .collection('orders')
          .where('userId', '==', currentUser.uid)
          .get();

        const orderItems = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

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
        await firestore().collection('orders').doc(id).update({
          status: status,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {orders, isLoading, updateOrderStatus};
}

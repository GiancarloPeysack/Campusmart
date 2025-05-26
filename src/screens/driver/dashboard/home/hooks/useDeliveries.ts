import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useDeliveries() {
  const [deliveries, setDeliveries] = useState<any>(null);
  const [inprogressDeliveries, setInprogressDeliveries] = useState<any>(null);
  const [delivered, setDelivered] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchDeliveries();
      fetchInProgress();
      fetchDelivered();
      return () => {
        setDeliveries(null);
        setInprogressDeliveries(null);
        setDelivered(null);
      }
    }, []),
  );

 const fetchDeliveries = async () => {
  try {
    setIsLoading(true);
    const currentUser = auth().currentUser;
    if (currentUser) {
      const deliverySnapshot = await firestore()
        .collection('deliveries')
        .where('driverId', '==', currentUser.uid)
        .where('status', '==', 'pending')
        .get();

    const deliveryItems = await Promise.all(
      deliverySnapshot.docs.map(async doc => {
        const deliveryData = doc.data();
        let orderData = null;
        let userData = null;
        
        if (deliveryData.orderId) {
          const orderDoc = await firestore()
            .collection('orders')
            .doc(deliveryData.orderId)
            .get();
          orderData = orderDoc.exists ? orderDoc.data() : null;

            if (orderData?.userId) {
              const userDoc = await firestore()
                .collection('users')
                .doc(orderData.userId)
                .get();
              userData = userDoc.exists ? userDoc.data() : null;
            }
        }

        return {
          id: doc.id,
          ...deliveryData,
          order: orderData,
          user: userData,
        };
      }),
    );
    setDeliveries(deliveryItems);

     
    } else {
      setDeliveries(null);
    }
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const fetchInProgress = async () => {
  try {
    setIsLoading(true);
    const currentUser = auth().currentUser;
    if (currentUser) {
      const deliverySnapshot = await firestore()
        .collection('deliveries')
        .where('driverId', '==', currentUser.uid)
        .where('status', '==', 'in_progress')
        .get();

    const deliveryItems = await Promise.all(
      deliverySnapshot.docs.map(async doc => {
        const deliveryData = doc.data();
        let orderData = null;
        let userData = null;
        
        if (deliveryData.orderId) {
          const orderDoc = await firestore()
            .collection('orders')
            .doc(deliveryData.orderId)
            .get();
          orderData = orderDoc.exists ? orderDoc.data() : null;

            if (orderData?.userId) {
              const userDoc = await firestore()
                .collection('users')
                .doc(orderData.userId)
                .get();
              userData = userDoc.exists ? userDoc.data() : null;
            }
        }

        return {
          id: doc.id,
          ...deliveryData,
          order: orderData,
          user: userData,
        };
      }),
    );
    setInprogressDeliveries(deliveryItems);
    fetchInProgress();
     
    } else {
      setInprogressDeliveries(null);
    }
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const fetchDelivered = async () => {
  try {
    setIsLoading(true);
    const currentUser = auth().currentUser;
    if (currentUser) {
      const deliverySnapshot = await firestore()
        .collection('deliveries')
        .where('driverId', '==', currentUser.uid)
        .where('status', '==', 'delivered')
        .get();

    const deliveryItems = await Promise.all(
      deliverySnapshot.docs.map(async doc => {
        const deliveryData = doc.data();
        let orderData = null;
        let userData = null;
        
        if (deliveryData.orderId) {
          const orderDoc = await firestore()
            .collection('orders')
            .doc(deliveryData.orderId)
            .get();
          orderData = orderDoc.exists ? orderDoc.data() : null;

            if (orderData?.userId) {
              const userDoc = await firestore()
                .collection('users')
                .doc(orderData.userId)
                .get();
              userData = userDoc.exists ? userDoc.data() : null;
            }
        }

        return {
          id: doc.id,
          ...deliveryData,
          order: orderData,
          user: userData,
        };
      }),
    );
    setDelivered(deliveryItems);
    fetchInProgress();
     
    } else {
      setDelivered(null);
    }
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

  const updateDeliveryStatus = async (status: string, deliveryId: string, driverId?: string, orderId?: string) => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        await firestore()
        .collection('deliveries')
        .doc(deliveryId)
        .update({
          status: status,
          lastDelivery: new Date()
        });

        if(status === 'delivered') {
          await firestore()
          .collection('orders')
          .doc(orderId)
          .update({
            status: 'delivered',
          });

          await firestore()
          .collection('drivers')
          .doc(driverId)
          .update({
            isAvailable: true,
          });
        }


        fetchDeliveries(); 
        fetchInProgress();
        fetchDelivered();
       
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };



  return {
    isLoading,
    fetchDeliveries,
    deliveries,
    updateDeliveryStatus,
    inprogressDeliveries,
    delivered
  };
}

import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useDriver() {
  const [drivers, setDrivers] = useState<any>(null);
  const [newApplicants, setNewApplicants] = useState<any>(null);
  const [activeDrivers, setActiveDrivers] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchNewApplicants();
      fetchActiveDrivers();
    }, []),
  );

  const fetchNewApplicants = async () => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const driverSnapshot = await firestore()
          .collection('drivers')
          .where('isRegistrationCompleted', '==', false)
          .where('restaurentId', '==', currentUser.uid)
          .get();

        const driverItems = await Promise.all(
          driverSnapshot.docs.map(async doc => {
            const driverData = doc.data();
            let userData = null;

            if (doc.id) {
              const userDoc = await firestore()
                .collection('users')
                .doc(doc.id)
                .get();
              userData = userDoc.exists ? userDoc.data() : null;
            }
            return {
              id: doc.id,
              ...driverData,
              user: userData,
            };
          }),
        );

        setNewApplicants(driverItems);
      } else {
        setNewApplicants(null);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActiveDrivers = async () => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const driverSnapshot = await firestore()
          .collection('drivers')
          .where('isRegistrationCompleted', '==', true )
          .where('restaurentId', '==', currentUser.uid)
          .get();

        const driverItems = await Promise.all(
          driverSnapshot.docs.map(async doc => {
            const driverData = doc.data();
            let userData = null;

            if (doc.id) {
              const userDoc = await firestore()
                .collection('users')
                .doc(doc.id)
                .get();
              userData = userDoc.exists ? userDoc.data() : null;
            }
            return {
              id: doc.id,
              ...driverData,
              user: userData,
            };
          }),
        );

        setActiveDrivers(driverItems);
      } else {
        setActiveDrivers(null);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllDrivers = async () => {
    try {
      setIsLoading(true);
      const driverSnapshot = await firestore().collection('restaurants').get();

      const restItems = driverSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDrivers(restItems);
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDriverRequest = async (status: boolean, id: string) => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        await firestore()
        .collection('drivers')
        .doc(id)
        .update({
          isRegistrationCompleted: status,
          isAvailable: status,
          driverId: status === true ?  `DR-${Math.floor(1000 + Math.random() * 9000).toString()}` : 'rejected'
        });
      }
      fetchNewApplicants();
      fetchActiveDrivers();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    fetchAllDrivers,
    newApplicants,
    drivers,
    activeDrivers,
    updateDriverRequest
  };
}

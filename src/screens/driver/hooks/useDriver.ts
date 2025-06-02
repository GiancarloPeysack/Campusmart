import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useDriver() {
  const [driver, setDriver] = useState<any>(null);
  const [drivers, setDrivers] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchDriver();
    }, []),
  );

 const fetchDriver = async () => {
  try {
    setIsLoading(true);
    const currentUser = auth().currentUser;
    if (currentUser) {
      const driverDoc = await firestore()
        .collection('drivers')
        .doc(currentUser.uid)
        .get();

      if (driverDoc.exists) {
        const driverData = driverDoc.data();
        let restaurentData = null;

        if (driverData?.restaurentId) {
          const restaurentDoc = await firestore()
            .collection('restaurants')
            .doc(driverData.restaurentId)
            .get();
          restaurentData = restaurentDoc.exists ? restaurentDoc.data() : null;
        }

        setDriver({
          ...driverData,
          restaurent: restaurentData, 
        });
      } else {
        setDriver(null);
      }
    } else {
      setDriver(null);
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
      const driverSnapshot = await firestore()
        .collection('restaurants')
        .get();

      const restItems = driverSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDrivers(restItems);
    } catch (error) {
          console.log("error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    driver,
    isLoading,
    fetchDriver,
    fetchAllDrivers,
    drivers,
  };
}

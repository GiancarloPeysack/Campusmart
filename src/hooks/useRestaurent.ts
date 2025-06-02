import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useRestaurent() {
  const [restaurent, setRestaurent] = useState<any>(null);
  const [restaurents, setRestaurents] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchRestaurent();
    }, []),
  );

  const fetchRestaurent = async () => {
    try {
      setIsLoading(true);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const restaurentDoc = await firestore()
          .collection('restaurants')
          .doc(currentUser.uid)
          .get();

        if (restaurentDoc.exists) {
          setRestaurent(restaurentDoc.data());
        } else {
          setRestaurent(null);
        }
      } else {
        setRestaurent(null);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllRestaurents = async () => {
    try {
      setIsLoading(true);
      const restaurentSnapshot = await firestore()
        .collection('restaurants')
        .get();

      const restItems = restaurentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurents(restItems);
    } catch (error) {
          console.log("error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    restaurent,
    isLoading,
    fetchRestaurent,
    fetchAllRestaurents,
    restaurents,
  };
}

import { useCallback, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function useRestaurents() {
  const [restaurents, setRestaurents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchRestaurents();
    }, []),
  );

  const fetchRestaurents = async () => {
    try {
      setIsLoading(true);

      const querySnapshot = await firestore().collection('restaurants').get();

      const restData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurents(restData);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch a single restaurant by ID
  const fetchRestaurantById = async (restaurantId: string) => {
    try {
      setIsLoading(true);

      const restaurantDoc = await firestore()
        .collection('restaurants')
        .doc(restaurantId)
        .get();

      if (restaurantDoc.exists) {
        return {
          id: restaurantDoc.id,
          ...restaurantDoc.data(),
        };
      } else {
        return null; // Restaurant not found
      }
    } catch (error) {
      console.error('Error fetching restaurant by ID:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async (restaurantId: string) => {
    try {
      setIsLoading(true);
      if (restaurantId) {
        const categoryDoc = await firestore()
          .collection('categories')
          .doc(restaurantId)
          .get();

        if (categoryDoc.exists) {
          return categoryDoc.data()?.categories || []
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { restaurents, isLoading, fetchRestaurents, fetchRestaurantById, fetchCategories };
}
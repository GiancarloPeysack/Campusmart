import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useCategory() {
  const [categories, setCategories] = useState<any>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const fetchCategory = async () => {
        try {
          setIsLoading(true);
          const currentUser = auth().currentUser;
          if (currentUser) {
            const categoryDoc = await firestore()
              .collection('categories')
              .doc(currentUser.uid)
              .get();

            if (categoryDoc.exists) {
              setCategories(categoryDoc.data()?.categories || []);
            } else {
              setCategories([]);
            }
          } else {
            setCategories([]); // No user, no categories
          }
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      };

      fetchCategory();
    }, []),
  );

  return {categories, isLoading};
}

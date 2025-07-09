import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function useCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return {categories, isLoading, refetch: fetchCategory};
}

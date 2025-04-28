import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useMenu() {
  const [menu, setMenu] = useState<any>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const fetchCategory = async () => {
        try {
          setIsLoading(true);
          const currentUser = auth().currentUser;
          if (currentUser) {
            const menuSnapshot = await firestore()
              .collection('menus')
              .where('userId', '==', currentUser.uid)
              .get();

            const menuItems = menuSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), 
            }));

            setMenu(menuItems);
          } else {
            setMenu([]);
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

  return {menu, isLoading};
}

import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function useMenus() {
  const [menus, setMenus] = useState<any>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const fetchMenus = async () => {
        try {
          setIsLoading(true);
          const currentUser = auth().currentUser;
          if (currentUser) {
            const menuSnapshot = await firestore()
              .collection('menus')
              .get();

            const menuItems = menuSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), 
            }));

            setMenus(menuItems);
          } else {
            setMenus([]);
          }
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      };

      fetchMenus();
    }, []),
  );

  const fetchMenusByRestaurantId = async (restaurantId: string) => {
    try {
      setIsLoading(true);

      const querySnapshot = await firestore()
        .collection('menus')
        .where('userId', '==', restaurantId)
        .get();

      const menuItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return menuItems;

    } catch (error) {
      console.error('Error fetching menus:', error);
     return [];

    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch a single menu by menuId
  const fetchMenuByMenuId = async (menuId: string) => {
    try {
      setIsLoading(true);

      const menuDoc = await firestore()
        .collection('menus')
        .doc(menuId)
        .get();

      if (menuDoc.exists) {
        return {
          id: menuDoc.id,
          ...menuDoc.data(),
        };
      } else {
        return null; // Menu not found
      }
    } catch (error) {
      console.error('Error fetching menu by ID:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };


  return {menus, isLoading, fetchMenusByRestaurantId, fetchMenuByMenuId};
}

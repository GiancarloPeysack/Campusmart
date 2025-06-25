import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<any>(null);
  const [isRegistrationCompleted, setIsRegistrationCompleted] =
    useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(firebaseUser => {
      setLoading(true);
      if (firebaseUser) {
        const userRef = firestore().collection('users').doc(firebaseUser.uid);
        const unsubscribeFirestore = userRef.onSnapshot(doc => {
          if (doc.exists) {
            const data = doc.data();
            if (data?.isVerified && data?.hasOnboarded) {
              setUser(data);
              setUserRole(data?.role);
              setIsRegistrationCompleted(data?.isRegistrationCompleted);
            }
          } else {
            setUser(null);
            setUserRole(null);
            setIsRegistrationCompleted(null);
          }
          setLoading(false);
        });

        return () => {
          unsubscribeFirestore();
        };
      } else {
        setUser(null);
        setUserRole(null);
        setIsRegistrationCompleted(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return {
    user,
    userRole,
    isRegistrationCompleted,
    loading,
  };
}

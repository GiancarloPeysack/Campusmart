import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [userRole, setUserRole] = useState<any>(null);
    const [isRegistrationCompleted, setIsRegistrationCompleted] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const subscribe = auth().onAuthStateChanged(async user =>{
            console.log('calling...');
            setLoading(true);
            if(user){
                const userDoc = await firestore().collection('users').doc(user.uid).get();

                if(userDoc.exists){
                    setUserRole(userDoc.data()?.role);
                    setIsRegistrationCompleted(userDoc.data()?.isRegistrationCompleted);
                    setUser(userDoc.data());
                }

            } else {
                setUser(null)
                setUserRole(null);
            }
            setLoading(false)
        })
        return subscribe;
    }, [])


    return { user, userRole, isRegistrationCompleted, loading };

}
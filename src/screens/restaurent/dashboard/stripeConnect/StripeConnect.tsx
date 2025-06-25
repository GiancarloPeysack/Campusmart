import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios, { AxiosError } from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { RouteProp } from '@react-navigation/native';


type StripeStatus = 'not_connected' | 'pending' | 'verified';

const StripeConnectScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stripeStatus, setStripeStatus] = useState<StripeStatus>('not_connected');
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const restaurantId = auth().currentUser?.uid || '';
  const [stripeAccountId, setStripeAccountId] = useState(null)

  // Check current connection status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const doc = await firestore().collection('restaurants').doc(restaurantId).get();
        const status = doc.data()?.stripeStatus as StripeStatus;

        setStripeAccountId(doc.data()?.stripeAccountId)
        if (status !== 'verified') {
          checkStripeStatus()
        }
        setStripeStatus(status || 'not_connected');
      } catch (error) {
        console.error('Firestore fetch error:', error);
      }
    };

    fetchStatus();

    // Deep link listener
    const handleDeepLink = (event: { url: string }) => {
      if (event.url.includes('onboarding_success')) {
        checkOnboardingCompletion();
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    // return () => Linking.removeEventListener('url', handleDeepLink);
  }, [restaurantId]);

  const checkOnboardingCompletion = async () => {
    setLoading(true);
    try {
      const doc = await firestore().collection('restaurants').doc(restaurantId).get();
      const status = doc.data()?.stripeStatus as StripeStatus;
      setStripeAccountId(doc.data()?.stripeAccountId)

      if (status === 'verified') {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Onboarding Incomplete', 'Please complete the Stripe onboarding process');
      }
    } catch (error) {
      console.error('Status check error:', error);
      Alert.alert('Error', 'Failed to verify Stripe status');
    } finally {
      setLoading(false);
    }
  };

  const connectStripe = async () => {
    if (!restaurantId) return;

    setLoading(true);
    try {
      const response = await axios.post<{ onboardingUrl: string }>(
        'https://us-central1-campusmart-4a549.cloudfunctions.net/api/restaurant/connect',
        {
          restaurantId,
          email: auth().currentUser?.email
        }
      );

      setOnboardingUrl(response.data.onboardingUrl);
      await Linking.openURL(response.data.onboardingUrl);
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;
      Alert.alert(
        'Connection Failed',
        axiosError.response?.data?.error || axiosError.message
      );
    } finally {
      setLoading(false);
    }
  };


  const checkStripeStatus = async () => {
    console.log('doc.data()', stripeAccountId)
    const response = await fetch('https://us-central1-campusmart-4a549.cloudfunctions.net/api/restaurant/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId: stripeAccountId,
      }),
    });
    const { status } = await response.json();

    const currentStatus = status ? 'verified' : 'not_connected';

    if (currentStatus === 'verified') {
      await firestore()
        .collection('restaurants')
        .doc(restaurantId)
        .update({
          stripeStatus: 'verified'
        });
    }

    setStripeStatus(currentStatus || 'not_connected');

  }

  if (stripeStatus === 'verified') {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.successText}>✓ Stripe Connected</Text>
          <Text style={styles.subText}>You can now receive payments</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Your Stripe Account</Text>
      <Text style={styles.subtitle}>
        To receive payments, link your Stripe account (takes 2 minutes)
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={connectStripe}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Connect with Stripe</Text>
        )}
      </TouchableOpacity>

      {onboardingUrl && (
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Linking.openURL(onboardingUrl)}
        >
          <Text style={styles.secondaryButtonText}>Continue Onboarding</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles remain the same as JSX version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#635BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#635BFF',
  },
  secondaryButtonText: {
    color: '#635BFF',
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#666',
  },
});

export default StripeConnectScreen;
import {
  Box,
  HStack,
  Icon,
  MailIcon,
  PhoneIcon,
  VStack,
} from '@gluestack-ui/themed';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useTheme} from '../../../theme/useTheme';
import {Icons} from '../../../assets/icons';
import {InputFiled, PrimaryButton} from '../../../components';
import {Alert, ScrollView} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useLoading} from '../../../hooks/useLoading';

interface Props {
  onPress?: () => void;
}

const Card: React.FC<PropsWithChildren<Props>> = ({children}) => {
  const {colors} = useTheme();
  return (
    <Box bg={colors.white} p={16} gap={16}>
      {children}
    </Box>
  );
};

export const EditProfileScreen = (props: any): React.JSX.Element => {
  const {colors} = useTheme();

  const {option} = props.route.params;

  const currentUser = auth().currentUser;
  const [userDetails, setUserDetails] = useState<any>(null);
  const {isLoading, onLoad, onLoaded} = useLoading();
  const {
    isLoading: updating,
    onLoad: onUpdate,
    onLoaded: onUpdated,
  } = useLoading();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        onLoad();
        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userDoc.exists) {
            setUserDetails(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        onLoaded();
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      onUpdate();
      if (currentUser) {
        if (option === 'contact') {
          await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .update({
              email: userDetails.email,
              phoneNumber: userDetails.phoneNumber,
              whatsapp: userDetails.whatsapp,
            });
          Alert.alert('Success', 'Profile updated successfully');
        } else if (option === 'address') {
          await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .update({
              address: {
                street: userDetails.address?.street || '',
                city: userDetails.address?.city || '',
                postalCode: userDetails.address?.postalCode || '',
                additionalNotes: userDetails.address?.additionalNotes || '',
                apartment: userDetails.address?.apartment || '',
              },
            });
          Alert.alert('Success', 'Address saved successfully');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      onUpdated();
    }
  };

  const updateAddressField = (field: string, text: string) => {
    setUserDetails(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: text,
      },
    }));
  };

  return (
    <Box flex={1} bg={colors.background}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <VStack gap={16} flex={1}>
          {option === 'contact' ? (
            <Card>
              <InputFiled
                label="Email Address"
                type="text"
                rightIcon={<Icon as={MailIcon} />}
                placeholder="sarah.j@constructor.university"
                value={userDetails?.email}
                defaultValue={userDetails?.email}
                onChangeText={text =>
                  setUserDetails({...userDetails, email: text})
                }
              />
              <InputFiled
                label="Phone Number"
                type="text"
                rightIcon={<Icon as={PhoneIcon} />}
                placeholder="+1 234 567 8900"
                value={userDetails?.phoneNumber}
                defaultValue={userDetails?.phoneNumber}
                onChangeText={text =>
                  setUserDetails({...userDetails, phoneNumber: text})
                }
              />
              <InputFiled
                label="Whatsapp Number"
                type="text"
                placeholder="Whatsapp"
                rightIcon={<Icons.Whatsapp />}
                value={userDetails?.whatsapp}
                defaultValue={userDetails?.whatsapp}
                onChangeText={text =>
                  setUserDetails({...userDetails, whatsapp: text})
                }
              />
              <HStack justifyContent="space-around" alignItems="center">
                <PrimaryButton
                  onPress={() => props.navigation.goBack()}
                  width="50%"
                  variant="secondry"
                  text="Cancel"
                />
                <PrimaryButton
                  width="50%"
                  variant="primary"
                  text="Save Changes"
                  isLoading={updating}
                  onPress={handleSubmit}
                />
              </HStack>
            </Card>
          ) : (
            <Card>
              <InputFiled
                label="Street Address"
                type="text"
                placeholder="Enter street address"
                value={userDetails?.address?.street}
                defaultValue={userDetails?.address?.street}
                onChangeText={text => updateAddressField('street', text)}
              />
              <InputFiled
                label="Apartment, suite, etc. (optional)"
                type="text"
                placeholder="Enter apartment or suite number"
                value={userDetails?.address?.apartment}
                defaultValue={userDetails?.address?.apartment}
                onChangeText={text => updateAddressField('apartment', text)}
              />
              <HStack gap={16}>
                <InputFiled
                  label="City"
                  type="text"
                  placeholder="Enter city"
                  value={userDetails?.address?.city}
                  defaultValue={userDetails?.address?.city}
                  onChangeText={text => updateAddressField('city', text)}
                />
                <InputFiled
                  label="Postal Code"
                  type="text"
                  placeholder="Enter postal code"
                  value={userDetails?.address?.postalCode}
                  defaultValue={userDetails?.address?.postalCode}
                  onChangeText={text => updateAddressField('postalCode', text)}
                />
              </HStack>
              <InputFiled
                label="Additional Notes (optional)"
                type="text"
                placeholder="Add delivery instructions"
                muliline
                value={userDetails?.address?.additionalNotes}
                defaultValue={userDetails?.address?.additionalNotes}
                onChangeText={text =>
                  updateAddressField('additionalNotes', text)
                }
              />

              <PrimaryButton
                variant="primary"
                text="Save Address"
                isLoading={updating}
                onPress={handleSubmit}
              />
            </Card>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
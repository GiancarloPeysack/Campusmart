import {
  Box,
  HStack,
  Icon,
  MailIcon,
  PhoneIcon,
  Text,
  Button,
  ButtonText,
  VStack,
  Switch,
} from '@gluestack-ui/themed';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useTheme } from '../../../theme/useTheme';
import { InputFiled, PrimaryButton } from '../../../components';
import { Platform, ScrollView } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useLoading } from '../../../hooks/useLoading';
import { Home } from '../../../assets/icons/Home';
import { MapPin } from '../../../assets/icons/MapPin';
import { Shop } from '../../../assets/icons/Shop';
import Toast from 'react-native-toast-message';

interface Props {
  onPress?: () => void;
}

const Card: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const { colors } = useTheme();
  return (
    <Box bg={colors.gray1} p={16} gap={16}>
      {children}
    </Box>
  );
};

export const EditProfileScreen = (props: any): React.JSX.Element => {
  const { colors } = useTheme();

  const { option } = props.route.params;

  const [selectedTab, setSelectedTab] = useState('Home');
  const [isDefault, setIsDefault] = useState(false);
  const [isEmailNotificationAllowed, setIsEmailNotificationAllowed] = useState(false);
  const [isSmsNotificationAllowed, setIsSmsNotificationAllowed] = useState(false);

  const currentUser = auth().currentUser;
  const [userDetails, setUserDetails] = useState<any>(null);
  const { isLoading, onLoad, onLoaded } = useLoading();
  const {
    isLoading: updating,
    onLoad: onUpdate,
    onLoaded: onUpdated,
  } = useLoading();

  const tabs = [
    {
      text: 'Home',
      icon: <Icon as={Home} color={colors.primary} w={14} h={14} />,
    },
    {
      text: 'Dorm',
      icon: <Icon as={Shop} color={colors.primary} w={16} h={16} />,
    },
    {
      text: 'Other',
      icon: <Icon as={MapPin} color={colors.primary} w={16} h={16} />,
    },
  ];

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

  useEffect(() => {
    setIsEmailNotificationAllowed(userDetails?.isEmailNotificationAllowed ?? false);
    setIsSmsNotificationAllowed(userDetails?.isSmsNotificationAllowed ?? false);
    setIsDefault(userDetails?.address?.isDefault ?? false)
    setSelectedTab(userDetails?.address?.addressType ?? 'Home')
  }, [userDetails])


  const handleSubmit = async () => {
    try {
      onUpdate();
      if (currentUser) {
        if (option === 'contact') {
          await firestore().collection('users').doc(currentUser.uid).update({
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            whatsapp: userDetails.whatsapp,
            isEmailNotificationAllowed: isEmailNotificationAllowed,
            isSmsNotificationAllowed: isSmsNotificationAllowed
          });


          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Profile updated successfully',
          });
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
                addressType: selectedTab,
                isDefault: isDefault,
              },
            });


          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Address saved successfully',
          });
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
    <Box flex={1} bg={colors.gray1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  setUserDetails({ ...userDetails, email: text })
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
                  setUserDetails({ ...userDetails, phoneNumber: text })
                }
              />

              <HStack justifyContent="space-between" alignItems="center" mt={10}>
                <Text color="$black" fontSize={18} fontWeight="$bold">
                  Notification Preferences
                </Text>
              </HStack>

              <HStack justifyContent="space-between" mb={10}>
                <HStack justifyContent="flex-start" alignItems="center">
                  <Icon as={MailIcon} color="#1D4ED8" mr={4} />
                  <Text color="$black" fontSize={16}>
                    Email Notifications
                  </Text>
                </HStack>
                <Switch
                  size="md"
                  value={isEmailNotificationAllowed}
                  isDisabled={false}
                  onToggle={() => setIsEmailNotificationAllowed(!isEmailNotificationAllowed)}
                />
              </HStack>
              <HStack justifyContent="space-between" mb={20}>
                <HStack justifyContent="flex-start" alignItems="center">
                  <Icon as={PhoneIcon} color="#1D4ED8" mr={4} />
                  <Text color="$black" fontSize={16}>
                    SMS Notifications
                  </Text>
                </HStack>
                <Switch
                  size="md"
                  value={isSmsNotificationAllowed}
                  isDisabled={false}
                  onToggle={() => setIsSmsNotificationAllowed(!isSmsNotificationAllowed)}
                />
              </HStack>
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
              <HStack justifyContent="flex-start" alignItems="center" mt={4}>
                <Text color="$black" fontSize={'$sm'} fontWeight={'$medium'}>
                  Address Type
                </Text>
              </HStack>
              <HStack space={10}>
                {tabs.map(tab => (
                  <Button
                    key={tab.text}
                    variant={selectedTab === tab.text ? 'solid' : 'outline'}
                    onPress={() => setSelectedTab(tab.text)}
                    rounded={5}
                    sx={{
                      borderWidth: 0,
                      backgroundColor:
                        selectedTab === tab.text ? colors.primary : '#fff',
                    }}
                    px={Platform.OS === 'ios' ? 12 : 20}
                    mx={10}>
                    {tab.icon}
                    <ButtonText
                      color={selectedTab === tab.text ? '#fff' : colors.title}
                      style={{ marginLeft: 2 }}>
                      {/* {icon} */}
                      {tab.text}
                    </ButtonText>
                  </Button>
                ))}
              </HStack>
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
              <HStack justifyContent="space-between" mb={20}>
                <VStack>
                  <Text color={colors.blackDark}>Set as Default Address</Text>
                  <Text color={colors.gray5} width={250}>
                    Use this address as your primary delivery location
                  </Text>
                </VStack>
                <Switch
                  size="md"
                  value={isDefault}
                  isDisabled={false}
                  // trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
                  // thumbColor={colors.neutral[50]}
                  // activeThumbColor={colors.neutral[50]}
                  // ios_backgroundColor={colors.neutral[300]}
                  onToggle={() => setIsDefault(!isDefault)}
                />
              </HStack>

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

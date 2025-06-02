import {Box, Button, ButtonText, HStack, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import {useTheme} from '../../../../theme/useTheme';
import {
  DateTime,
  InputFiled,
  PrimaryButton,
} from '../../../../components';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useLoading} from '../../../../hooks/useLoading';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useRestaurent from '../../../../hooks/useRestaurent';
import dayjs from 'dayjs';


export default function EditRestaurentProfile(props: any): React.JSX.Element {
  const {colors, styles} = useTheme();

  const {restaurent} = useRestaurent();

  const {onLoad, isLoading, onLoaded} = useLoading();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [restDetails, setRestDetails] = useState({
    nameOfRestaurent: '',
    bio: '',
  });

  const [openTime, setOpenTime] = useState<string | null>(null);
const [closeTime, setCloseTime] = useState<string | null>(null);
const [selectedTimeType, setSelectedTimeType] = useState<'open' | 'close' | null>(null);

  useEffect(() => {
    if (restaurent) {
      setRestDetails({
        nameOfRestaurent: restaurent.nameOfRestaurent,
        bio: restaurent.bio,
      });
      setOpenTime(restaurent.openTime);
      setCloseTime(restaurent.closeTime);
    }
  }, [restaurent]);

  const onSubmit = async () => {
    try {
      onLoad();
      const currentUser = auth().currentUser;
      const restaurentId = restaurent[0]?.id;

      if (currentUser) {
        await firestore()
          .collection('restaurants')
          .doc(currentUser?.uid)
          .update({
            nameOfRestaurent: restDetails.nameOfRestaurent,
            bio: restDetails.bio,
            openTime: openTime,
            closeTime: closeTime,
          });
        Alert.alert('Success', 'Changes saved successfully.');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      Alert.alert('Error', 'Failed to save changes.');
    } finally {
      onLoaded();
    }
  };

  const showDatePicker = (type: 'open' | 'close') => {
    setSelectedTimeType(type);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedTime = dayjs(date).format('hh:mm A');
  
    if (selectedTimeType === 'open') {
      setOpenTime(formattedTime);
    } else if (selectedTimeType === 'close') {
      setCloseTime(formattedTime);
    }
  
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <VStack gap={24} p={16}>
            <Box bg={colors.white} p={16} rounded={12}>
              <InputFiled
                value={restDetails?.nameOfRestaurent}
                defaultValue={restDetails?.nameOfRestaurent}
                onChangeText={text =>
                  setRestDetails({...restDetails, nameOfRestaurent: text})
                }
                label="Name of Restaurent"
                type="text"
                placeholder="e.g., Spicy Chicken Burger"
              />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
            <DateTime label="Open" value={openTime || ''} onPress={() => showDatePicker('open')} />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
            <DateTime label="Close" value={closeTime || ''} onPress={() => showDatePicker('close')} />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
              <InputFiled
                value={restDetails?.bio}
                defaultValue={restDetails?.bio}
                onChangeText={text =>
                  setRestDetails({...restDetails, bio: text})
                }
                type="text"
                isRequired
                muliline
                label="Bio"
                placeholder="Enter item description"
              />
            </Box>
            
          </VStack>
        </ScrollView>
        <Box
          bg={colors.white}
          p={16}
          borderColor={colors.gray1}
          borderWidth={1}>
          <HStack justifyContent="space-between">
            <PrimaryButton
              text="Cancel"
              width="50%"
              borderColor={colors.gray1}
              variant="outlined"
              onPress={() => props.navigation.goBack()}
            />
            <PrimaryButton
            onPress={onSubmit}
              text="Save"
              width="50%"
              variant="primary"
              isLoading={isLoading}
            />
          </HStack>
        </Box>
      </Box>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </KeyboardAvoidingView>
  );
}

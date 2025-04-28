import {
  AddIcon,
  ArrowRightIcon,
  Box,
  Button,
  ButtonText,
  Center,
  CheckIcon,
  ClockIcon,
  HelpCircleIcon,
  HStack,
  Icon,
  MailIcon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import {useTheme} from '../../../theme/useTheme';
import {navigate} from '../../../navigators/Root';
import {InputFiled, PrimaryButton} from '../../../components';
import {Icons} from '../../../assets/icons';

import auth from '@react-native-firebase/auth';
import firestore, {serverTimestamp} from '@react-native-firebase/firestore';
import {useLoading} from '../../../hooks/useLoading';

export default function CreateCategory(): React.JSX.Element {
  const {colors, styles} = useTheme();

  const {isLoading, onLoad, onLoaded} = useLoading();
  const [category, setCategory] = useState<string>("");

  const createCategory = async () => {

    try {
      onLoad();
      const currentUser = auth().currentUser;
      if (currentUser) {
        const categoryData = {categoryName: category}; // Create category object

        const categoryDocRef = firestore()
          .collection('categories')
          .doc(currentUser.uid);

         await categoryDocRef.set({
          categories: firestore.FieldValue.arrayUnion(categoryData),
        }, { merge: true });
        setCategory("");
        Alert.alert('Success', 'Category created successfully!');
        
      }
    } catch (error) {
      console.error('Error creating category:', error);
      Alert.alert('Error', 'Failed to create category.');
    } finally {
      onLoaded();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <VStack p={16} flex={1}>
          <InputFiled
          isRequired
            defaultValue={category}
            type="text"
            label="Category Name"
            placeholder="Enter category name"
            value={category}
            onChangeText={text => setCategory(text)}
          />
        </VStack>
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
            />
            <PrimaryButton
            onPress={createCategory}
            isLoading={isLoading}
              disabled={!category}
              text="Create Category"
              width="50%"
              variant="primary"
            />
          </HStack>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}

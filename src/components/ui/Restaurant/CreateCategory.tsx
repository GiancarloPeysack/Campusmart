import {
  Box,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useTheme } from '../../../theme/useTheme';
import { InputFiled, PrimaryButton } from '../../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useLoading } from '../../../hooks/useLoading';
import Toast from 'react-native-toast-message';


export default function CreateCategory(): React.JSX.Element {
  const { colors, styles } = useTheme();

  const { isLoading, onLoad, onLoaded } = useLoading();
  const [category, setCategory] = useState<string>("");

  const createCategory = async () => {

    try {
      onLoad();
      const currentUser = auth().currentUser;
      if (currentUser) {
        const categoryData = { categoryName: category }; // Create category object

        const categoryDocRef = firestore()
          .collection('categories')
          .doc(currentUser.uid);

        await categoryDocRef.set({
          categories: firestore.FieldValue.arrayUnion(categoryData),
        }, { merge: true });
        setCategory("");

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Category created successfully!',
        });

      }
    } catch (error) {

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create category.'
      });
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

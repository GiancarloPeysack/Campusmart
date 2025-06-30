import {
  AddIcon,
  Box,
  HStack,
  Icon,
  Input,
  InputField,
  InputSlot,
  Pressable,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';

import { useTheme } from '../../../theme/useTheme';
import {
  ImagePick,
  InputFiled,
  PrimaryButton,
  Selector,
} from '../../../components';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useApp from '../../../hooks/useCategory';

import auth from '@react-native-firebase/auth';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
import { useLoading } from '../../../hooks/useLoading';
import storage from '@react-native-firebase/storage';
import dayjs from 'dayjs';
import { Icons } from '../../../assets/icons';
import Toast from 'react-native-toast-message';


type FormData = {
  itemName: string;
  category: string;
  price: string;
  description: string;
};

interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: string;
}

const validation = yup.object({
  itemName: yup.string().required('name is required'),
  category: yup.string().required(),
  price: yup.string().required(),
  description: yup.string().required(),
});

export default function CreateMenu(): React.JSX.Element {
  const { colors, styles } = useTheme();

  const { categories } = useApp();

  const [imageSource, setImageSource] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [availability, setAvailability] = useState(true);
  const [extraOptions, setExtraOptions] = useState<ExtraOption[]>([]);

  const { onLoad, isLoading, onLoaded } = useLoading();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validation),
  });

  const triggerAlert = () => {
    Alert.alert(
      'Add New Photo',
      undefined,
      [
        {
          text: 'Take Photo',
          onPress: () => setImageSource('camera'),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => setImageSource('gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const onSubmit = async (values: FormData) => {
    try {
      onLoad();
      const currentUser = auth().currentUser;
      if (currentUser) {
        const timestamp = dayjs().unix();
        const reference = storage().ref(`menus/${timestamp}.jpg`);
        await reference.putFile(image);

        const downloadURL = await reference.getDownloadURL();

        const menuData = {
          userId: currentUser?.uid,
          itemName: values.itemName,
          category: values.category,
          price: values.price,
          description: values.description,
          image: downloadURL,
          availability: availability,
          extraOptions: extraOptions,
          createdAt: serverTimestamp(),
        };

        await firestore().collection('menus').add(menuData);

        reset();


        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Item saved successfully!',
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

  const addExtraOption = () => {
    setExtraOptions([
      ...extraOptions,
      {
        id: String(Date.now()), // Generate a unique ID
        name: '',
        description: '',
        price: '',
      },
    ]);
  };

  const removeExtraOption = (id: string) => {
    setExtraOptions(extraOptions.filter(option => option.id !== id));
  };

  const updateExtraOption = (
    id: string,
    field: 'name' | 'description' | 'price',
    value: string,
  ) => {
    setExtraOptions(
      extraOptions.map(option =>
        option.id === id ? { ...option, [field]: value } : option,
      ),
    );
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <Box flex={1} bg={colors.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <VStack gap={24} p={16}>
            <ImagePick
              onPress={triggerAlert}
              setSource={setImageSource}
              source={imageSource}
              setImage={setImage}
              image={image}
              type="dropzone"
              uploadImage={() => { }}
            />
            <Box bg={colors.white} p={16} rounded={12}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue={value}
                    isRequired
                    label="Item Name"
                    type="text"
                    placeholder="e.g., Spicy Chicken Burger"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.itemName ? true : false}
                    error={errors.itemName?.message}
                  />
                )}
                name="itemName"
              />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Selector
                    data={categories.map((item: any) => ({
                      label: item.categoryName,
                      value: item.categoryName,
                    }))}
                    placeholder="Select category"
                    isRequired
                    label="Category"
                    onBlur={onBlur}
                    onValueChange={onChange}
                    isInvalid={errors.category ? true : false}
                    error={errors.category?.message}
                  />
                )}
                name="category"
              />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    defaultValue={value}
                    isRequired
                    rightIcon={<Icons.Dollar />}
                    type="text"
                    label="Price"
                    placeholder="0.00"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.price ? true : false}
                    error={errors.price?.message}
                    keyboardType="decimal-pad"
                  />
                )}
                name="price"
              />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
              <VStack gap={16}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="$black" fontWeight="$medium">
                    Extra Options
                  </Text>
                  <Pressable onPress={addExtraOption} flexDirection="row" alignItems="center" gap={5}>
                    <Icon as={AddIcon} color={colors.primary} />
                    <Text color={colors.primary}>Add Option</Text>
                  </Pressable>
                </HStack>
                {extraOptions.map(option => (
                  <HStack
                    key={option.id}
                    px={13}
                    h={66}
                    rounded={8}
                    borderWidth={1}
                    borderColor="#E5E7EB"
                    alignItems="center"
                    justifyContent="space-between">
                    <VStack w={172} gap={4}>
                      <TextInput
                        autoCorrect={false}
                        style={{ fontSize: 14 }}
                        placeholder="Option name"
                        value={option.name}
                        onChangeText={text =>
                          updateExtraOption(option.id, 'name', text)
                        }
                      />
                      <TextInput
                        autoCorrect={false}
                        style={{ fontSize: 12 }}
                        placeholder="Option description (optional)"
                        value={option.description}
                        onChangeText={text =>
                          updateExtraOption(option.id, 'description', text)
                        }
                      />
                    </VStack>
                    <Input w={80} $focus-borderColor={colors.primary}>
                      <InputSlot pl={4}>
                        <Icons.Dollar />
                      </InputSlot>
                      <InputField
                        type="text"
                        keyboardType="decimal-pad"
                        placeholder="0.00"
                        value={option.price}
                        onChangeText={text =>
                          updateExtraOption(option.id, 'price', text)
                        }
                      />
                    </Input>
                    <Pressable onPress={() => removeExtraOption(option.id)}>
                      <Icons.Trash />
                    </Pressable>
                  </HStack>
                ))}
              </VStack>
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputFiled
                    type="text"
                    defaultValue={value}
                    isRequired
                    muliline
                    label="Description"
                    placeholder="Enter item description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    isInvalid={errors.description ? true : false}
                    error={errors.description?.message}
                  />
                )}
                name="description"
              />
            </Box>
            <Box bg={colors.white} p={16} rounded={12}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="$black" fontWeight="$medium">
                  Item Availability
                </Text>
                <Switch
                  size="sm"
                  value={availability}
                  onValueChange={e => setAvailability(e)}
                  isDisabled={false}
                />
              </HStack>
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
            />
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              text="Save Item"
              width="50%"
              variant="primary"
              isLoading={isLoading}
            />
          </HStack>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}

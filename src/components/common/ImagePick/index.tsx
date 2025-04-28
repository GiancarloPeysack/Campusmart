import {
  Box,
  Center,
  Image,
  Pressable,
  Spinner,
  Text,
  View,
} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {Icons} from '../../../assets/icons';
import {useTheme} from '../../../theme/useTheme';

type imagePickerProps = {
  onPress: () => void;
  source: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  type?: 'dropzone' | 'profile' | 'camera';
  isLoading?: boolean;
  uploadImage: (uri: string) => void;
};

export const ImagePick = ({
  onPress,
  setImage,
  source,
  setSource,
  image,
  type,
  isLoading,
  uploadImage,
}: imagePickerProps): React.JSX.Element => {
  const {colors} = useTheme();

  const pickImage = async () => {
    let result;

    try {
      result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
    } catch (error) {
      Alert.alert(
        'Image Unavailable',
        'Sorry, this image cannot be used. Please choose another.',
      );
      return;
    }

    if (!result.didCancel) {
      if (result.assets && result.assets.length > 0) {
        uploadImage(result.assets[0].uri || '');
        setImage(result.assets[0].uri || '');
      }
    }
  };

  const takeImage = async () => {
    let result;
    try {
      result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      });
    } catch (error) {
      Alert.alert(
        'Image Unavailable',
        'Sorry, this image cannot be used. Please choose another.',
      );
      return;
    }

    if (!result.didCancel) {
      if (result.assets && result.assets.length > 0) {
        uploadImage(result.assets[0].uri || '');
      }
    }
  };

  useEffect(() => {
    if (source === 'gallery') {
      pickImage();
      setSource('');
    } else if (source === 'camera') {
      takeImage();
      setSource('');
    }
  }, [source]);

  return type === 'dropzone' ? (
    <Pressable onPress={onPress}>
      <Box
        h={224}
        w="$full"
        borderWidth={2}
        rounded={12}
        borderStyle="dotted"
        borderColor="#BFDBFE"
        bg="#EFF6FF">
        {image ? (
          <Center flex={1}>
            <Image
              w={150}
              h={150}
              rounded={12}
              resizeMode="cover"
              source={{
                uri: image,
              }}
              alt="user profile"
            />
          </Center>
        ) : (
          <Center flex={1} gap={10}>
            <Icons.Camara />
            <Text color={colors.primary}>Tap to Upload Photo</Text>
            <Text color="#60A5FA" fontSize={14}>
              Maximum size: 5MB
            </Text>
          </Center>
        )}
      </Box>
    </Pressable>
  ) : type === 'camera' ? (
    <Pressable
      onPress={onPress}
      zIndex={999}
      $active-opacity={0.8}
      w={36}
      h={36}
      rounded={8}
      overflow="hidden"
      justifyContent="center"
      alignItems="center">
      <Icons.Camara fill={colors.white} width={20} height={17.5} />
      <View style={styles.overlay} />
    </Pressable>
  ) : (
    <Box w={64} h={64} rounded="$full" position="relative" zIndex={1}>
      {isLoading ? (
        <Center flex={1}>
          <Spinner color={colors.primary} />
        </Center>
      ) : (
        <Image
          rounded="$full"
          w={64}
          h={64}
          resizeMode="cover"
          source={{
            uri: image,
          }}
          alt="user profile"
        />
      )}

      <Pressable
        $active-opacity={0.8}
        onPress={onPress}
        w={24}
        h={24}
        rounded="$full"
        bg={colors.primary}
        position="absolute"
        zIndex={999}
        right={0}
        bottom={0}>
        <Center flex={1}>
          <Icons.Camara width={12} height={12} fill={colors.white} />
        </Center>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
});

import React, { useState } from 'react';
import {
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Badge,
    ScrollView,
    Icon,
    ArrowLeftIcon,
} from '@gluestack-ui/themed';
import { Image, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { InputFiled } from '../../../../components';
import { Icons } from '../../../../assets/icons';
import { useTheme } from '../../../../theme/useTheme';
import useAuth from '../../../../hooks/useAuth';
import auth from '@react-native-firebase/auth';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from '@gluestack-ui/themed';

import Toast from 'react-native-toast-message';

export default function CreatePost(props) {
    // const { postType } = props?.route?.params
    const { colors } = useTheme();
    const { user } = useAuth();
    const tagOptions = ['Sales', 'Chat', 'Housing'];

    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isPosting, setIsPosting] = useState(false);
    const [selectedTag, setSelectedTag] = useState(props?.route?.params?.postType ?? 'Sales');
    const [tagModalVisible, setTagModalVisible] = useState(false);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const pickImages = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 5,
            quality: 0.7,
        });

        if (result.didCancel) return;
        if (result.errorCode) {
            requestCameraPermission();
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: '' + result.errorMessage || 'Image selection failed'
            });

            return;
        }

        const assets = result.assets || [];
        for (const asset of assets) {
            if (asset.uri) await uploadImage(asset.uri);
        }
    };

    const uploadImage = async (uri: string) => {
        try {
            const filename = `${uuid.v4()}.jpg`;
            const reference = storage().ref(`community_posts/${filename}`);
            await reference.putFile(uri);
            const downloadURL = await reference.getDownloadURL();
            setImages(prev => [...prev, downloadURL]);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to upload image'
            });
        }
    };

    const handleSubmitPost = async () => {
        if (!description.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation',
                text2: 'Please enter a description.'
            });
            return;
        }

        setIsPosting(true);

        try {
            const body = {
                userId: auth().currentUser.uid,
                fullName: `${user?.firstName} ${user?.lastName}`,
                userAvatar: user?.profilePicture || '',
                description,
                images,
                postTags: selectedTag,
                visibility: 'public',
                createdAt: firestore.FieldValue.serverTimestamp(),
            }

            await firestore()
                .collection('community_posts')
                .add(body);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Post uploaded successfully!'
            });
            setDescription('');
            setImages([]);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to upload post.'
            });
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <Box flex={1} bgColor="white">
            <HStack
                justifyContent="space-between"
                alignItems="center"
                px={4}
                py={18}
                borderBottomWidth={1}
                borderColor="#E5E7EB">
                <Pressable onPress={() => props.navigation.navigate('Community')}>
                    <Icon
                        as={ArrowLeftIcon}
                        name="arrow-back"
                        size="xl"
                        ml={4}
                        color="black"
                    />
                </Pressable>
                <Text fontSize="$lg" fontWeight="bold">
                    Create Post
                </Text>
                <Pressable
                    onPress={handleSubmitPost}
                    disabled={isPosting}
                    bg="#D0E1FD"
                    px={22}
                    py={8}
                    borderRadius={20}>
                    <Text color="#2563EB" fontWeight="bold">
                        {isPosting ? 'Posting...' : 'Post'}
                    </Text>
                </Pressable>
            </HStack>

            <ScrollView px={4} py={2}>
                <HStack alignItems="center" mt={10} gap={3} m={20}>
                    <Image
                        source={{
                            uri:
                                user?.profilePicture ||
                                'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000',
                        }}
                        style={{ width: 60, height: 60, borderRadius: 40, margin: 5 }}
                    />
                    <VStack mt={4}>
                        <Text px={5} fontWeight="bold" fontSize="$xl">
                            {user?.firstName} {user?.lastName}
                        </Text>
                        <Pressable onPress={() => setTagModalVisible(true)} >
                            <Badge px={20} py={5} borderRadius={20} bgColor="#E0ECFF">
                                <Text color="#2563EB" fontSize="$lg">
                                    {selectedTag}
                                </Text>
                            </Badge>
                        </Pressable>
                    </VStack>
                </HStack>

                <Box mt={4} borderColor="#fff" m={10}>
                    <InputFiled
                        value={description}
                        onChangeText={text => setDescription(text)}
                        type="text"
                        isRequired
                        muliline
                        placeholder="Enter item description"
                    />
                </Box>

                <HStack justifyContent="space-between" mb={20} m={10}>
                    <Text fontSize="$xs" color="#6B7280">
                        Be respectful and helpful to others
                    </Text>
                    <Text fontSize="$xs" color="#6B7280">
                        {description.length}/500
                    </Text>
                </HStack>

                {/* Uploaded Image Preview */}
                {images.length > 0 && (
                    <HStack flexWrap="wrap" m={4}>
                        {images.map((uri, idx) => (
                            <Image
                                key={idx}
                                source={{ uri }}
                                style={{ width: 80, height: 80, borderRadius: 8, margin: 4 }}
                            />
                        ))}
                    </HStack>
                )}

                {/* Upload Image Box */}
                <Pressable
                    mt={4}
                    height={150}
                    borderWidth={1}
                    borderColor="#D1D5DB"
                    borderRadius={10}
                    borderStyle="dashed"
                    alignItems="center"
                    justifyContent="center"
                    py={6}
                    m={10}
                    onPress={pickImages}>
                    <Icon
                        as={() => <Icons.Camara w={32} h={32} fill={colors?.grey200} />}
                    />
                    <Text mt={2} fontSize="$sm" color="#4B5563">
                        Add photos to your post
                    </Text>
                    <Text fontSize="$xs" color="#9CA3AF">
                        Tap to upload images (max 5)
                    </Text>
                </Pressable>

                <HStack alignItems="center" m={10} mt={5}>
                    <Icon
                        as={Icons.MapTag}
                        name="globe-outline"
                        size="sm"
                        color="#6B7280"
                    />
                    <Text ml={2} fontSize="$sm" color="#6B7280">
                        Public
                    </Text>
                </HStack>

                <Box m={10} mt={4} bgColor="#E8F1FF" borderRadius={10} p={16}>
                    <HStack alignItems="center">
                        <Icon
                            as={Icons.MapTag}
                            name="information-circle-outline"
                            size="sm"
                            color="#2563EB"
                        />
                        <Text ml={2} fontWeight="bold" fontSize="$sm" color="#2563EB">
                            Posting Tips
                        </Text>
                    </HStack>
                    <Text mt={1} fontSize="$sm" color="#2563EB">
                        Add clear photos and detailed descriptions to get better responses
                        from the community.
                    </Text>
                </Box>
            </ScrollView>
            <Modal isOpen={tagModalVisible} onClose={() => setTagModalVisible(false)}>
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Text fontWeight="bold" fontSize="$lg">
                            Select Category
                        </Text>
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        {tagOptions.map(tag => (
                            <Pressable
                                key={tag}
                                onPress={() => {
                                    setSelectedTag(tag);
                                    setTagModalVisible(false);
                                }}
                                py={4}>
                                <Text fontSize="$md" color="#2563EB">
                                    {tag}
                                </Text>
                            </Pressable>
                        ))}
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </Box>
    );
}

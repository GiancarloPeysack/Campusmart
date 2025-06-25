import React from 'react';
import {
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Input,
    TextArea,
    Badge,
    ScrollView,
    Icon,
    ArrowLeftIcon,
} from '@gluestack-ui/themed';
import { Image } from 'react-native';
import useAuth from '../../../../hooks/useAuth';
import { InputFiled } from '../../../../components';
// import { Ionicons } from '@expo/vector-icons';

export default function CreatePost() {
    const { user, loading } = useAuth();

    console.log('user', user)
    return (
        <Box flex={1} bgColor="white">
            <HStack justifyContent="space-between" alignItems="center" px={4} py={20} borderBottomWidth={1} borderColor="#E5E7EB">
                <Pressable>
                    <Icon as={ArrowLeftIcon} name="arrow-back" size="xl" ml={4} color="black" />
                </Pressable>
                <Text fontSize="$lg" fontWeight="bold">Create Post</Text>
                <Pressable bg="#D0E1FD" px={20} py={4} borderRadius={20}>
                    <Text color="#2563EB" fontWeight="bold">Post</Text>
                </Pressable>
            </HStack>

            <ScrollView px={4} py={2}>
                <HStack alignItems="center" mt={2} gap={3} m={20}>
                    <Image
                        source={{ uri: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000' }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                    <VStack>
                        <Text fontWeight="bold" fontSize="$md">{user?.firstName} {user?.lastName}</Text>
                        <Badge px={3} py={1} borderRadius={20} bgColor="#E0ECFF">
                            <Text color="#2563EB" fontSize="$sm">Sales</Text>
                        </Badge>
                    </VStack>
                </HStack>

                {/* Input Area */}
                <Box mt={4} borderColor="#fff" m={10}>
                    <InputFiled
                        value={'restDetails?.bio'}
                        defaultValue={'What are you looking for/selling?'}
                        //    onChangeText={text =>
                        //     //  setRestDetails({...restDetails, bio: text})
                        //    }
                        type="text"
                        isRequired
                        muliline
                        // label="Bio"
                        placeholder="Enter item description"
                    />
                </Box>

                <HStack justifyContent="space-between" mt={20} mb={20} m={10}>
                    <Text fontSize="$xs" color="#6B7280">Be respectful and helpful to others</Text>
                    <Text fontSize="$xs" color="#6B7280">0/500</Text>
                </HStack>

                {/* Image Upload Boxes */}
                {[1, 2].map((_, idx) => (
                    <Pressable
                        key={idx}
                        mt={4}
                        borderWidth={1}
                        borderColor="#D1D5DB"
                        borderRadius={10}
                        borderStyle="dashed"
                        alignItems="center"
                        justifyContent="center"
                        py={6}
                    >
                        {/* <Icon as={Ionicons} name="camera-outline" size="xl" color="#9CA3AF" /> */}
                        <Text mt={2} fontSize="$sm" color="#4B5563">Add photos to your post</Text>
                        <Text fontSize="$xs" color="#9CA3AF">Tap to upload images (max 5MB)</Text>
                    </Pressable>
                ))}

                {/* Public Label */}
                <HStack alignItems="center" mt={5}>
                    {/* <Icon as={Ionicons} name="globe-outline" size="sm" color="#6B7280" /> */}
                    <Text ml={2} fontSize="$sm" color="#6B7280">Public</Text>
                </HStack>

                {/* Posting Tips */}
                <Box mt={4} bgColor="#E8F1FF" borderRadius={10} p={3}>
                    <HStack alignItems="center">
                        {/* <Icon as={Ionicons} name="information-circle-outline" size="sm" color="#2563EB" /> */}
                        <Text ml={2} fontWeight="bold" fontSize="$sm" color="#2563EB">Posting Tips</Text>
                    </HStack>
                    <Text mt={1} fontSize="$xs" color="#2563EB">
                        Add clear photos and detailed descriptions to get better responses from the community.
                    </Text>
                </Box>
            </ScrollView>
        </Box>
    );
}

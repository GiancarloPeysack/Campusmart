import React, { useEffect, useState } from 'react';
import {
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Icon,
    ArrowLeftIcon,
    ScrollView,
    Image,
    Spinner,
} from '@gluestack-ui/themed';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../../../../theme/useTheme';
import useAuth from '../../../../hooks/useAuth';
import { formatTime } from '../../../../utils/helper/functions';

import auth from '@react-native-firebase/auth';
import { Icons } from '../../../../assets/icons';
import { Dimensions } from 'react-native';

export default function LikeComment(props) {
    const { colors } = useTheme();
    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes');
    const [likes, setLikes] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth().currentUser?.uid) return;

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postsSnapshot = await firestore()
                    .collection('community_posts')
                    .where('userId', '==', auth().currentUser?.uid)
                    .get();

                const posts = postsSnapshot.docs;
                const likesData: any[] = [];
                const commentsData: any[] = [];

                for (const post of posts) {
                    const postId = post.id;
                    const postData = post.data();

                    for (const likerId of postData.likesBy || []) {
                        const userDoc = await firestore()
                            .collection('users')
                            .doc(likerId)
                            .get();
                        const userInfo = userDoc.data();

                        likesData.push({
                            postId,
                            userId: likerId,
                            fullName: `${userInfo?.firstName || ''} ${userInfo?.lastName || ''
                                }`,
                            profilePicture: userInfo?.profilePicture,
                            timeAgo: formatTime(postData.createdAt),
                        });
                    }

                    const commentsSnapshot = await firestore()
                        .collection('community_posts')
                        .doc(postId)
                        .collection('comments')
                        .orderBy('createdAt', 'desc')
                        .get();

                    for (const commentDoc of commentsSnapshot.docs) {
                        const commentData = commentDoc.data();
                        commentsData.push({
                            postId,
                            ...commentData,
                            timeAgo: formatTime(commentData.createdAt),
                        });
                    }
                }

                setLikes(likesData);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching activity:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user?.uid]);

    const renderLikes = () =>
        likes.map((like, index) => (
            <HStack
                key={index}
                alignItems="center"
                justifyContent="space-between"
                py={10}
                borderBottomWidth={1} borderBottomColor='#e7e7e7'>
                <HStack alignItems="center" space="md">
                    <Image
                        source={{ uri: like.profilePicture }}
                        alt="user"
                        width={40}
                        height={40}
                        borderRadius={20}
                    />
                    <VStack>
                        <Text bold>{like.fullName}</Text>
                        <Text fontSize="$sm" color="gray">
                            {like.timeAgo} liked your post
                        </Text>
                    </VStack>
                </HStack>
                <Text color="red" fontSize={20}>
                    ❤️
                </Text>
            </HStack>
        ));

    const renderComments = () =>
        comments.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1).map((comment, index) => (
            <HStack key={index} alignItems="flex-start" py={10} m={5} borderBottomWidth={1} borderBottomColor='#e7e7e7'>
                <Image
                    source={{ uri: comment.userAvatar }}
                    alt="user"
                    width={40}
                    height={40}
                    borderRadius={20}
                    mr={3}
                />
                <VStack flex={1}>
                    <HStack>
                        <HStack w={Dimensions.get('window').width - 90}>
                            <Text bold fontSize={14}>
                                {comment.userName}{' '}
                                <Text fontSize={14} style={{ fontWeight: '400' }}>
                                    commented on your post
                                </Text>
                            </Text>
                        </HStack>

                        <Icons.Message color={colors.primary} />
                    </HStack>
                    <Box bg="#F2F2F2" p={4} borderRadius={6} mt={1} >
                        <Text p={4}>"{comment.text}"</Text>
                    </Box>
                    <Text fontSize="$sm" color="gray" mt={1}>
                        {comment.timeAgo}
                    </Text>
                </VStack>
            </HStack>
        ));

    return (
        <Box flex={1} bg="white">
            {/* Header */}
            <HStack
                justifyContent="space-between"
                alignItems="center"
                px={4}
                py={18}
                borderBottomWidth={1}
                borderColor="#E5E7EB">
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Icon as={ArrowLeftIcon} size="xl" color="black" />
                </Pressable>
                <Text fontSize="$lg" bold>
                    Activity
                </Text>
                <Box width={24} />
            </HStack>

            {/* Tabs */}
            <HStack
                justifyContent="center"
                alignItems="center"
                py={3}
                borderBottomWidth={1}
                borderColor="#E5E7EB">
                <Pressable
                    flex={1}
                    alignItems="center"
                    onPress={() => setActiveTab('likes')}
                    borderBottomWidth={activeTab === 'likes' ? 2 : 0}
                    borderColor={colors.primary}
                    paddingVertical={10}>
                    <Text
                        fontSize="$md"
                        bold={activeTab === 'likes'}
                        color={activeTab === 'likes' ? colors.primary : 'gray'}>
                        Likes
                    </Text>
                </Pressable>
                <Pressable
                    flex={1}
                    alignItems="center"
                    onPress={() => setActiveTab('comments')}
                    borderBottomWidth={activeTab === 'comments' ? 2 : 0}
                    borderColor={colors.primary}
                    paddingVertical={10}>
                    <Text
                        fontSize="$md"
                        bold={activeTab === 'comments'}
                        color={activeTab === 'comments' ? colors.primary : 'gray'}>
                        Comments
                    </Text>
                </Pressable>
            </HStack>

            {/* Content */}
            <ScrollView px={4} py={4}>
                {loading ? (
                    <Spinner size="large" />
                ) : activeTab === 'likes' ? (
                    renderLikes()
                ) : (
                    renderComments()
                )}
            </ScrollView>
        </Box>
    );
}

// CommunityScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ButtonText,
  View,
  FavouriteIcon,
} from '@gluestack-ui/themed';
import { navigate } from '../../../navigators/Root';
import useAuth from '../../../hooks/useAuth';
import { formatTime } from '../../../utils/helper/functions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import CommentItem from '../../../components/comments/CommentItem';
import CommentInput from '../../../components/comments/CommentInput';

export default function CommunityScreen() {
  const currentUserId = auth().currentUser.uid;
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Sales');
  const [posts, setPosts] = useState([]);

  const tabs = ['Sales', 'Chat', 'Housing'];

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('community_posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async snapshot => {
        const postData = await Promise.all(
          snapshot.docs.map(async doc => {
            const data = doc.data();
            const userDoc = await firestore()
              .collection('users')
              .doc(data.userId)
              .get();
            const userData = userDoc.exists ? userDoc.data() : {};

            const commentsSnapshot = await firestore()
              .collection('community_posts')
              .doc(doc.id)
              .collection('comments')
              .get();

            return {
              id: doc.id,
              ...data,
              fullName: `${userData.firstName || ''} ${userData.lastName || ''}`,
              userAvatar: userData.profilePicture || '',
              commentsCount: commentsSnapshot.size,
              likes: data?.likes || 0,
              likesBy: data?.likesBy || [],
            };
          }),
        );

        setPosts(postData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <Box flex={1} bgColor="white">
      <VStack px={16} py={20}>
        <HStack space={10}>
          {tabs.map(tab => (
            <Button
              key={tab}
              variant={selectedTab === tab ? 'solid' : 'outline'}
              onPress={() => setSelectedTab(tab)}
              rounded={20}
              sx={{ borderWidth: 0 }}
              px={20}
              mx={10}>
              <ButtonText>{tab}</ButtonText>
            </Button>
          ))}
        </HStack>

        <HStack alignItems="center" gap={4} mt={20}>
          <Box bg="#fff" borderRadius={10} p={2}>
            <Image
              width={40}
              height={40}
              borderRadius={20}
              resizeMode="cover"
              source={{
                uri: user?.profilePicture || 'https://via.placeholder.com/40',
              }}
            />
          </Box>

          <HStack
            bg="#F3F4F6"
            borderRadius={10}
            px={4}
            py={4}
            alignItems="center"
            flex={1}
          >
            <Pressable style={{ height: 44, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigate('CreatePost', { postType: selectedTab })}>
              <Text style={{ marginLeft: 10, fontSize: 14, color: '#a0a0a0' }}>
                {selectedTab?.toLowerCase() === 'sales'
                  ? "What are you looking for/selling?"
                  : selectedTab?.toLowerCase() === 'housing'
                    ? "Looking for a room or offering one?"
                    : "Start a conversation"}
              </Text>
            </Pressable>
          </HStack>
        </HStack>

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          {posts.filter(i => i.postTags?.toLowerCase() === selectedTab.toLowerCase()).length === 0 && (
            <VStack justifyContent="center" alignItems="center" h={400}>
              <Text fontSize={16} fontWeight={'400'} color={'#a7a7a7'}>No posts</Text>
            </VStack>
          )}
          {posts
            .filter(i => i.postTags?.toLowerCase() === selectedTab.toLowerCase())
            .map(post => (
              <PostItem
                key={post.id}
                post={post}
                currentUserId={currentUserId}
                currentUser={user}
              />
            ))}
        </ScrollView>
      </VStack>
    </Box>
  );
}

const PostItem = ({ post, currentUserId, currentUser }: any) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const bottomSheetRef = useRef();

  useEffect(() => {
    setLiked(post.likesBy?.includes(currentUserId) || false);
  }, [post.likesBy]);

  const fetchComments = () => {
    firestore()
      .collection('community_posts')
      .doc(post.id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
  };

  const openComments = () => {
    bottomSheetRef.current?.open();
    fetchComments();
  };

  const toggleLike = async () => {
    const postRef = firestore().collection('community_posts').doc(post.id);
    const newLiked = !liked;
    const newCount = newLiked ? likesCount + 1 : likesCount - 1;

    setLiked(newLiked);
    setLikesCount(newCount);

    await postRef.update({
      likes: newCount,
      likesBy: newLiked
        ? firestore.FieldValue.arrayUnion(currentUserId)
        : firestore.FieldValue.arrayRemove(currentUserId),
    });
  };

  const postComment = async () => {
    if (!commentText.trim()) return;

    await firestore()
      .collection('community_posts')
      .doc(post.id)
      .collection('comments')
      .add({
        userId: currentUserId,
        userName: `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim(),
        userAvatar: currentUser.profilePicture || '',
        text: commentText.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    setCommentText('');
  };

  return (
    <Box mb={20}>
      <HStack alignItems="center" mb={8}>
        <Image
          width={40}
          height={40}
          borderRadius={20}
          resizeMode="cover"
          source={{ uri: post.userAvatar || 'https://via.placeholder.com/40' }}
        />
        <VStack ml={10}>
          <Text fontWeight="bold">{post.fullName}</Text>
          <HStack alignItems="center">
            <Text ml={5} fontSize={12} color="#6B7280">
              {formatTime(post.createdAt)}
            </Text>
            {post.postTags && (
              <>
                <View
                  sx={{
                    width: 2,
                    height: 2,
                    backgroundColor: '#000',
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                />
                <Text fontSize={12} color="#2563EB">
                  {post.postTags}
                </Text>
              </>
            )}
          </HStack>
        </VStack>
      </HStack>

      <Text mb={10}>{post.description}</Text>

      {post.images?.length === 1 && (
        <Image
          source={{ uri: post.images[0] }}
          style={{ height: 160, borderRadius: 10, marginBottom: 10 }}
          resizeMode="cover"
        />
      )}

      {post.images?.length > 1 && (
        <HStack space={6} mb={10}>
          {post.images.map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img }}
              style={{
                width: Dimensions.get('window').width / 2.5,
                height: Dimensions.get('window').width / 2.5,
                borderRadius: 8,
                marginRight: 10,
              }}
            />
          ))}
        </HStack>
      )}

      <HStack gap={20} mb={10}>
        <Pressable onPress={toggleLike}>
          <HStack alignItems="center">
            {liked ? (
              <FavouriteIcon fill="red" color="red" />
            ) : (
              <FavouriteIcon />
            )}
            <Text fontSize={16} ml={6}>
              {likesCount}
            </Text>
          </HStack>
        </Pressable>
        <Pressable onPress={openComments}>
          <Text fontSize={16}>💬 {post.commentsCount || 0}</Text>
        </Pressable>
      </HStack>

      <CustomBottomSheet ref={bottomSheetRef}>
        <ScrollView>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              commentId={comment.id}
              postId={post.id}
              avatar={comment.userAvatar}
              name={comment.userName}
              comment={comment.text}
              time={comment.createdAt}
              currentUser={{
                uid: currentUserId,
                name: `${currentUser.firstName} ${currentUser.lastName}`,
                avatar: currentUser.profilePicture,
              }}
            />
          ))}
        </ScrollView>

        <CommentInput
          avatar={currentUser.profilePicture}
          value={commentText}
          onChangeText={setCommentText}
          onPost={postComment}
        />
      </CustomBottomSheet>
    </Box>
  );
};

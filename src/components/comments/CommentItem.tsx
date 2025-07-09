import React, { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';
import {
  Box,
  HStack,
  VStack,
  Text,
  FavouriteIcon,
} from '@gluestack-ui/themed';
import { formatTime } from '../../utils/helper/functions';
import firestore from '@react-native-firebase/firestore';

const CommentItem = ({
  commentId,
  postId,
  avatar,
  name,
  comment,
  time,
  currentUser,
}: any) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const commentRef = firestore()
    .collection('community_posts')
    .doc(postId)
    .collection('comments')
    .doc(commentId);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = commentRef
      .collection('likes')
      .onSnapshot(snapshot => {
        const allLikes = snapshot.docs.map(doc => doc.data());
        setLikes(allLikes);
        setLiked(allLikes.some(like => like.userId === currentUser.uid));
      });

    return () => unsubscribe();
  }, [commentId, postId, currentUser]);

  const toggleLike = async () => {
    if (!currentUser?.uid) return;

    const likeDocRef = commentRef.collection('likes').doc(currentUser.uid);
    try {
      if (liked) {
        await likeDocRef.delete();
      } else {
        await likeDocRef.set({
          userId: currentUser.uid,
          userName: currentUser.name || '',
          userAvatar: currentUser.avatar || '',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Box p={10} mb={10}>
      <HStack alignItems="flex-start">
        <Image
          width={40}
          height={40}
          borderRadius={20}
          style={{ marginTop: 10 }}
          resizeMode="cover"
          source={{ uri: avatar || 'https://via.placeholder.com/40' }}
        />
        <VStack ml={10} flex={1} bg="#F9FAFB" p={10} borderRadius={12}>
          <Text fontWeight="bold">{name}</Text>
          <Text mt={2}>{comment}</Text>
        </VStack>
      </HStack>

      <HStack mt={3} ml={50} alignItems="center" space="lg">
        <Text fontSize={12} color="#6B7280">{formatTime(time)}</Text>
        {/* <Text fontSize={12} color="#6B7280">Reply</Text> */}

        <Pressable onPress={toggleLike}>
          <HStack alignItems="center">
            <FavouriteIcon color={liked ? 'red' : '#6B7280'} fill={liked ? 'red' : 'none'} />
            <Text fontSize={12} ml={4}>{likes.length}</Text>
          </HStack>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default CommentItem;

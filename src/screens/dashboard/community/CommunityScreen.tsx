import React, { useState } from 'react';
import { ScrollView, TextInput, Image, Pressable } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  ButtonText,
  View,
} from '@gluestack-ui/themed';
import { navigate } from '../../../navigators/Root';

export default function CommunityScreen() {
  const [selectedTab, setSelectedTab] = useState('Sales');

  const tabs = ['Sales', 'Chat', 'Housing'];

  return (
    <Box flex={1} bgColor="white">
      <VStack px={16} py={20}>
        <HStack space={10} mt={0}>
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
          <Box
            bg="#fff"
            borderRadius={10}
            p={2}
            alignItems="center"
            justifyContent="center">
            <Image
              width={40}
              height={40}
              borderRadius={20}
              resizeMode="cover"
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
              }}
            />
          </Box>

          <HStack
            bg="#F3F4F6"
            borderRadius={10}
            px={4}
            py={4}
            alignItems="center"
            flex={1}><Pressable onPress={() => navigate('CreatePost')}>
              <TextInput
                placeholder="What are you looking for/selling?"
                style={{ marginLeft: 10, flex: 1 }}
                editable={false}

              /></Pressable>
          </HStack>
        </HStack>
        {/* Feed */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}>
          <PostItem
            user="Sarah Johnson"
            time="2 hours ago"
            tag="Market"
            content="Looking for a used MacBook Pro in good condition. Budget around €800. Preferably 2021 or newer model. Anyone selling?"
            comments={12}
            likes={24}
            replies={[
              {
                user: 'Alex Brown',
                time: '1 hour ago',
                reply:
                  'I have a 2022 MacBook Pro in excellent condition. DM me for details and photos.',
              },
            ]}
          />
          <PostItem
            user="Mike Chen"
            time="5 hours ago"
            tag="Community"
            content="Does anyone have a spare room to rent near campus? Max budget €500/month, available from March 2025. Clean and quiet student here!"
            image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            comments={8}
            likes={15}
          />
          <PostItem
            user="Emma Wilson"
            time="8 hours ago"
            tag="Food"
            content="Anyone interested in joining for lunch at the new Italian place downtown? They have amazing pasta deals! 🍝"
            multiImages={[
              'https://images.unsplash.com/photo-1',
              'https://images.unsplash.com/photo-2',
              'https://images.unsplash.com/photo-3',
            ]}
            comments={5}
            likes={10}
            replies={[
              {
                user: 'Tom Parker',
                time: '6 hours ago',
                reply: `Count me in! I’ve heard great things about their carbonara. What time were you thinking?`,
              },
            ]}
          />
        </ScrollView>
      </VStack>
    </Box >
  );
}

const PostItem = ({
  user,
  time,
  tag,
  content,
  image,
  multiImages,
  comments,
  likes,
  replies = [],
}) => {
  return (
    <Box mb={20}>
      <HStack alignItems="center" mb={8}>
        <Avatar
          size="sm"
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
        />
        <VStack ml={10}>
          <Text fontWeight="bold">{user}</Text>

          <HStack alignItems="center" justifyContent='center'>
            <Text ml={5} fontSize={12} color="#6B7280">
              {time}
            </Text>
            {tag && <View sx={{ width: 2, height: 2, backgroundColor: '#000', borderRadius: 10, marginHorizontal: 5 }} />}
            <Text fontSize={12} color="primary">
              {tag}
            </Text>
          </HStack>
        </VStack>
      </HStack>

      <Text mb={10}>{content}</Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ height: 160, borderRadius: 10, marginBottom: 10 }}
          resizeMode="cover"
        />
      )}
      {multiImages && (
        <HStack space={6} mb={10}>
          {multiImages.map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img }}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />
          ))}
        </HStack>
      )}

      <HStack space={20} mb={10}>
        <Text fontSize={14}>💬 {comments}</Text>
        <Text fontSize={14}>❤️ {likes}</Text>
      </HStack>

      {replies.map((reply, idx) => (
        <Box key={idx} bg="#F9FAFB" p={10} borderRadius={8} mb={5}>
          <Text fontWeight="bold" mb={5}>
            {reply.user}{' '}
            <Text color="#6B7280" fontSize={12}>
              {reply.time}
            </Text>
          </Text>
          <Text>{reply.reply}</Text>
        </Box>
      ))}
    </Box>
  );
};

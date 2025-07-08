import React from 'react';
import { Image, TextInput } from 'react-native';
import {
  HStack,
  Avatar,
  Input,
  InputField,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

const CommentInput = ({ avatar, value, onChangeText, onPost }) => {
  return (
    <HStack alignItems="center" position='absolute' backgroundColor='#fff' bottom={0} py={10} px={10}>
      <Image
        width={40}
        height={40}
        borderRadius={20}
        resizeMode="cover"
        style={{ backgroundColor: '#e7e7e7' }}
        source={{ uri: avatar || 'https://via.placeholder.com/40' }}
      />

      <TextInput
        placeholder="Write a comment.."
        style={{ marginLeft: 10, height: 44, flex: 1, backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 5 }}
        value={value}
        onChangeText={onChangeText}
      />

      <Button variant="solid" ml={10} borderRadius={20} size="sm" onPress={onPost}>
        <ButtonText>Post</ButtonText>
      </Button>
    </HStack>
  );
};


export default CommentInput;

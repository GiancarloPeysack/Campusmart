import React, { useCallback, useEffect, useState } from 'react';
// import { GiftedChat, IMessage, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Box, Text } from '@gluestack-ui/themed';

const ChatScreen = ({ route }: any) => {
    const { chatId, recipient } = route.params;
    // const [messages, setMessages] = useState<IMessage[]>([]);
    const currentUser = auth().currentUser;

    // useEffect(() => {
    //     const unsubscribe = firestore()
    //         .collection('chats')
    //         .doc(chatId)
    //         .collection('messages')
    //         .orderBy('createdAt', 'desc')
    //         .onSnapshot(snapshot => {
    //             const updatedMessages: IMessage[] = snapshot.docs.map(doc => {
    //                 const data = doc.data();
    //                 return {
    //                     _id: doc.id,
    //                     text: data.text,
    //                     createdAt: data.createdAt?.toDate?.() || new Date(),
    //                     user: data.user,
    //                 };
    //             });
    //             setMessages(updatedMessages);
    //         });

    //     return () => unsubscribe();
    // }, [chatId]);

    // const onSend = useCallback((messages = []) => {
    //     const msg = messages[0];

    //     const messageData = {
    //         _id: msg._id,
    //         text: msg.text,
    //         createdAt: firestore.FieldValue.serverTimestamp(),
    //         user: {
    //             _id: currentUser?.uid,
    //             name: currentUser?.displayName || 'Admin',
    //             avatar: currentUser?.photoURL || '',
    //         },
    //     };

    //     firestore()
    //         .collection('chats')
    //         .doc(chatId)
    //         .collection('messages')
    //         .add(messageData);
    // }, []);

    return (
        <Box flex={1} bg="white">
            {/* <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: currentUser?.uid,
                    name: currentUser?.displayName || 'Admin',
                    avatar: currentUser?.photoURL || '',
                }}
                renderBubble={props => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: { backgroundColor: '#2563EB' },
                            left: { backgroundColor: '#E5E7EB' },
                        }}
                        textStyle={{
                            right: { color: '#fff' },
                            left: { color: '#111827' },
                        }}
                    />
                )}
                renderSend={props => (
                    <Send {...props} containerStyle={{ marginRight: 10 }}>
                        <Text color="#2563EB" fontWeight="bold">Send</Text>
                    </Send>
                )}
                renderInputToolbar={props => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            borderTopWidth: 1,
                            borderTopColor: '#E5E7EB',
                            paddingHorizontal: 8,
                        }}
                    />
                )}
                placeholder="Type a message..."
                showUserAvatar
                alwaysShowSend
                renderAvatarOnTop
            /> */}
        </Box>
    );
}

export default ChatScreen
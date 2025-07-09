import React, { useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
    Box,
    Text,
    Pressable,
    HStack,
    VStack,
    Image,
    Fab,
} from '@gluestack-ui/themed';
import { FlatList } from 'react-native';
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import { Plus } from '../../../../assets/icons/Plus';
import useAuth from '../../../../hooks/useAuth';

const MessagesScreen = ({ navigation }: any) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const curUser = auth().currentUser;
    const { user } = useAuth()
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .where('participants', 'array-contains', curUser?.uid)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setConversations(data);
            });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const userRef = firestore().collection('drivers').doc(curUser?.uid);

            const unsubscribe = userRef.onSnapshot(async doc => {
                if (doc?.exists) {
                    const data = doc.data();

                    if (data?.restaurentId) {
                        try {
                            const resDoc = await firestore()
                                .collection('restaurants')
                                .doc(data.restaurentId)
                                .get();

                            if (resDoc.exists) {
                                const restaurantData = resDoc.data();

                                setAllUsers([{ ...restaurantData, _id: resDoc.id }]);
                            }
                        } catch (error) {
                            console.error('Error fetching associated users:', error);
                        }
                    }
                }
            });

            return () => unsubscribe();
        };

        fetchUsers();
    }, [curUser]);

    const startChatWithUser = async (selectedUser: any) => {
        const existingChat = await firestore()
            .collection('chats')
            .where('participants', 'array-contains', curUser?.uid)
            .get();

        const chatDoc = existingChat.docs.find(doc => {
            const data = doc.data();
            return data.participants.includes(selectedUser._id);
        });

        if (chatDoc) {
            navigation.navigate('ChatScreen', {
                chatId: chatDoc.id,
                recipient: selectedUser,
            });
        } else {
            const newChat = await firestore()
                .collection('chats')
                .add({
                    participants: [curUser?.uid, selectedUser._id],
                    users: [
                        {
                            _id: curUser?.uid,
                            name: user?.firstName + ' ' + user?.lastName || 'You',
                            avatar: user?.profilePicture || '',
                        },
                        {
                            _id: selectedUser._id,
                            name: selectedUser.nameOfRestaurent,
                            avatar: selectedUser.coverImage || '',
                        },
                    ],
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });

            navigation.navigate('ChatScreen', {
                chatId: newChat.id,
                recipient: selectedUser,
            });
        }
    };

    const renderItem = ({ item }: any) => {
        const recipient = item.users.find((u: any) => u._id !== curUser?.uid);

        return (
            <Pressable
                onPress={() =>
                    navigation.navigate('ChatScreen', {
                        chatId: item.id,
                        recipient,
                    })
                }
                px={20}
                py={15}
                borderBottomWidth={1}
                borderBottomColor="#2563EB80"
                borderTopColor='#2563EB80'
                borderTopWidth={1}
                bg='#f7f7f7'>
                <HStack space="md" alignItems="center">
                    <Image
                        source={{ uri: recipient?.avatar || '' }}
                        alt="avatar"
                        width={60}
                        height={60}
                        rounded={30}
                    />
                    <Text fontWeight="$medium" size='lg'>{recipient?.name}</Text>
                </HStack>
            </Pressable>
        );
    };

    return (
        <Box flex={1} bg="white">
            <FlatList
                data={conversations}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <VStack space="sm" p={16} mt={20} alignItems="center">
                        <Text fontWeight="500" fontSize="$lg" color="#a1a1a1" mb={12}>
                            No Converstaion Found
                        </Text>
                    </VStack>
                )}
            />

            <Fab
                onPress={() => bottomSheetRef.current?.open()}
                bgColor="$blue600"
                placement="bottom right"
                size="md">
                <Plus />
            </Fab>

            <CustomBottomSheet ref={bottomSheetRef}>
                <VStack space="sm" p={16}>
                    <Text fontWeight="bold" fontSize="$lg" mb={12}>
                        Start New Chat
                    </Text>
                    {allUsers?.map(u => (
                        <Pressable
                            key={u._id}
                            onPress={() => startChatWithUser(u)}
                            py={10}
                            borderBottomWidth={1}
                            borderBottomColor="#F3F4F6">
                            <HStack space="md" alignItems="center">
                                <Image
                                    source={{ uri: u.coverImage }}
                                    alt="avatar"
                                    width={60}
                                    height={60}
                                    rounded={30}
                                    bg="#e7e7e7"
                                />
                                <Text fontSize="$lg">{u.nameOfRestaurent}</Text>
                            </HStack>
                        </Pressable>
                    ))}
                </VStack>
            </CustomBottomSheet>
        </Box>
    );
};

export default MessagesScreen;

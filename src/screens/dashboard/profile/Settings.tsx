import {
  Box,
  Center,
  ChevronRightIcon,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import React, { useRef, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import DocIcon from '../../../assets/images/doc.png';
import ChatIcon from '../../../assets/images/chat.png';
import DeleteIcon from '../../../assets/images/delete.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../../../theme/useTheme';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import PrivacyPolicyScreen from '../PrivacyPolicyScreen';
import TermsOfServiceScreen from '../TermsOfServiceScreen';

export const SettingsScreens = (): React.JSX.Element => {
  const { colors } = useTheme();

  const termsSheetRef = useRef(null);
  const feedbackSheetRef = useRef(null);

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.error('Logout Error:', error);
          }
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const user = auth().currentUser;
              if (user) {
                await firestore().collection('users').doc(user.uid).update({
                  accountStatus: 'deleted',
                  deletedAt: firestore.FieldValue.serverTimestamp(),
                });
                setTimeout(async () => {

                  await auth().signOut();
                }, 500);

                Alert.alert('Account deleted.');
              }
            } catch (error) {
              console.error('Soft delete failed:', error);
              Alert.alert('Error', 'Something went wrong.');
            }
          },
        },
      ]
    );
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      const user = auth().currentUser;
      await firestore().collection('client_feedback').add({
        uid: user?.uid || null,
        email: user?.email || null,
        feedback: feedback.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setFeedback('');
      feedbackSheetRef.current?.close();
      Alert.alert('Thank you!', 'Your feedback has been submitted.');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Unable to send feedback. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg={colors.gray6}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1 }}>
        <VStack gap={16} flex={1}>
          <Center
            h={152}
            bg={colors.gray6}
            position="absolute"
            bottom={50}
            left={0}
            right={0}>

            {/* Delete Account */}
            <Pressable mt={5} width={'$96'} onPress={handleDelete}>
              <HStack justifyContent="space-between" p={10}>
                <HStack>
                  <Image source={DeleteIcon} resizeMode="contain" height={16} width={16} marginTop={3} />
                  <Text color={colors.gray} fontSize={14} marginLeft={10}>Delete Account</Text>
                </HStack>
                <Icon as={ChevronRightIcon} />
              </HStack>
            </Pressable>

            {/* Terms */}
            <Pressable mt={5} width={'$96'} onPress={() => termsSheetRef.current?.open()}>
              <HStack justifyContent="space-between" p={10}>
                <HStack>
                  <Image source={DocIcon} resizeMode="contain" height={16} width={16} marginTop={3} />
                  <Text color={colors.gray} fontSize={14} marginLeft={10}>Terms & Privacy Policy</Text>
                </HStack>
                <Icon as={ChevronRightIcon} />
              </HStack>
            </Pressable>

            {/* Contact Us / Feedback */}
            <Pressable mt={5} width={'$96'} onPress={() => feedbackSheetRef.current?.open()}>
              <HStack justifyContent="space-between" p={10}>
                <HStack>
                  <Image source={ChatIcon} resizeMode="contain" height={16} width={16} marginTop={3} />
                  <Text color={colors.gray} fontSize={14} marginLeft={10}>Send Feedback</Text>
                </HStack>
                <Icon as={ChevronRightIcon} />
              </HStack>
            </Pressable>

            {/* Sign Out */}
            <Pressable bgColor={colors.white} width={'$96'} mt={18} onPress={handleLogout} padding={10}>
              <Text color={colors.title} fontSize={14} textAlign="center">Sign Out</Text>
            </Pressable>
          </Center>
        </VStack>
      </ScrollView>

      <CustomBottomSheet ref={termsSheetRef} height={500}>
        <Text fontWeight="bold" fontSize="$lg" mb={12}>Terms & Privacy</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PrivacyPolicyScreen />
          <TermsOfServiceScreen /></ScrollView>
      </CustomBottomSheet>

      <CustomBottomSheet ref={feedbackSheetRef}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text fontSize={16} fontWeight="bold" marginBottom={10}>We’d love your feedback!</Text>
          <Input
            h={96}
            bg={colors.gray6}
            rounded={12}
            py={10}
            borderWidth={1}
            $focus-borderColor={colors.primary}>
            <InputField
              onChangeText={(val) => setFeedback(val)}
              multiline={true}
              autoCorrect={false}
              autoCapitalize='none'
              defaultValue={feedback}
              placeholderTextColor="#ADAEBC"
            />
          </Input>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              backgroundColor: colors.primary,
              borderRadius: 5,
              paddingHorizontal: 20,
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10
            }} onPress={handleSendFeedback}>
            <Text style={{ color: '#fff' }}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </CustomBottomSheet>
    </Box>
  );
};

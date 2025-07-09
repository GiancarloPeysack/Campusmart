import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';

export default function PrivacyPolicyScreen() {
  return (
    <Box bg="white" p={16}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text fontSize={20} fontWeight="bold" mb={12}>📄 CampusMart Privacy Policy</Text>
      <Text fontSize={14} mb={4}>Effective Date: July 3, 2025</Text>
      <Text fontSize={14} mb={12}>
        CampusMart (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, and your rights as a user.
      </Text>

      <Text fontWeight="bold" fontSize={16} mb={6}>1. Information We Collect</Text>
      <Text fontSize={14}>When you use the CampusMart app, we may collect the following information:</Text>

      <Text mt={8} fontWeight="bold">Personal Information</Text>
      <Text>• Email address{'\n'}• Name{'\n'}• Phone number (if provided)</Text>

      <Text mt={8} fontWeight="bold">Order & Usage Data</Text>
      <Text>• Purchase history (items, order totals, timestamps){'\n'}• Location (approximate, only if required for delivery or pickup){'\n'}• Device information (model, OS version, crash logs)</Text>

      <Text mt={8}>
        We do not collect or store your credit or debit card details. All transactions are processed securely through Stripe.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>2. How We Use Your Information</Text>
      <Text>• To process orders and provide requested services{'\n'}• To send order status updates and service communications{'\n'}• To improve app functionality, troubleshoot issues, and analyze usage{'\n'}• To comply with legal and financial obligations</Text>

      <Text mt={8}>We do not sell your personal information or share it with third parties for advertising purposes.</Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>3. Your Rights & Choices</Text>
      <Text>• Access or Update Data: You may request to view or update your account information at any time.{'\n'}• Delete Account: You may request account deletion from the Privacy section in the app.{'\n'}• Opt-Out of Communications: You may opt out of non-essential notifications through app settings.</Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>4. Data Retention</Text>
      <Text>
        We retain your data only as long as necessary for business or legal reasons. When you delete your account, personal data is removed from our systems unless required for compliance.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>5. Children’s Privacy</Text>
      <Text>
        CampusMart is not intended for users under the age of 13. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at the email below.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>6. Contact Us</Text>
      <Text>Email: campusmartttt@gmail.com</Text>
      {/* </ScrollView> */}
    </Box>
  );
}

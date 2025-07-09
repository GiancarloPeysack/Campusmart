import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';

export default function TermsOfServiceScreen() {
  return (
    <Box bg="white" p={16}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text fontSize={20} fontWeight="bold" mb={12}>📄 CampusMart Terms of Service</Text>
      <Text fontSize={14} mb={4}>Effective Date: July 3, 2025</Text>
      <Text fontSize={14} mb={12}>
        These Terms of Service (“Terms”) govern your use of the CampusMart mobile application and services (“CampusMart”, “we”, “us”).
      </Text>

      <Text>
        By creating an account or using our services, you agree to be bound by these Terms.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>1. Using CampusMart</Text>
      <Text>• You must be at least 13 years old to use the app.{'\n'}• You agree to provide accurate, up-to-date information when creating an account.{'\n'}• You are responsible for maintaining the security of your account.</Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>2. Orders and Payments</Text>
      <Text>• CampusMart connects you with vendors for purchasing goods and services.{'\n'}• All payments are securely processed through Stripe.{'\n'}• You agree to pay for all orders placed through your account.</Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>3. Refunds and Cancellations</Text>
      <Text>• Refunds or cancellations are subject to the policies of the individual vendors.{'\n'}• If you have a dispute with an order, contact us at campusmartttt@gmail.com.</Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>4. User Conduct</Text>
      <Text>
        You agree not to:{'\n'}• Misuse the app or its content{'\n'}• Interfere with service functionality or access of others{'\n'}• Attempt to reverse engineer or exploit any part of the platform
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>5. Intellectual Property</Text>
      <Text>
        All content, branding, and software used in CampusMart are the property of CampusMart or its licensors and protected by law.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>6. Account Termination</Text>
      <Text>
        We reserve the right to suspend or terminate accounts that violate these Terms or compromise service integrity.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>7. Limitation of Liability</Text>
      <Text>
        CampusMart is provided “as is.” We are not liable for indirect damages, order fulfillment failures, or platform outages. Some jurisdictions do not allow certain limitations, so this may not apply to you in full.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>8. Changes to Terms</Text>
      <Text>
        We may update these Terms occasionally. Continued use of the app means you accept the revised Terms.
      </Text>

      <Text fontWeight="bold" fontSize={16} mt={16} mb={6}>9. Contact</Text>
      <Text>Email: campusmartttt@gmail.com</Text>
      {/* </ScrollView> */}
    </Box>
  );
}

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Title, Paragraph, Subheading, Divider } from 'react-native-paper';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Terms and Conditions</Title>

      <View style={styles.section}>
        <Subheading style={styles.sectionTitle}>Acceptance of Terms</Subheading>
        <Paragraph style={styles.paragraph}>
          By accessing or using our app, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of the terms, please do not use our app.
        </Paragraph>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Subheading style={styles.sectionTitle}>User Responsibilities</Subheading>
        <Paragraph style={styles.paragraph}>
          Users are responsible for maintaining the confidentiality of their account information and password. You are also responsible for all activities that occur under your account.
        </Paragraph>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Subheading style={styles.sectionTitle}>Prohibited Activities</Subheading>
        <Paragraph style={styles.paragraph}>
          You agree not to engage in any harmful or prohibited activities, including but not limited to unauthorized access to our systems, data mining, or interference with the proper functioning of the app.
        </Paragraph>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Subheading style={styles.sectionTitle}>Intellectual Property</Subheading>
        <Paragraph style={styles.paragraph}>
          All content and materials available in the app, including but not limited to text, graphics, logos, button icons, images, and audio clips, are the property of our company and are protected by applicable intellectual property laws.
        </Paragraph>
      </View>

      {/* Add more sections as needed */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 20,
  },
});

export default TermsAndConditions;

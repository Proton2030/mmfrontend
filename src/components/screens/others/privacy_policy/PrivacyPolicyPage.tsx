import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph, List, IconButton } from 'react-native-paper';

const PrivacyPolicy = () => {
  const [section1Expanded, setSection1Expanded] = useState(false);
  const [section2Expanded, setSection2Expanded] = useState(false);
  const [section3Expanded, setSection3Expanded] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Privacy Policy</Title>

      <List.Section>
        <List.Accordion
          title="Your Data is Secure"
          expanded={section1Expanded}
          onPress={() => setSection1Expanded(!section1Expanded)}
        >
          <List.Item
            title="We take the security of your data seriously."
            description="Our app employs advanced encryption and security measures to ensure that your personal information is protected."
          />
        </List.Accordion>

        <List.Accordion
          title="Transparent Data Handling"
          expanded={section2Expanded}
          onPress={() => setSection2Expanded(!section2Expanded)}
        >
          <List.Item
            title="We are committed to transparency in how we handle your data."
            description="Our Privacy Policy outlines what information we collect, how we use it, and the limited situations in which we may share your data."
          />
        </List.Accordion>

        <List.Accordion
          title="Your Privacy Matters"
          expanded={section3Expanded}
          onPress={() => setSection3Expanded(!section3Expanded)}
        >
          <List.Item
            title="Your privacy is our priority."
            description="We do not sell or share your personal information with third parties without your consent. You have control over your data, and we are here to respect and protect your privacy choices."
          />
        </List.Accordion>
      </List.Section>
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
});

export default PrivacyPolicy;

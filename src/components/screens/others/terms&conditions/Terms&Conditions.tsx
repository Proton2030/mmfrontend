import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Title, Paragraph, List, IconButton, Appbar, useTheme, Subheading, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Example() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '500', fontSize: 23, color: colors.primary }}>Terms and conditions</Text>
      </Appbar.Header>
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Purpose and User Eligibility</Subheading>
          <Paragraph style={styles.paragraph}>
            This app is designed to facilitate connections between eligible Muslim singles. Users must be 18 years or
            older to use this app.
          </Paragraph>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Profile and Information:</Subheading>
          <Paragraph style={styles.paragraph}>
            Users must provide accurate and truthful information when creating a profile. Users are solely responsible
            for the content they post. While we strive to protect user privacy, please be aware that information you
            make publicly visible can be viewed by other users.
          </Paragraph>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Communication and Messaging</Subheading>
          <Paragraph style={styles.paragraph}>
            Users can communicate with each other through the app's messaging system. Messaging requires the purchase of
            prepaid credits, which can be bought online through SSL Commerce . Harassment, bullying, or threatening
            behavior is strictly prohibited.
          </Paragraph>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Account Termination</Subheading>
          <Paragraph style={styles.paragraph}>
            Accounts may be terminated for violating these terms or for any other reason deemed appropriate by the app
            owner. Accounts will be terminated for proven cases of harassment or abuse.
          </Paragraph>
        </View>
        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Disclaimer</Subheading>
          <Paragraph style={styles.paragraph}>
            The app owner is not responsible for the accuracy of information provided by users. The app owner shall not
            be liable for any damages or losses incurred as a result of using the app. If the government requests any
            information for any reason, the organization will be obliged to provide it. Service interruptions may occur
            from time to time.
          </Paragraph>
        </View>
        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Copyright:</Subheading>
          <Paragraph style={styles.paragraph}>
            All content on this app is the property of Shohoz Shadi. Unauthorized use is prohibited. If anyone uses any
            information of the organization without permission, legal action will be taken.
          </Paragraph>
        </View>
        <View style={{ height: 100 }}></View>
        {/* Add more sections as needed */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 60,
    padding: 24,
    backgroundColor: '#F3F4F6',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#CFD1D4',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#5FBC39',
    borderColor: '#5FBC39',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 20,
  },
});

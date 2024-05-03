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
        <Text style={{ fontWeight: '500', fontSize: 23, color: colors.primary }}>Privacy and Policy</Text>
      </Appbar.Header>
      <ScrollView style={{ paddingTop: 20, paddingHorizontal: 15, gap: 20, flexDirection: 'column' }}>
        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Acceptance of Terms</Subheading>
          <Paragraph style={styles.paragraph}>
            By accessing or using our app, you agree to comply with and be bound by these Terms and Conditions. If you
            do not agree with any part of the terms, please do not use our app.
          </Paragraph>
        </View>

        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>User Responsibilities</Subheading>
          <Paragraph style={styles.paragraph}>
            Users are responsible for maintaining the confidentiality of their account information and password. You are
            also responsible for all activities that occur under your account.
          </Paragraph>
        </View>

        <View style={styles.section}>
          <Subheading style={styles.sectionTitle}>Prohibited Activities</Subheading>
          <Paragraph style={styles.paragraph}>
            You agree not to engage in any harmful or prohibited activities, including but not limited to unauthorized
            access to our systems, data mining, or interference with the proper functioning of the app.
          </Paragraph>
        </View>

        {/* Add more sections as needed */}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.inverseOnSurface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 12,
          paddingHorizontal: 16,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <View />
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 40,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 26, fontWeight: '600', color: colors.background }}>Agree</Text>

            {/* <MaterialCommunityIcons color={colors.background} name="arrow-right" size={18} style={{ marginLeft: 12 }} /> */}
          </View>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    borderWidth: 0.5,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
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

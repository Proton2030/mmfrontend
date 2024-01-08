import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../globalStyles/GlobalStyles'

const Terms = () => {
  return (
    <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
      <Text>Welcome to our Muslim Matrimony App. Before you proceed, please carefully read and understand the following terms and conditions:\nEligibility: Users must be of legal age to use this app for matrimonial purposes in accordance with Islamic law.\nProfile Accuracy: Users are responsible for providing accurate and truthful information in their profiles. Any misrepresentation may lead to account suspension.\nPrivacy: We respect your privacy. Your personal information will be handled securely and will only be shared with mutual matches in line with our privacy policy.\nRespectful Conduct: Users are expected to engage in respectful and courteous communication. Any form of harassment or inappropriate behavior will result in immediate account suspension.\nReligious Compatibility: This app is designed for Muslims seeking matrimonial connections. Users are expected to uphold Islamic values and prioritize religious compatibility in their search for a life partner.\nProhibited Content: Users must refrain from posting or sharing any content that goes against Islamic principles or is deemed inappropriate by the app administrators.\nSecurity Measures: Users are responsible for maintaining the confidentiality of their login credentials. Any unauthorized use of an account should be reported immediately.\nThird-Party Interactions: The app is not responsible for interactions or agreements between users and any third parties. Exercise caution and conduct due diligence when engaging in communication outside the app.\nTermination of Account: The app reserves the right to terminate or suspend accounts that violate these terms and conditions without prior notice.\nBy using the Muslim Matrimony App, you agree to abide by these terms and conditions. We strive to create a platform that fosters genuine connections within the bounds of Islamic values.</Text>
    </ScrollView>
  )
}

export default Terms
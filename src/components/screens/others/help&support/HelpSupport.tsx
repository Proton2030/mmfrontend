import { Image, ScrollView, View } from 'react-native';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { support } from '../../../../assets';
import SupportContainer from './supportContainer/SupportContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, useTheme } from 'react-native-paper';

const HelpAndSupport = () => {
  const { colors } = useTheme();
  return (
    // <SafeAreaView>
    <ScrollView
      style={{
        flex: 1,
        paddingBottom: 0,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={globalStyles.parentScrollContainer}
    >
      <Image source={support} style={globalStyles.topScreenImage} />
      <SupportContainer />
    </ScrollView>
  );
};

export default HelpAndSupport;

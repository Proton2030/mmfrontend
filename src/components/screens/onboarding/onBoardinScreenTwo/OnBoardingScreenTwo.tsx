import { View, Text, Image } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { jumping } from '../../../../assets';
import { ThemeColor } from '../../../../constants/theme/themeColor';
import { useTheme } from 'react-native-paper';

const OnboardScreenTwo = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Image style={{ height: 400, width: 340, marginLeft: 'auto', marginRight: 'auto' }} source={jumping} />
      <Text
        style={{
          color: colors.primary,
          fontSize: 30,
          fontWeight: '700',
          textAlign: 'center',
          marginTop: 30,
          lineHeight: 40,
        }}
      >
        Lets Find your match
      </Text>
      <Text style={{ color: colors.scrim, fontSize: 30, fontWeight: '700', textAlign: 'center' }}>
        with us right now!
      </Text>
    </View>
  );
};

export default OnboardScreenTwo;

import { View, Text, Image } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { playingHeart } from '../../../../assets';
import { windowHeight, windowWidth } from '../../../../globalStyles/GlobalStyles';
import { useTheme } from 'react-native-paper';
import { ThemeColor } from '../../../../constants/theme/themeColor';

const OnboardScreenOne = () => {
  const { colors } = useTheme();
  return (
    <View>
      <Image
        style={{ height: windowHeight / 2, width: windowWidth, marginLeft: 'auto', marginRight: 'auto' }}
        source={playingHeart}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 30,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          Thousands of people
        </Text>
        <Text style={{ color: colors.scrim, fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
          have got their perfect match
        </Text>
      </View>
    </View>
  );
};

export default OnboardScreenOne;

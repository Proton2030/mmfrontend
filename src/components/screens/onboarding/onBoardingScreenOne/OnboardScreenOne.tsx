import { View, Text, Image } from 'react-native'
import { COLORS } from '../../../../constants/theme'
import { playingHeart } from '../../../../assets'

const OnboardScreenOne = () => {
    return (
        <View style={{ flex: 1 }}>
            <Image style={{ height: 400, width: 340, marginLeft: "auto", marginRight: "auto" }}
                source={playingHeart} />

            <Text style={{ color: COLORS.primary, fontSize: 30, fontWeight: "700", textAlign: "center", marginTop: 30, lineHeight: 40, }}>
                Thousands of people</Text>
            <Text style={{ color: "black", fontSize: 30, fontWeight: "700", textAlign: "center" }}>
                have got their perfect match
            </Text>
        </View>
    )
}

export default OnboardScreenOne
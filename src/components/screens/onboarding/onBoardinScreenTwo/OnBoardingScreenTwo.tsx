import { View, Text, Image } from 'react-native'
import { COLORS } from '../../../../constants/theme'
import { jumping } from '../../../../assets'

const OnboardScreenTwo = () => {
    return (
        <View style={{ flex: 1 }}>
            <Image style={{ height: 400, width: 340, marginLeft: "auto", marginRight: "auto" }}
                source={jumping} />
            <Text style={{ color: COLORS.primary, fontSize: 30, fontWeight: "700", textAlign: "center", marginTop: 30, lineHeight: 40 }}>
                Lets Find your match</Text>
            <Text style={{ color: "black", fontSize: 30, fontWeight: "700", textAlign: "center" }}>
                with us right now!
            </Text>
        </View>
    )
}

export default OnboardScreenTwo
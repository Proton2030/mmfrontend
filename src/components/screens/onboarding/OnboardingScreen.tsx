// import React from 'react'
// import { View } from 'react-native'

// const OnboardingScreen = () => {
//     return (
//         <View>

//         </View>
//     )
// }

// export default OnboardingScreen

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CommonButton from '../../shared/commonButton/CommonButton';
import { COLORS } from '../../../constants/theme';
import { fullLogo } from '../../../assets';

const items = [
    {
        icon: 'message-circle',
        title: 'Live Chat',
        subtitle: 'Lorem Ipsum',
    },
    {
        icon: 'heart',
        title: 'Marrage Proposals',
        subtitle: 'Lorem Ipsum',
    },

];

const { width, height } = Dimensions.get('window');

export const OnboardingScreen = () => {
    const [value, setValue] = React.useState(0);
    const navigation = useNavigation<any>();
    const handleNavigate = () => {
        navigation.navigate('Language');
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#1b1d1b', flex: 1, paddingBottom: 3 }}>
            <Image
                style={styles.background}
                source={{
                    uri: 'https://img.freepik.com/free-photo/couple-making-heart-from-hands-sea-shore_23-2148019887.jpg?t=st=1726485326~exp=1726488926~hmac=0e91f7e915666127f09f7e48935f560b99930273c5dcb99cb095f63a33d22d05&w=740',
                }}
                resizeMode="cover"
            />
            <View style={[styles.background, styles.overflow]} />
            <View style={styles.content}>
                {/* <Image style={{ height: 50, width: 230, marginBottom: 20 }} source={fullLogo} /> */}
                <Text style={styles.title}>
                    Start your beautifull love journy by finding your soulmate
                </Text>
                {items.map(({ icon, title, subtitle }, index) => {
                    const isActive = value === index;
                    return (
                        <TouchableOpacity
                            key={index}
                        >
                            <View style={[styles.radio]}>
                                <View style={styles.radioIcon}>
                                    <FeatherIcon color="#fff" name={icon} size={20} />
                                </View>

                                <View>
                                    <Text style={styles.radioTitle}>{title}</Text>

                                    <Text style={styles.radioSubtitle}>{subtitle}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    );
                })}
                <View>

                </View>
                <View style={styles.footer}>

                    <CommonButton
                        loading={false}
                        handleAction={handleNavigate}
                        text={"Get Started"}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },
    overflow: {
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    content: {
        marginTop: 'auto',
        alignItems: 'stretch',
        paddingHorizontal: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
        paddingRight: 40,
    },
    footer: {
        paddingVertical: 16,
    },
    /** Radio */
    radio: {
        position: 'relative',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    radioActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.13)',
    },
    radioIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: 'white',
        marginBottom: 2,
    },
    radioSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#878787',
    },
    radioCheck: {
        width: 24,
        height: 24,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        marginLeft: 'auto',
        display: 'none',
    },
    radioCheckActive: {
        display: 'flex',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#007aff',
        borderColor: '#007aff',
    },
    btnText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#fff',
    },
});
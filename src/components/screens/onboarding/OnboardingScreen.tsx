import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Animated, // Import Animated API
    Dimensions,
} from 'react-native';
import CommonButton from '../../shared/commonButton/CommonButton';
import { COLORS } from '../../../constants/theme';
import OnboardScreenOne from './onBoardingScreenOne/OnboardScreenOne';
import OnboardScreenTwo from './onBoardinScreenTwo/OnBoardingScreenTwo';

const { width } = Dimensions.get('window');

const PaginationDots = ({ currentPage }: { currentPage: number }) => {
    return (
        <View style={styles.paginationContainer}>
            <View
                style={[
                    styles.dot,
                    currentPage === 0 && styles.activeDot
                ]}
            />
            <View
                style={[
                    styles.dot,
                    currentPage === 1 && styles.activeDot
                ]}
            />
        </View>
    );
};

export const OnboardingScreen = () => {
    const [page, setPage] = useState(0);
    const navigation = useNavigation<any>();
    const slideAnim = useRef(new Animated.Value(0)).current; // Animation value for sliding

    const nextPage = () => {
        // Slide to next page
        setPage(1);
        Animated.timing(slideAnim, {
            toValue: -width, // Slide to the left
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    const prevPage = () => {
        // Slide back to the previous page
        setPage(0);
        Animated.timing(slideAnim, {
            toValue: 0, // Slide back to the initial position
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    const handleNavigate = () => {
        navigation.navigate('Language');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.skipContainer} onPress={prevPage}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Animated View for sliding pages */}
            <Animated.View
                style={[
                    styles.animatedContainer,
                    { transform: [{ translateX: slideAnim }] } // Slide horizontally
                ]}
            >
                <View style={styles.pageContainer}>
                    <OnboardScreenOne />
                </View>
                <View style={styles.pageContainer}>
                    <OnboardScreenTwo />
                </View>
            </Animated.View>

            <PaginationDots currentPage={page} />
            <View style={{ paddingHorizontal: 20 }}>

                {page === 0 ? (
                    <CommonButton loading={false} handleAction={nextPage} text={"Next"} />
                ) : (
                    <CommonButton loading={false} handleAction={handleNavigate} text={"Get Started"} />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 20,
    },
    skipContainer: {
        backgroundColor: COLORS.lightGrey,
        width: 55,
        alignItems: "center",
        paddingVertical: 2,
        borderRadius: 20,
        marginLeft: "auto",
        marginRight: 20
    },
    skipText: {
        color: "black",
        fontWeight: "700",
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: COLORS.lightGrey,
        marginHorizontal: 5,
    },
    activeDot: {
        width: 25, // Make the active dot wider
        backgroundColor: COLORS.primary,
    },
    animatedContainer: {
        flexDirection: 'row',
        width: width * 2, // Make sure it can hold both screens side by side
        flex: 1
    },
    pageContainer: {
        width, // Ensure each page takes up full screen width
    },
});

export default OnboardingScreen;

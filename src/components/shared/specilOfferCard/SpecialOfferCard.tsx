import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/theme';
import { styles } from '../../screens/subscriptionPage/subcriptionStyles';
import moment from 'moment'; // Use moment.js or Date API to handle time calculations
import { Image } from 'react-native';

const SpecialOfferCard = ({ isActive, index, setSelected, item, planCreationTime, planDurationInMinutes }: any) => {
    const [timeRemaining, setTimeRemaining] = useState(0); // Remaining time in seconds

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const currentTime = moment(); // Get the current time
            const endTime = moment(planCreationTime).add(planDurationInMinutes, 'minutes'); // Calculate end time
            const difference = endTime.diff(currentTime, 'seconds'); // Calculate difference in seconds

            setTimeRemaining(difference > 0 ? difference : 0); // Set remaining time, no negative time
        };

        calculateTimeRemaining(); // Calculate time immediately on mount

        const timer = setInterval(() => {
            calculateTimeRemaining();
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [planCreationTime, planDurationInMinutes]);

    // Function to format time in MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format with leading 0
    };

    return (
        <>
            <TouchableWithoutFeedback
                key={index}
                onPress={() => setSelected(index)}
            >
                <View
                    style={[
                        styles.radio,
                        isActive
                            ? { borderColor: COLORS.primary, backgroundColor: '#ffe6ee' }
                            : {},
                    ]}
                >
                    <FeatherIcon
                        color={isActive ? '#F82E08' : '#363636'}
                        name={isActive ? 'check-circle' : 'circle'}
                        size={24}
                    />

                    <View style={styles.radioBody}>
                        <View>
                            <Text style={styles.radioLabel}>{item?.plan_name}</Text>
                            <Text style={styles.radioText}>
                                Chat count {item?.chat_count}
                            </Text>
                            {/* Display remaining time */}
                            {timeRemaining > 0 ? (
                                <Text style={[styles.radioText, { fontSize: 14, color: COLORS.primary, marginLeft: -5 }]}>
                                    <Image
                                        source={{ uri: "https://threedio-prod-var-cdn.icons8.com/yn/preview_sets/previews/x1kHx-Bof0L_2XOh.webp" }}
                                        style={{ height: 18, width: 20 }} /> {formatTime(timeRemaining)} minutes left
                                </Text>
                            ) : (
                                <Text style={styles.radioText}>Offer Expired</Text>
                            )}
                        </View>

                        <Text
                            style={[
                                styles.radioPrice,
                                isActive && styles.radioPriceActive,
                            ]}
                        >
                            ৳ {item?.plan_price}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

export default SpecialOfferCard;

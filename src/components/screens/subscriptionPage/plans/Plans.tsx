import React, { useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from '../subcriptionStyles';
import { COLORS } from '../../../../constants/theme';
import SpecialOfferCard from '../../../shared/specilOfferCard/SpecialOfferCard';

const Plans = ({ prices, selected, setSelected, nextPage, handlePaymentUpdate }: any) => {
    const [showScrollDown, setShowScrollDown] = useState(true); // State to control arrow visibility
    const scrollViewRef = useRef<ScrollView>(null); // To control the scroll position programmatically

    // Function to handle scroll event
    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

        // Calculate the position of the last item in the list
        if (scrollPosition + scrollViewHeight >= contentHeight - 100) {
            // User has scrolled to the last item
            setShowScrollDown(false);
        } else {
            setShowScrollDown(true);
        }
    };



    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Subscription Plans</Text>
                <Text style={styles.subtitle}>
                    Boost your productivity with premium tools and personalized features.
                </Text>
            </View>

            <View style={styles.form}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        ref={scrollViewRef}
                        onScroll={handleScroll}
                        scrollEventThrottle={16} // Trigger scroll event every 16 ms (smooth scrolling)
                    >


                        {prices.map((item: any, index: any) => {
                            if (index === 4) {
                                return (
                                    <SpecialOfferCard
                                        key={index}
                                        isActive={selected === index}
                                        index={index}
                                        setSelected={setSelected}
                                        item={item}
                                        planCreationTime={'2024-10-02T19:30:00'}
                                        planDurationInMinutes={30}
                                    />
                                );
                            }

                            const isActive = selected === index;

                            return (
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
                            );
                        })}
                    </ScrollView>

                    {/* Down Arrow Button */}
                    {showScrollDown && (
                        <TouchableOpacity
                            style={styles.scrollDownBtn}
                            onPress={() => {
                                // Optionally, scroll down the view when pressed
                                if (scrollViewRef.current) {
                                    scrollViewRef.current.scrollToEnd({ animated: true });
                                }
                            }}
                        >
                            <FeatherIcon color={'#363636'} name={'chevron-down'} size={22} />
                            <Text style={{ color: "black" }}>
                                Scroll down
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View>
                    <TouchableOpacity onPress={nextPage}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Plans;

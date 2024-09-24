
import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from '../subcriptionStyles';
import { COLORS } from '../../../../constants/theme';

const Plans = ({ prices, selected, setSelected, nextPage }: any) => {
    return (
        <View style={{
            flex: 1
        }}>
            <View style={styles.header}>


                <Text style={styles.title}>Subscription Plans</Text>

                <Text style={styles.subtitle}>
                    Boost your productivity with premium tools and personalized features.
                </Text>
            </View>

            <View style={styles.form}>
                <View>
                    {prices.map((item: any, index: any) => {
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
                                    ]}>
                                    <FeatherIcon
                                        color={isActive ? '#F82E08' : '#363636'}
                                        name={isActive ? 'check-circle' : 'circle'}
                                        size={24} />

                                    <View style={styles.radioBody}>
                                        <View>
                                            <Text style={styles.radioLabel}>{item.label}</Text>

                                            <Text style={styles.radioText}>Chat count {item.description}</Text>
                                        </View>

                                        <Text
                                            style={[
                                                styles.radioPrice,
                                                isActive && styles.radioPriceActive,
                                            ]}>
                                            {item.price}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>

                <View>
                    <TouchableOpacity
                        onPress={nextPage}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Continue</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default Plans
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './subcriptionStyles';
import { COLORS } from '../../../constants/theme';
import { useTheme } from 'react-native-paper';
import { api } from '../../../utils/api';
import { useNavigation } from '@react-navigation/native';

export const SubscriptionPage = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [value, setValue] = useState(0);
  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [plans, setPlans] = useState([]);

  const getAllPlans = async () => {
    const response = await api.payment.getALlPlans();
    console.log('=====>plan parent', response);
    setPlans(response);
  };

  // useEffect(() => {
  //   setDisplayedPoints([]);

  //   const { points } = items[value];

  //   points.forEach((point, index) => {
  //     setTimeout(() => {
  //       setDisplayedPoints((prevPoints): any => [...prevPoints, point]);
  //     }, index * 100);
  //   });

  //   return () => clearTimeout();
  // }, [value]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.payment.getALlPlans();
        // Assuming `response` is an array of plan objects
        setPlans(response);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <LinearGradient colors={['#8324ff', '#8324ff', '#d781c4', colors.secondary]} style={styles.gradientBackground}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Subscription Plans</Text>
          <View style={styles.radioContainer}>
            {plans.map((plan: any, index) => {
              const isActive = value === index;

              return (
                <TouchableOpacity style={{ flexBasis: '44%' }} key={plan._id} onPress={() => setValue(index)}>
                  <View style={[styles.radio, isActive && styles.radioActive]}>
                    <View style={styles.radioTop}>
                      <Text style={isActive ? styles.radioLabelActive : styles.radioLabel}>{plan.plan_name}</Text>
                      <Text style={isActive ? styles.radioUsersActive : styles.radioUsers}>
                        <AntDesign name="checkcircle" size={15} />
                      </Text>
                    </View>
                    <Text style={isActive ? styles.radioPriceActive : styles.radioPrice}>BDT{plan.plan_price}</Text>
                    <View
                      style={{
                        width: 'auto',
                        backgroundColor: index === 0 ? 'transparent' : 'white',
                        borderRadius: 20,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        marginTop: 4,
                        height: 26,
                      }}
                    >
                      {index === 0 ? null : (
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>SAVE 60%</Text>
                      )}
                    </View>
                    <Text style={isActive ? styles.radioDescriptionActive : styles.radioDescription}>
                      Chat Count: {plan?.chat_count}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* <View style={styles.pointsContainer}>
            {displayedPoints.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <AntDesign name="check" size={17} color="white" style={styles.pointIcon} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View> */}
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('paymentPage');
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: colors.primary,
            marginTop: 'auto',
            marginHorizontal: 24,
            marginBottom: 20,
          }}
        >
          <Text style={styles.btnText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

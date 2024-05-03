import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from './subcriptionStyles';
import { COLORS } from '../../../constants/theme';
import { useTheme } from 'react-native-paper';

const items = [
  {
    label: 'Monthly',
    users: <AntDesign name="checkcircle" size={15} />,
    price: '$9.99',
    description: '10 Credits',
    points: ['Unlimited access', 'Priority support', 'Free updates'],
  },
  {
    label: 'Yearly',
    users: <AntDesign name="checkcircle" size={15} />,
    price: '$99.99',
    description: '120 Credits',
    points: ['Unlimited access', 'Priority support', 'Free updates'],
  },
  {
    label: 'Weekly',
    users: <AntDesign name="checkcircle" size={15} />,
    price: '$4.99',
    description: '5 Credits',
    points: ['Limited access', 'Priority support', 'Limited updates'],
  },
];

export const SubscriptionPage = () => {
  const { colors } = useTheme();
  const [value, setValue] = useState(0);
  const [displayedPoints, setDisplayedPoints] = useState([]);

  useEffect(() => {
    setDisplayedPoints([]);

    const { points } = items[value];

    points.forEach((point, index) => {
      setTimeout(() => {
        setDisplayedPoints((prevPoints) => [...prevPoints, point]);
      }, index * 100);
    });

    return () => clearTimeout();
  }, [value]);

  return (
    <LinearGradient colors={['#8324ff', '#d781c4', colors.secondary]} style={styles.gradientBackground}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Subscription Plans</Text>
          <View style={styles.radioContainer}>
            {items.map(({ label, users, description, price }, index) => {
              const isActive = value === index;
              return (
                <TouchableOpacity style={{ flexBasis: '44%' }} key={index} onPress={() => setValue(index)}>
                  <View style={[styles.radio, isActive && styles.radioActive]}>
                    <View style={styles.radioTop}>
                      <Text style={isActive ? styles.radioLabelActive : styles.radioLabel}>{label}</Text>
                      <Text style={isActive ? styles.radioUsersActive : styles.radioUsers}>{users}</Text>
                    </View>
                    <Text style={isActive ? styles.radioPriceActive : styles.radioPrice}>{price}</Text>
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
                      {description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.pointsContainer}>
            {displayedPoints.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <AntDesign name="check" size={17} color="white" style={styles.pointIcon} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          // handle onPress
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

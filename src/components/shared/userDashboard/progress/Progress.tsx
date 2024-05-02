import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function ProgressBar({ totalCoins, usedCoins }: any) {
  // Calculate the percentage of coins used
  const usedPercentage = (usedCoins / totalCoins) * 100;

  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progress,
          {
            width: `${usedPercentage}%`,
            backgroundColor: COLORS.primary,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          },
        ]}
      ></View>
      <View
        style={[
          styles.progress,
          {
            width: `${100 - usedPercentage}%`,
            backgroundColor: '#d9d9d9',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    height: 5,
    borderRadius: 8,
    overflow: 'hidden',
    width: '80%',
    marginTop: 8,
    backgroundColor: '#d9d9d9',
  },
  progress: {
    height: '100%',
  },
  inputIcon: {
    width: 44,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

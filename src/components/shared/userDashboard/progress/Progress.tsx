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
      >
        {/* <View style={styles.inputIcon}>
          <FeatherIcon color="white" name="box" size={16} />
        </View> */}
      </View>
      {/* Gray section for remaining coins */}
      <View
        style={[
          styles.progress,
          {
            width: `${100 - usedPercentage}%`,
            backgroundColor: '#f0f6fb',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 8,
    overflow: 'hidden',
    width: '80%',
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

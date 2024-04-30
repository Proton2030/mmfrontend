import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RangeSlider } from '@react-native-assets/slider';
import { COLORS } from '../../../constants/theme';

const DualRange = () => {
  const [range, setRange] = useState([10, 50]);

  const handleRangeChange = (values: any) => {
    setRange(values);
  };

  return (
    <View style={styles.container}>
      <RangeSlider
        range={[0, 100]}
        minimumValue={0}
        maximumValue={100}
        step={1}
        outboundColor="#d9d9d9"
        inboundColor={'pink'}
        thumbTintColor={COLORS.primary}
        trackHeight={4}
        thumbSize={15}
        slideOnTap={true}
        onValueChange={handleRangeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
});

export default DualRange;

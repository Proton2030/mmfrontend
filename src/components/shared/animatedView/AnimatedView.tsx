import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

const AnimatedView = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    // Animate the translateY value to 0
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);
  return <Animated.View style={[{ transform: [{ translateY }] }, style]}>{children}</Animated.View>;
};

export default AnimatedView;

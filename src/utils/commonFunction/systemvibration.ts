import { Vibration } from 'react-native';

export const handleVibrate = () => {
  Vibration.vibrate([100, 50, 100]);
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key:string, value:string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };
  
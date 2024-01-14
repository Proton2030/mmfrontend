import { Linking } from "react-native";

export const openLinkInBrowser = async (url:string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Cannot open URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
};
  
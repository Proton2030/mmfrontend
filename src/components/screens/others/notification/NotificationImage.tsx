import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const YourComponent = ({ style }: any) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{
          uri: 'https://ouch-cdn2.icons8.com/vCiCfEux4nTLODov70_648TweW2Hp7vtuZLg9F4RNpo/rs:fit:368:338/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg2/L2U1MDViOWEwLTM3/Y2MtNDQ0My04MWFm/LTYwZDUxNWJiZjYx/Zi5zdmc.png',
        }} // or require('path-to-local-image.jpg')
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    overflow: 'hidden',
  },
  image: {
    width: 40, // Set the desired width of the image
    height: 40, // Set the desired height of the image
    // Optional: add borderRadius for a circular image
  },
});

export default YourComponent;

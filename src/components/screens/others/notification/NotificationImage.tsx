import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const YourComponent = ({style}:any) => {
  return (
    <View style={[styles.container,style]}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }} // or require('path-to-local-image.jpg')
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',

    
  },
  image: {
    width: 60, // Set the desired width of the image
    height: 60, // Set the desired height of the image
 // Optional: add borderRadius for a circular image
  },
});

export default YourComponent;

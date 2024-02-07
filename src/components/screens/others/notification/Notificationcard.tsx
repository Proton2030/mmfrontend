// NotificationCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YourComponent from './NotificationImage';

const NotificationCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.content}>
        {/* Add your image component here if needed */}
      
        <YourComponent  style={styles.img}/>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Hello John</Text>
          <Text style={styles.description}>
            Sara replied on the <Text style={styles.link}>Upload Image</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth:'100%',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 8,
    
  },
  line: {
    width: 2,
    backgroundColor: 'gray',
  },
  content: {
    flex: 1,
    padding: 16,
    flexDirection:"row",
   
    gap:15,
    alignItems:"center",
    
  },
  textContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    color: '#666',
  },
  link: {
    color: 'blue',
  },
  img:{


  },
});

export default NotificationCard;

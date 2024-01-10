// import { View, Text } from 'react-native'
// import React from 'react'

// const Chats = () => {
//     return (
//         <View>
//             <Text>Chats</Text>
//         </View>
//     )
// }

// export default Chats


import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Avatar, Text } from 'react-native-paper';

 const Chats = () => {
    const defaultImageUrl =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D';

  const data = [
    { id: '1', name: 'John Doe', message: 'Online', time: '10:30 AM' },
    { id: '2', name: 'Jane Doe', message: 'Online', time: '11:45 AM' },
    { id: '1', name: 'John Doe', message: 'Online', time: '10:30 AM' },
    { id: '2', name: 'Jane Doe', message: 'Online', time: '11:45 AM' },
  ];

  const renderChatItem = (item:any) => (
    <TouchableOpacity key={item.id} style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Avatar.Image size={50} source={{ uri: defaultImageUrl }} />
        <View style={styles.onlineDot} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
          {item.message}
        </Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.infoLabel}>Chats</Text>
      {data.map(renderChatItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 20
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
      },
      avatarContainer: {
        position: 'relative',
      },
      onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50', // Green color
      },
      textContainer: {
        flex: 1,
        marginLeft: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      message: {
        color: '#555',
      },
      time: {
        fontSize: 12,
        color: '#777',
      },
    });
  

export default Chats
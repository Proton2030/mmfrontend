import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import PaymentModal from './PaymentModal';
import { Avatar, Button, Card, Paragraph, useTheme } from 'react-native-paper';
import { color } from '../../../assets';

const { height } = Dimensions.get('window');

const BottomDrawer = ({ modalVisible, setModalVisible }: any) => {
  const { colors } = useTheme();
  const translateY = useRef(new Animated.Value(height)).current;

  // Effect to open/close the bottom drawer based on modalVisible state
  useEffect(() => {
    if (modalVisible) {
      // Animate the drawer to open
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate the drawer to close
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <>
      {modalVisible && (
        <TouchableOpacity style={styles.background} onPress={() => setModalVisible(false)}>
          <View style={styles.transparent} />
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.drawer, { transform: [{ translateY }] }]}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary, marginTop: 3, marginBottom: 12 }}>
          Subscription Plans
        </Text>
        <View style={styles.handle}>
          {[1, 2, 3].map((item) => (
            <Card
              style={{
                marginRight: 10,
                height: 100,
                width: 100,
                marginLeft: 6,
                backgroundColor: colors.background,
                padding: 5,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: colors.primary,
                  marginTop: 3,
                  marginBottom: 2,
                }}
              >
                Low Package
              </Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>&nbsp;1000৳</Text>
              <Text style={{ fontSize: 12 }}>&nbsp;10 persons</Text>
              <Card
                style={{
                  marginTop: 20,
                  padding: 0,
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                  width: 'auto',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Pay</Text>
              </Card>
            </Card>
          ))}
        </View>
        <Card
          style={{ marginVertical: 4, height: 100, padding: 10, backgroundColor: colors.background, marginTop: 20 }}
        >
          <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Avatar.Icon size={26} icon="sale" />
              <Text style={{ fontSize: 17, fontWeight: '700', color: colors.primary }}>Special Offer</Text>
            </View>

            <Text style={{ ontSize: 17, fontWeight: '700', color: colors.primary }}>&nbsp;Only 150৳</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 15, marginVertical: 8 }}>Chat with Lia</Text>
          <Card
            style={{
              padding: 0,
              backgroundColor: colors.primary,
              borderRadius: 50,
              width: 'auto',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Pay</Text>
          </Card>
        </Card>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transparent: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.43, // Adjust the height of the drawer as needed
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handle: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  modalContent: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subscriptionCard: {},
  specialBuyCard: {},
  buyButton: {
    marginTop: 10,
  },
});

export default BottomDrawer;

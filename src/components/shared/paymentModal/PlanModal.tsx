import { useRef, useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, TouchableOpacity, PanResponder } from 'react-native';
import { useTheme } from 'react-native-paper';
import PlanCards from './plancards/PlanCards';
import SpecialCard from './specialCard/SpecialCard';
import axios from 'axios';
import { api } from '../../../utils/api';

const { height } = Dimensions.get('window');

const BottomDrawer = ({ modalVisible, setModalVisible, handlePaymentUpdate }: any) => {
  const { colors } = useTheme();
  const translateY = useRef(new Animated.Value(height)).current;
  const [plans, setPlans] = useState([]);

  // Initialize PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Limit the translateY value within the screen bounds
        if (gestureState.dy > 0 && gestureState.dy <= height * 0.45) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        // Determine whether to open or close the drawer based on release position
        if (gestureState.dy > height * 0.15) {
          closeDrawer();
        } else {
          openDrawer();
        }
      },
    }),
  ).current;

  const openDrawer = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const getAllPlans = async () => {
    const response = await api.payment.getALlPlans();
    console.log(response);
    setPlans(response);
  };

  useEffect(() => {
    if (modalVisible) {
      openDrawer();
      getAllPlans();
    } else {
      closeDrawer();
    }
  }, [modalVisible]);

  return (
    <>
      {modalVisible && (
        <TouchableOpacity style={styles.background} onPress={() => closeDrawer()}>
          <View style={styles.transparent} />
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.drawer, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
        <View style={styles.handlepull} />

        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary, marginTop: 3, marginBottom: 12 }}>
          Subscription Plans
        </Text>
        <View style={styles.handle}>
          {plans.map((item, index) => (
            <PlanCards key={index} item={item} />
          ))}
        </View>
        <SpecialCard />
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
  handlepull: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45, // Adjust the height of the drawer as needed
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handle: {
    marginBottom: 0,
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

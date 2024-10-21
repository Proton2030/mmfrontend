import React, { useState, useRef, useContext, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from '../subcriptionStyles';
import { COLORS } from '../../../../constants/theme';
import SpecialOfferCard from '../../../shared/specilOfferCard/SpecialOfferCard';
import { Chip, useTheme } from 'react-native-paper';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import { PAYMENT_TEXT } from '../../../../constants/texts/payment/Payment';
import AuthContext from '../../../../contexts/authContext/authContext';
import { set } from 'lodash';
import { api } from '../../../../utils/api';

const Plans = ({ prices, selected, setSelected, nextPage, handlePaymentUpdate }: any) => {
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const { user } = useContext(AuthContext);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isEligibleUser, setIsEligibleUser] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string>('0');

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (scrollPosition + scrollViewHeight >= contentHeight - 100) {
      setShowScrollDown(false);
    } else {
      setShowScrollDown(true);
    }
  };

  const getEligibleUser = useCallback(async () => {
    if (user && user.createdAt) {
      const filter = {
        userId: user._id,
      };
      const response = await api.payment.isOfferValid(filter);
      if (response) {
        setIsEligibleUser(response);
        console.log('===>eligible', response);
      }
    }
  }, [user]);

  useEffect(() => {
    getEligibleUser();
  }, [getEligibleUser]);

  useEffect(() => {
    if (user && user.createdAt) {
      const interval = setInterval(() => {
        const timeElapsed = new Date().getTime() - new Date(user.createdAt).getTime();
        const timeRemaining = 24 * 60 * 60 * 1000 - timeElapsed;

        if (timeRemaining > 0) {
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setRemainingTime('0');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          {selectLanguage(PAYMENT_TEXT.subscription, language)}
        </Text>
        <Text style={styles.subtitle}>{selectLanguage(PAYMENT_TEXT.subscription_details, language)}</Text>
      </View>

      <View style={styles.form}>
        <View style={{ flex: 1 }}>
          <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16}>
            {prices.map((item: any, index: any) => {
              const isActive = selected === index;
              return (
                <TouchableWithoutFeedback key={index} onPress={() => setSelected(index)}>
                  <View
                    style={[
                      styles.radio,
                      isActive
                        ? { borderColor: colors.primary, backgroundColor: colors.secondary }
                        : { backgroundColor: colors.background },
                    ]}
                  >
                    <FeatherIcon
                      color={isActive ? '#F82E08' : '#363636'}
                      name={isActive ? 'check-circle' : 'circle'}
                      size={24}
                    />

                    <View style={styles.radioBody}>
                      <View>
                        <Text style={[styles.radioLabel, { color: isActive ? 'red' : colors.scrim }]}>
                          {item?.plan_name}
                        </Text>
                        <Text style={styles.radioText}>
                          {selectLanguage(PAYMENT_TEXT.chat_count, language)} {item?.chat_count}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text
                          style={[
                            styles.radioPrice,
                            isEligibleUser &&
                              item.chat_count === 1 &&
                              item.offer_price && { textDecorationLine: 'line-through' },
                            isActive && styles.radioPriceActive,
                            { color: colors.scrim },
                          ]}
                        >
                          {item?.plan_price}
                        </Text>
                        {isEligibleUser && item.chat_count === 1 && item.offer_price ? (
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {remainingTime !== '0' ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 5,
                                  borderColor: colors.primary,
                                  borderWidth: 1,
                                  padding: 3,
                                  paddingHorizontal: 4,
                                  borderRadius: 10,
                                }}
                              >
                                <FeatherIcon
                                  color={colors.primary}
                                  name={'clock'}
                                  size={16}
                                  style={{ fontWeight: '700' }}
                                />
                                <Text style={{ color: 'red', fontWeight: '800', fontSize: 10 }}>{remainingTime}</Text>
                              </View>
                            ) : null}
                            <Text
                              style={[styles.radioPrice, isActive && styles.radioPriceActive, { color: colors.scrim }]}
                            >
                              ৳ {item?.offer_price}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>

          {/* Down Arrow Button */}
          {showScrollDown && (
            <TouchableOpacity
              style={styles.scrollDownBtn}
              onPress={() => {
                // Optionally, scroll down the view when pressed
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }
              }}
            >
              <FeatherIcon color={'#363636'} name={'chevron-down'} size={22} />
              <Text style={{ color: colors.tertiary }}>Scroll down</Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <TouchableOpacity onPress={nextPage}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>{selectLanguage(PAYMENT_TEXT.continue, language)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Plans;

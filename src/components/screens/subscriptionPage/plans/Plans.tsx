import React, { useState, useRef, useContext } from 'react';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from '../subcriptionStyles';
import { COLORS } from '../../../../constants/theme';
import SpecialOfferCard from '../../../shared/specilOfferCard/SpecialOfferCard';
import { useTheme } from 'react-native-paper';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import { PAYMENT_TEXT } from '../../../../constants/texts/payment/Payment';

const Plans = ({ prices, selected, setSelected, nextPage, handlePaymentUpdate }: any) => {
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

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
              if (index === 4) {
                return (
                  <SpecialOfferCard
                    key={index}
                    isActive={selected === index}
                    index={index}
                    setSelected={setSelected}
                    item={item}
                    planCreationTime={'2024-10-02T22:28:00'}
                    planDurationInMinutes={30}
                  />
                );
              }

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
                      <Text style={[styles.radioPrice, isActive && styles.radioPriceActive, { color: colors.scrim }]}>
                        ৳ {item?.plan_price}
                      </Text>
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

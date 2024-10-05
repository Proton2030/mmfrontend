import React, { useContext, useState } from 'react';
import { styles } from '../subcriptionStyles';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { color } from '../../../../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import { PAYMENT_TEXT } from '../../../../constants/texts/payment/Payment';

const Payment = ({ prevPage, selectedPlan, handlePaymentUpdate }: any) => {
  const [selected, setSelected] = useState(0);
  const isActive = selected === 0;

  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme === 'DARK' ? colors.primary : 'black' }]}>
            {selectLanguage(PAYMENT_TEXT.select_payment_method, language)}
          </Text>

          <Text style={styles.subtitle}>{selectLanguage(PAYMENT_TEXT.choose_payment_method, language)}</Text>
        </View>

        <View style={styles.form2}>
          <TouchableWithoutFeedback onPress={() => handlePaymentUpdate(selectedPlan)}>
            <View
              style={{
                width: '100%',
                backgroundColor: colors.background,
                height: 88,
                borderRadius: 20,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 15,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  height: 60,
                  width: 60,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{ height: 60, width: 60 }}
                  source={{
                    uri: 'https://threedio-prod-var-cdn.icons8.com/xw/preview_sets/previews/D3qF284N6qkWtT10.webp',
                  }}
                />
              </View>
              <View>
                <Text style={{ color: theme === 'DARK' ? 'white' : 'black', fontWeight: '700', fontSize: 17 }}>
                  {selectLanguage(PAYMENT_TEXT.net_banking, language)}
                </Text>
                <Text style={{ color: 'gray', fontWeight: '400', fontSize: 14 }}>
                  {selectLanguage(PAYMENT_TEXT.cash_free, language)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => console.log('ss')}>
            <View
              style={{
                width: '100%',
                backgroundColor: colors.background,
                height: 88,
                borderRadius: 20,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 15,
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  width: 60,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{ height: 60, width: 60 }}
                  source={{
                    uri: 'https://threedio-prod-var-cdn.icons8.com/qs/preview_sets/previews/3xiIoIbVzCUNESeI.webp',
                  }}
                />
              </View>
              <View>
                <Text style={{ color: theme === 'DARK' ? 'white' : 'black', fontWeight: '700', fontSize: 17 }}>
                  {selectLanguage(PAYMENT_TEXT.offline_payment, language)}
                </Text>
                <Text style={{ color: 'gray', fontWeight: '400', fontSize: 14 }}>
                  {selectLanguage(PAYMENT_TEXT.pay_contact_person, language)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
        <TouchableWithoutFeedback onPress={prevPage}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Change Plan</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default Payment;

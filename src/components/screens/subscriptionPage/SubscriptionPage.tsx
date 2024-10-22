import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';

import { COLORS } from '../../../constants/theme';
import { styles } from './subcriptionStyles';
import Plans from './plans/Plans';
import Payment from './payment/Payment';
import { api } from '../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import { useTheme } from 'react-native-paper';
import UiContext from '../../../contexts/uiContext/UIContext';
import { DISTRIBUTION } from '../../../config/config';
import {
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getProducts,
  initConnection,
  Product,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from 'react-native-iap';
import { PRODUCT_ID_LIST } from '../../../constants/productIds/ProductId';
import { productToChatCount } from '../../../utils/billing/BillingToChatCount';

export const SubscriptionPage = ({ closeModal }: any) => {
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(0);
  const [plans, setPlans] = useState<any>([]);
  const [loadingPurchase, setPurchaseLoading] = useState<boolean>(false);

  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);

  const navigation = useNavigation<any>();

  const fetchProducts = async () => {
    try {
      if (PRODUCT_ID_LIST.productSkus) {
        const result: any[] = await getProducts({ skus: PRODUCT_ID_LIST.productSkus });
        console.log('===>products', result[0]);
        let temp_plan_list = [];
        for (const product of result) {
          temp_plan_list.push({
            plan_name: product.name,
            plan_price: product.localizedPrice,
            chat_count: productToChatCount(product.productId),
            offer_price: null,
            _id: product.productId,
          });
        }
        setPlans(temp_plan_list);
      }
    } catch (error) {
      Alert.alert('Error fetching products');
    }
  };

  // console.log('===>plans', plans, '\n\n');

  const handlePurchase = async (productId: string) => {
    setPurchaseLoading(true);
    try {
      await requestPurchase({ skus: [productId] });
    } catch (error) {
      console.log('==>error', error);
      Alert.alert('Error occurred while making purchase');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const nextPage = () => {
    if (String(DISTRIBUTION) === 'WEBSITE') {
      setPage((prev) => prev + 1);
    } else {
      console.log('Initiate Google Play Billing Flow');
      handlePurchase(plans[selected]._id);
    }
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const getAllPlans = async () => {
    const response = await api.payment.getAllPlans();
    setPlans(response);
  };

  useEffect(() => {
    if (String(DISTRIBUTION) === 'WEBSITE') {
      getAllPlans();
    } else {
      fetchProducts();
    }
  }, [DISTRIBUTION]);

  const handleSuccessfulPurchase = async (receipt: string) => {
    console.log('==>receipt', receipt);
    navigation.navigate('PlayStorePaymentVerification', { paymentStatus: 'SUCCESS' });
  };

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          await finishTransaction({ purchase, isConsumable: true });
        } catch (error) {
          console.error('An error occurred while completing transaction', error);
        }
        handleSuccessfulPurchase(receipt);
      }
    });
    const purchaseErrorSubscription = purchaseErrorListener(() =>
      navigation.navigate('PlayStorePaymentVerification', { paymentStatus: 'FAILED' }),
    );

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  const handlePaymentUpdate = async (plan: any) => {
    if (!user?._id || !plan?._id) return;
    // navigation.replace('PaymentVerification', { tranId: 'tran_1727848874969_h720nyzwm', planId: plan._id });
    const response = await api.payment.initPayment(user?._id, plan?._id);
    closeModal();
    console.log('====>url', response.paymentUrl);
    if (response) {
      const { paymentUrl, tranId } = response;
      navigation.navigate('Payment', {
        paymentUrl,
        tranId,
        planId: plan._id,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {page === 0 ? (
        <Plans
          prices={plans}
          selected={selected}
          setSelected={setSelected}
          nextPage={nextPage}
          handlePaymentUpdate={handlePaymentUpdate}
        />
      ) : (
        <Payment
          prevPage={prevPage}
          closeModal={closeModal}
          handlePaymentUpdate={handlePaymentUpdate}
          selectedPlan={plans[selected]}
        />
      )}
      <TouchableOpacity onPress={getAllPlans}></TouchableOpacity>
    </SafeAreaView>
  );
};

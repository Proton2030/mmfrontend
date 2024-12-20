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
import { ReceiptType } from 'react-native-iap/lib/typescript/src/types/android';

export const SubscriptionPage = ({ closeModal }: any) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [plans, setPlans] = useState<any>([]);
  const [loadingPurchase, setPurchaseLoading] = useState<boolean>(false);

  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();

  const navigation = useNavigation<any>();

  console.log('===>selected', selected);

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
      if (selected) {
        await requestPurchase({ skus: [productId] });
      }
    } catch (error) {
      console.log('==>error', error);
    } finally {
      setPurchaseLoading(false);
    }
  };

  const nextPage = () => {
    if (String(DISTRIBUTION) === 'WEBSITE') {
      console.log('==>called next page');
      setPage((prev) => prev + 1);
    } else {
      console.log('Initiate Google Play Billing Flow');
      if (selected) {
        handlePurchase(plans[selected]._id);
      }
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
    const receiptPayload = JSON.parse(receipt);
    const payload = {
      userId: user?._id,
      productId: receiptPayload.productId,
      tran_id: receiptPayload.orderId,
    };
    console.log('===>payload', payload);
    const response = await api.payment.validateGooglePayment(payload);
    if (response) {
      console.log('=====>successfully registered');
      setUser(response);
      closeModal();
      setSelected(null);
      navigation.navigate('PlayStorePaymentVerification', { paymentStatus: 'SUCCESS' });
    }
  };

  const handleCancelPurchase = () => {
    // Reset the selected plan
    setSelected(null);
    closeModal();
    console.log('Payment was cancelled');
  };

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          await finishTransaction({ purchase, isConsumable: true });
        } catch (error) {
          console.log('An error occurred while completing transaction', error);
        } finally {
          handleSuccessfulPurchase(receipt);
        }
      }
    });
    const purchaseErrorSubscription = purchaseErrorListener(handleCancelPurchase);

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
      ) : null}
      {page === 1 && selected !== null ? (
        <Payment
          prevPage={prevPage}
          closeModal={closeModal}
          handlePaymentUpdate={handlePaymentUpdate}
          selectedPlan={plans[selected]}
        />
      ) : null}
      <TouchableOpacity onPress={getAllPlans}></TouchableOpacity>
    </SafeAreaView>
  );
};

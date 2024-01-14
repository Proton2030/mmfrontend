import { Linking } from 'react-native';

const SSLCommerzPayment = require('sslcommerz-lts');
export const initiatePayment = async () => {
  const store_id = 'musli65a0c29552335';
  const store_password = 'musli65a0c29552335@ssl';

  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'X1234XYZ!234567809787689',
    cus_name: 'customer.full_name',
    cus_email: 'email@email.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: 1000,
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
    multi_card_name: 'mastercard, visacard, amexcard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    shipping_method: 'NO',
    product_name: 'CHAT',
    product_category: 'A',
    product_profile: 'telecom-vertical',
  };
  const ssclz = new SSLCommerzPayment(store_id, store_password, false);
  ssclz.init(data).then((response) => {
    // console.log('response', response);
    Linking.openURL(response.GatewayPageURL);
  });
};

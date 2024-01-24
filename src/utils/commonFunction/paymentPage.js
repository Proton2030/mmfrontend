const SSLCommerzPayment = require('sslcommerz-lts');

export const initiatePayment = async (customer, packageDetails, tran_id) => {
  const store_id = 'muslimmatrimonyweblive';
  const store_password = '641BE6A8C765292108';
  let url = '';
  const data = {
    total_amount: 10,
    currency: 'BDT',
    tran_id: tran_id,
    cus_name: customer.full_name,
    cus_email: customer.email || 'N/A',
    cus_add1: customer.state,
    cus_add2: customer.state,
    cus_city: customer.state,
    cus_state: customer.state,
    cus_postcode: 1000,
    cus_country: 'Bangladesh',
    cus_phone: customer.mobile || '123',
    ipn_url: 'https://merchant.sslcommerz.com/',
    success_url: `http://ec2-65-1-183-77.ap-south-1.compute.amazonaws.com:8989/api/v1/payment/success/`,
    fail_url: 'http://ec2-65-1-183-77.ap-south-1.compute.amazonaws.com:8989/api/v1/payment/fail',
    cancel_url: 'http://ec2-65-1-183-77.ap-south-1.compute.amazonaws.com:8989/api/v1/payment/cancel',
    cus_fax: customer.mobile,
    ship_name: customer.full_name,
    ship_add1: customer.state,
    ship_add2: customer.state,
    ship_city: customer.state,
    ship_state: customer.state,
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
    multi_card_name: 'mastercard, visacard,mobilebank,internetbank',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    shipping_method: 'NO',
    product_name: packageDetails.product_name,
    product_category: packageDetails.product_category,
    product_profile: 'telecom-vertical',
  };
  const ssclz = new SSLCommerzPayment(store_id, store_password, true);
  const response = await ssclz.init(data);
  return response.GatewayPageURL;
};

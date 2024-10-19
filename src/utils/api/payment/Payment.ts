import { Params, Payload } from '../../../@types/api/api.types';
import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { get, post } = request;

const initialRoute = 'payment';

export const initPayment = async (userId: string, planId: string) => {
  try {
    const endpoint = `${initialRoute}/init-payment/${userId}/${planId}`;
    const response = await get(endpoint, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const validatePayment = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/validate-payment`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.paymentSuccess) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getPaymentList = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-paymentList`;
    const response = await get(
      endpoint,
      {
        ...headers,
      },
      filter,
    );

    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const isOfferValid = async (filter: Params) => {
  try {
    const endpoint = `${initialRoute}/is-offer-valid`;
    const response = await get(
      endpoint,
      {
        ...headers,
      },
      filter,
    );
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

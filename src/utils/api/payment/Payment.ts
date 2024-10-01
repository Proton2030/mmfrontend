import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { get } = request;

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

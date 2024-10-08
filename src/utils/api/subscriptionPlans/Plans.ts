import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { get } = request;

const initialRoute = 'plans';

export const getAllPlans = async () => {
  try {
    const endpoint = `${initialRoute}/get-plans`;
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

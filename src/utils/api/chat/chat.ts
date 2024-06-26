import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { get } = request;

const initialRoute = 'chat';

export const getChat = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-chat-by-room`;
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
export const getUnseenMessageCount = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-unseen-message`;
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
export const getChatList = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-chat-list`;
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
      } else if (message === MESSAGE.get.empty) {
        return [];
      }
    }
    throw new Error();
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

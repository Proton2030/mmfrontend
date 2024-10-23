import { Payload } from '../../../@types/api/api.types';
import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { patch, get, post } = request;

const initialRoute = 'user';
export const updateUserDetails = async (payload: any) => {
  try {
    // console.log('payload', payload);
    const endpoint = `${initialRoute}/update-user-details`;
    const response = await patch(
      endpoint,
      payload,
      {
        ...headers,
      },
      'AUTH',
    );
    if (response) {
      // console.log('res', response);
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.patch.succ) {
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

export const getAllSuggestionUser = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-all-user-suggestion`;
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
export const getActiveSuggestionUser = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-active-user-suggestion`;
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
export const getMatchedSuggestionUser = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-matched-user-suggestion`;
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
export const getLocationSuggestionUser = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-location-user-suggestion`;
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

export const searchUser = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/search-user`;
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

export const getUserInfo = async (filter: any) => {
  try {
    const endpoint = `${initialRoute}/get-user-info`;
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

export const updateUserImage = async (payload: any) => {
  try {
    const endpoint = `${initialRoute}/update-user-profile-image`;
    const response = await patch(
      endpoint,
      payload,
      {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      'BASE',
    );
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.patch.succ) {
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

export const deleteUser = async (payload: any) => {
  try {
    const endpoint = `${initialRoute}/delete-user`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
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

export const viewUserProfile = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/view-profile`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
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

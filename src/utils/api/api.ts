import axios from 'axios';
import { Endpoint, ENDPOINT_TYPE, Headers, Params, Payload } from '../../@types/api/api.types';
import { AUTH_URL, BASE_URL, CHAT_URL, version } from '../../config/config';

const get = async (endpoint: Endpoint, headers: Headers, params: Params = {}, endpointType: ENDPOINT_TYPE = 'BASE') => {
  try {
    const url = endpointType === 'AUTH' ? AUTH_URL : endpointType === 'CHAT' ? CHAT_URL : BASE_URL;
    const response = await axios.get(`${url}/api/${version}/${endpoint}`, {
      headers,
      params,
    });
    const { status } = response;
    if (status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const post = async (endpoint: Endpoint, payload: Payload, headers: Headers, endpointType: ENDPOINT_TYPE = 'BASE') => {
  try {
    const url = endpointType === 'AUTH' ? AUTH_URL : endpointType === 'CHAT' ? CHAT_URL : BASE_URL;
    const response = await axios.post(`${url}/api/${version}/${endpoint}`, payload, {
      headers,
    });
    const { status } = response;
    if (status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const put = async (endpoint: Endpoint, payload: Payload, headers: Headers, endpointType: ENDPOINT_TYPE = 'BASE') => {
  try {
    const url = endpointType === 'AUTH' ? AUTH_URL : endpointType === 'CHAT' ? CHAT_URL : BASE_URL;
    const response = await axios.put(`${url}/api/${version}/${endpoint}`, payload, {
      headers,
    });
    const { status } = response;
    if (status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const patch = async (endpoint: Endpoint, payload: Payload, headers: Headers, endpointType: ENDPOINT_TYPE = 'BASE') => {
  try {
    const url = endpointType === 'AUTH' ? AUTH_URL : endpointType === 'CHAT' ? CHAT_URL : BASE_URL;
    const response = await axios.patch(`${url}/api/${version}/${endpoint}`, payload, {
      headers,
    });
    const { status } = response;
    if (status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const del = async (endpoint: Endpoint, headers: Headers, endpointType: ENDPOINT_TYPE = 'BASE') => {
  try {
    const url = endpointType === 'AUTH' ? AUTH_URL : endpointType === 'CHAT' ? CHAT_URL : BASE_URL;
    const response = await axios.delete(`${url}/api/${version}/${endpoint}`, {
      headers,
    });
    const { status } = response;
    if (status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const request = {
  fetch,
  get,
  post,
  put,
  patch,
  del,
};

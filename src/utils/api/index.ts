import { ResetPassword, chnagePassword, signupUser } from './auth/login';
import { loginUser } from './auth/login';
import { forgetPassOtp, getOtp } from './auth/sendOtp';
import { getChat, getChatList, getUnseenMessageCount } from './chat/chat';
import { getFilterList } from './filter/filter';
import { getNotification } from './notification/notificaton';
import { getALlPlans } from './subscriptionPlans/Plans';
import { addChoice } from './userChoice/addUserChoice';
import { getChoice } from './userChoice/getUserChoice';
import { unChoice } from './userChoice/unChoice';
import {
  updateUserDetails,
  getAllSuggestionUser,
  getLocationSuggestionUser,
  getMatchedSuggestionUser,
  searchUser,
  getUserInfo,
  updateUserImage,
  getActiveSuggestionUser,
} from './userDetails/userDetails';
import { updateUserMessageLimit } from './validatePayment/validatePayment';

export const api = {
  auth: {
    login: loginUser,
    signup: signupUser,
    getOtp: getOtp,
    forgetPassOtp: forgetPassOtp,
    chnagePassword: chnagePassword,
    ResetPassword: ResetPassword,
  },
  userDetails: {
    updateUser: updateUserDetails,
    getAllSuggestionUser: getAllSuggestionUser,
    getActiveSuggestionUser: getActiveSuggestionUser,
    getLocationSuggestionUser: getLocationSuggestionUser,
    getMatchedSuggestionUser: getMatchedSuggestionUser,
    searchUser: searchUser,
    getUserInfo: getUserInfo,
    updateUserImage: updateUserImage,
  },
  userChoice: {
    addChoice: addChoice,
    getChoice: getChoice,
    // unChoice:unChoice
  },
  chat: {
    getChat: getChat,
    getChatList: getChatList,
    getNotification: getNotification,
    getUnseenMessageCount: getUnseenMessageCount,
  },
  payment: {
    updateUserMessageLimit: updateUserMessageLimit,
    getALlPlans: getALlPlans,
  },
  filter: {
    getFilterList: getFilterList,
  },
};

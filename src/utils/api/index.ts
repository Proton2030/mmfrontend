import { ResetPassword, chnagePassword, signupUser } from './auth/login';
import { loginUser } from './auth/login';
import { forgetPassOtp, getOtp } from './auth/sendOtp';
import { getBlockList, unBlockUser } from './block/block';
import { getChat, getChatList, getUnseenMessageCount } from './chat/chat';
import { getFilterList } from './filter/filter';
import { getNotification } from './notification/notificaton';
import { getPaymentList, initPayment, validatePayment } from './payment/Payment';
import { reportAccount } from './report/report';
import { getAllPlans } from './subscriptionPlans/Plans';
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
  deleteUser,
  viewUserProfile,
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
    deleteUser: deleteUser,
    viewUserProfile,
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
    getAllPlans: getAllPlans,
    initPayment: initPayment,
    validatePayment: validatePayment,
    getPaymentList: getPaymentList,
  },
  filter: {
    getFilterList: getFilterList,
  },
  report: {
    reportAccount: reportAccount,
  },
  block: {
    getBlockList: getBlockList,
    unBlockUser: unBlockUser,
  },
};

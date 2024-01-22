import { chnagePassword, signupUser } from "./auth/login";
import { loginUser } from "./auth/login";
import { forgetPassOtp, getOtp } from "./auth/sendOtp";
import { getChat, getChatList } from "./chat/chat";
import { getNotification } from "./notification/notificaton";
import { addChoice } from "./userChoice/addUserChoice";
import { getChoice } from "./userChoice/getUserChoice";
import { unChoice } from "./userChoice/unChoice";
import { updateUserDetails,getAllSuggestionUser,getLocationSuggestionUser,getMatchedSuggestionUser, searchUser, getUserInfo, updateUserImage } from "./userDetails/userDetails";
import { updateUserMessageLimit } from "./validatePayment/validatePayment";


export const api = {
    auth:{
        login:loginUser,
        signup:signupUser,
        getOtp: getOtp,
        forgetPassOtp: forgetPassOtp,
        chnagePassword:chnagePassword
    },
    userDetails:{
        updateUser:updateUserDetails,
        getAllSuggestionUser:getAllSuggestionUser,
        getLocationSuggestionUser:getLocationSuggestionUser,
        getMatchedSuggestionUser:getMatchedSuggestionUser,
        searchUser:searchUser,
        getUserInfo:getUserInfo,
        updateUserImage:updateUserImage
    },
    userChoice:{
        addChoice:addChoice,
        getChoice:getChoice,
        // unChoice:unChoice
    },
    chat:{
        getChat:getChat,
        getChatList:getChatList,
        getNotification:getNotification
    },
    payment:{
        updateUserMessageLimit:updateUserMessageLimit
    }
}


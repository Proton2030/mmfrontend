import { signupUser } from "./auth/login";
import { loginUser } from "./auth/login";
import { getOtp } from "./auth/sendOtp";
import { getChat, getChatList } from "./chat/chat";
import { addChoice } from "./userChoice/addUserChoice";
import { getChoice } from "./userChoice/getUserChoice";
import { unChoice } from "./userChoice/unChoice";
import { updateUserDetails,getAllSuggestionUser,getLocationSuggestionUser,getMatchedSuggestionUser, searchUser, getUserInfo } from "./userDetails/userDetails";


export const api = {
    auth:{
        login:loginUser,
        signup:signupUser,
        getOtp: getOtp
    },
    userDetails:{
        updateUser:updateUserDetails,
        getAllSuggestionUser:getAllSuggestionUser,
        getLocationSuggestionUser:getLocationSuggestionUser,
        getMatchedSuggestionUser:getMatchedSuggestionUser,
        searchUser:searchUser,
        getUserInfo:getUserInfo
    },
    userChoice:{
        addChoice:addChoice,
        getChoice:getChoice,
        unChoice:unChoice
    },
    chat:{
        getChat:getChat,
        getChatList:getChatList
    }
}


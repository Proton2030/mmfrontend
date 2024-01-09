import { signupUser } from "./auth/login";
import { loginUser } from "./auth/login";
import { getOtp } from "./auth/sendOtp";
import { addChoice } from "./userChoice/addUserChoice";
import { getChoice } from "./userChoice/getUserChoice";
import { unChoice } from "./userChoice/unChoice";
import { getSuggestionUser, updateUserDetails } from "./userDetails/userDetails";


export const api = {
    auth:{
        login:loginUser,
        signup:signupUser,
        getOtp: getOtp
    },
    userDetails:{
        updateUser:updateUserDetails,
        getSuggestionUser:getSuggestionUser
    },
    userChoice:{
        addChoice:addChoice,
        getChoice:getChoice,
        unChoice:unChoice
    }
}


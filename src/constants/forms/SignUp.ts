import { IField } from "../../@types/types/FieldTypes.types";

export const SIGNUP_SCREEN_ONE:IField[]=[
    {
        id:"mobile",
        label:"Phone Number",
        placeHolder:"Enter Your Mobile Number Here",
        type:"NUMBER"
    }
]

export const SIGNUP_SCREEN_THREE:IField[]=[
    {
        id:"password",
        label:"Password",
        placeHolder:"Enter Your Password",
        type:"PASSWORD"
    },
    {
        id:"re-password",
        label:"Re enter Password",
        placeHolder:"Re-enter Your Password",
        type:"TEXT"
    },
]
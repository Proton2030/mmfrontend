import { IField } from "../../@types/types/FieldTypes.types";

export const LOGIN_SCREEN:IField[]=[
    {
        id:"userId",
        label:"Phone Number or Email",
        placeHolder:"Enter Your Mobile Number or Email",
        type:"TEXT"
    },
    {
        id:"password",
        label:"Password",
        placeHolder:"Enter Your Password Here",
        type:"PASSWORD"
    }
]
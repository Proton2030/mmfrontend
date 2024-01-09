import { IField } from "../../@types/types/FieldTypes.types";
import { COMMON_OPTIONS } from "../CommonOptions";
import { WeightRange, ageRange, heightRange } from "../ageHeightWeight";
import { districts_of_bangladesh } from "../bangladeshDistricts";
import { BODY_COLOR } from "../color";
import { USER_INFO_THREE } from "./UserInformation";

export const PARTNER_INFO_ONE :IField[]=[
    {
        id:"partner_age",
        label:"Partner Age",
        placeHolder:"Enter Your Partner Age",
        type:"SELECT",
        options:ageRange
    },
     {
        id:"partner_marital_status",
        label:"Partner Martial Status ",
        placeHolder:"",
        type:"SELECT",
        options:["MARRIED","UNMARRIED","DIVORCED"]
    },
    {
        id:"partner_state",
        label:"State",
        placeHolder:"Enter Your Partner's State",
        type:"SELECT",
        options:districts_of_bangladesh
    },
    {
        id:"partner_height",
        label:"Partner Height",
        placeHolder:"Enter Your Partner Height Here",
        type:"SELECT",
        options:heightRange
    },
    {
        id:"partner_weight",
        label:"Weight",
        placeHolder:"Enter Your Weight",
        type:"SELECT",
        options:WeightRange
    },
    {
        id:"partner_bodyColor",
        label:"Partner Body Color",
        placeHolder:"",
        type:"SELECT",
        options:BODY_COLOR
    }
]

export const PARTNER_INFO_TWO :IField[]=[
    {
        id:"education",
        label:"Education",
        placeHolder:"Enter Your Education",
        type:"TEXT"
    },
    {
        id:"islamic_education",
        label:"Islamic Education",
        placeHolder:"Enter Your Islamic Education",
        type:"TEXT"
    },
]

export const PARTNER_INFO_THREE:IField[]=[
    {
        id:"partner_salah",
        label:"Select Partner Salah",
        placeHolder:"",
        type:"SELECT",
        options:COMMON_OPTIONS

    },
    {
        id:"partner_hajab_maintain",
        label:"Select Partner Hijab",
        placeHolder:"",
        type:"SELECT",
        options:["YES","NO"]

    },
    {
        id:"partner_religious",
        label:"Select Partner Religious",
        placeHolder:"", 
        type:"SELECT",
        options:COMMON_OPTIONS
    },
]
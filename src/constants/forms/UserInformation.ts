import { IField } from "../../@types/types/FieldTypes.types";
import { COMMON_OPTIONS } from "../CommonOptions";
import { districts_of_bangladesh } from "../bangladeshDistricts";
import { BODY_COLOR, EYE_COLOR, HAIR_COLOR } from "../color";

export const USER_INFO_ONE : IField[] =[
    {
        id:"full_name",
        label:"Full Name",
        placeHolder:"Enter Your Full Name Here",
        type:"TEXT"
    },
    {
        id:"gender",
        label:"Gender",
        placeHolder:"Gender",
        type:"SELECT",
        options:["MALE","FEMALE"]
    },
    {
        id:"age",
        label:"Age",
        placeHolder:"Enter Your Age",
        type:"NUMBER"
    },
     {
        id:"marital_status",
        label:"What is your Martial Status ?",
        placeHolder:"",
        type:"SELECT",
        options:["MARRIED","UNMARRIED","DIVORCED","PARTNER DEATH"]
    },
    {
        id:"state",
        label:"District",
        placeHolder:"Enter Your District",
        type:"SELECT",
        options:districts_of_bangladesh
    },
    {
        id:"height",
        label:"Height",
        placeHolder:"Enter Your Height Here",
        type:"NUMBER"
    },
    {
        id:"weight",
        label:"Weight",
        placeHolder:"Enter Your Weight",
        type:"NUMBER"
    },
    {
        id:"body_color",
        label:"Body Color",
        placeHolder:"Body Colour",
        type:"SELECT",
        options:BODY_COLOR
    },
    {
        id:"eye_color",
        label:"Eye Color",
        placeHolder:"",
        type:"SELECT",
        options:EYE_COLOR
    },
    {
        id:"hair_color",
        label:"Hair Color",
        placeHolder:"",
        type:"SELECT",
        options:HAIR_COLOR
    }
]

export const USER_INFO_TWO : IField[] =[
    {
        id:"occupation",
        label:"Occupation",
        placeHolder:"Enter Your Occupation",
        type:"TEXT"
    },
    {
        id:"work_place",
        label:"Workplace",
        placeHolder:"Enter Your Workplace",
        type:"TEXT"
    },
    {
        id:"monthly_income",
        label:"Monthly Income",
        placeHolder:"Enter Your Workplace",
        type:"NUMBER"
    },
]

// .....education...

export const USER_INFO_THREE : IField[] =[
    
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

export const USER_INFO_FOUR : IField[] =[
    {
        id:"salah",
        label:"salah",
        placeHolder:"SELECT YOUR SALAH",
        type:"SELECT",
        options:["YES","NO"]
    },
    {
        id:"sawum",
        label:"sawum",
        placeHolder:"",
        type:"SELECT",
        options:["YES","NO"]
    },
    {
        id:"hajab_maintain",
        label:"Hajab Maintain",
        placeHolder:"Hajab Mantain",
        type:"SELECT",
        options:COMMON_OPTIONS
    },
    {
        id:"religious",
        label:"religious",
        placeHolder:"Select Your Religious",
        type:"SELECT",
        options:COMMON_OPTIONS
    },

]
export const USER_INFO_FIVE: IField[] =[
    {
        id:"fathers_name",
        label:"Fathers Name",
        placeHolder:"Enter Your Language",
        type:"TEXT"
    },
    {
        id:"fathers_occupation",
        label:"Fathers Occupation",
        placeHolder:"Enter Your Fathers Occupation",
        type:"TEXT"
    },
    {
        id:"mothers_name",
        label:"Mothers Name",
        placeHolder:"Enter Your Mothers Name",
        type:"TEXT"
    },
    {
        id:"mothers_occupation",
        label:"Mothers Occupation",
        placeHolder:"Enter Your Mothers Occupation",
        type:"TEXT"
    },
    {
        id:"no_of_brothers",
        label:"No Of Brothers",
        placeHolder:"0",
        type:"NUMBER"
    },
    {
        id:"no_of_sister",
        label:"No Of Sister",
        placeHolder:"0",
        type:"NUMBER"
    },
    {
        id:"total_family_member",
        label:"Total Family Members",
        placeHolder:"0",
        type:"NUMBER"
    },
    {
        id:"financial_condition",
        label:"Financial Condition",
        placeHolder:"0",
        type:"SELECT",
        options:COMMON_OPTIONS
    },

]


// salah
// sawum
// jaka
// haji
// umrah
// hajab_mantain
// coranic_knowledge
// coranic_reading_sahih
// coran_reading_habit
// hadith_knowledge
// hadith_reading_habit
// religous


// fathers_name
// fathers_occupation
// mothers_name
// mothers_occupation
// no_of_brothers
// no_of_sister
// total_family_members
// financial_condition

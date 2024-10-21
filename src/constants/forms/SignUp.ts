import { IField } from '../../@types/types/FieldTypes.types';

export const SIGNUP_SCREEN_ONE: IField[] = [
  {
    id: 'mobile',
    label: { ENGLISH: 'Phone Number', BENGALI: 'আপনার ফোন নম্বর দিন' },
    placeHolder: { ENGLISH: 'Enter Your Mobile Number Here', BENGALI: 'এখানে আপনার মোবাইল নম্বর দিন' },
    type: 'NUMBER',
  },
];

export const SIGNUP_SCREEN_THREE: IField[] = [
  {
    id: 'password',
    label: { ENGLISH: 'Password', BENGALI: 'পাসওয়ার্ড' },
    placeHolder: { ENGLISH: 'Enter Your Password', BENGALI: 'আপনার পাসওয়ার্ড লিখুন' },
    type: 'PASSWORD',
  },
  {
    id: 'rePassword',
    label: { ENGLISH: 'Re-enter Password', BENGALI: 'পুনরায় পাসওয়ার্ড লিখুন' },
    placeHolder: { ENGLISH: 'Re-enter Your Password', BENGALI: 'আপনার পাসওয়ার্ড পুনরায় লিখুন' },
    type: 'TEXT',
  },
];

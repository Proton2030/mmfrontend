import { IField } from '../../@types/types/FieldTypes.types';

export const LOGIN_SCREEN: IField[] = [
  {
    id: 'userId',
    label: { ENGLISH: 'Phone Number or Email', BENGALI: 'ফোন নাম্বার বা ইমেইল' },
    placeHolder: { ENGLISH: 'Enter Your Mobile Number or Email', BENGALI: 'আপনার মোবাইল নাম্বার বা ইমেইল লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'password',
    label: { ENGLISH: 'Password', BENGALI: 'পাসওয়ার্ড' },
    placeHolder: { ENGLISH: 'Enter Your Password Here', BENGALI: 'এখানে আপনার পাসওয়ার্ড লিখুন' },
    type: 'PASSWORD',
  },
];

import { IField } from '../../@types/types/FieldTypes.types';

export const LOGIN_SCREEN: IField[] = [
  {
    id: 'userId',
    label: { ENGLISH: 'Enter Your Phone Number', BENGALI: 'আপনার ফোন নাম্বার দিন' },
    placeHolder: { ENGLISH: 'Enter Your Mobile Number ', BENGALI: 'আপনার মোবাইল নাম্বার দিন' },
    type: 'TEXT',
  },
  {
    id: 'password',
    label: { ENGLISH: 'Enter Your Password', BENGALI: 'আপনার পাসওয়ার্ড দিন' },
    placeHolder: { ENGLISH: 'Enter Your Password Here', BENGALI: 'এখানে আপনার পাসওয়ার্ড দিন' },
    type: 'PASSWORD',
  },
];

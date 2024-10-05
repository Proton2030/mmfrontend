import { IField, IGroup } from '../../@types/types/FieldTypes.types';
import { COMMON_OPTIONS } from '../CommonOptions';
import { districts_of_bangladesh } from '../bangladeshDistricts';
import { BODY_COLOR, EYE_COLOR, HAIR_COLOR } from '../color';

export const HEIGHT_OPTIONS: any = [
  4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4,
  6.5, 6.6, 6.7, 6.8, 6.9, 7,
];

export const USER_INFO_ONE: (IField | IGroup)[] = [
  {
    id: 'full_name',
    label: { ENGLISH: 'Full Name', BENGALI: 'পূর্ণ নাম' },
    placeHolder: { ENGLISH: 'Enter Your Full Name Here', BENGALI: 'এখানে আপনার পূর্ণ নাম লিখুন' },
    type: 'TEXT',
  },
  {
    group: [
      {
        id: 'gender',
        label: { ENGLISH: 'Gender', BENGALI: 'লিঙ্গ' },
        placeHolder: { ENGLISH: 'Gender', BENGALI: 'লিঙ্গ' },
        type: 'SELECT',
        options: ['MALE', 'FEMALE'],
      },
      {
        id: 'age',
        label: { ENGLISH: 'Age', BENGALI: 'বয়স' },
        placeHolder: { ENGLISH: 'Enter Your Age', BENGALI: 'আপনার বয়স লিখুন' },
        type: 'NUMBER',
      },
    ],
  },
  {
    group: [
      {
        id: 'marital_status',
        label: { ENGLISH: 'Marital Status', BENGALI: 'বৈবাহিক অবস্থা' },
        placeHolder: { ENGLISH: '', BENGALI: '' },
        type: 'SELECT',
        options: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'PARTNER DEATH'],
      },
      {
        id: 'body_color',
        label: { ENGLISH: 'Body Color', BENGALI: 'শরীরের রঙ' },
        placeHolder: { ENGLISH: 'Body Colour', BENGALI: 'শরীরের রঙ' },
        type: 'SELECT',
        options: BODY_COLOR,
      },
    ],
  },
  {
    id: 'state',
    label: { ENGLISH: 'District', BENGALI: 'জেলা' },
    placeHolder: { ENGLISH: 'Enter Your District', BENGALI: 'আপনার জেলা লিখুন' },
    type: 'SELECT',
    options: districts_of_bangladesh,
  },
  {
    group: [
      {
        id: 'height',
        label: { ENGLISH: 'Height', BENGALI: 'উচ্চতা' },
        placeHolder: { ENGLISH: 'Enter Your Height Here', BENGALI: 'এখানে আপনার উচ্চতা লিখুন' },
        type: 'SELECT',
        options: HEIGHT_OPTIONS,
      },
      {
        id: 'weight',
        label: { ENGLISH: 'Weight(kg)', BENGALI: 'ওজন (কেজি)' },
        placeHolder: { ENGLISH: 'Enter Your Weight', BENGALI: 'আপনার ওজন লিখুন' },
        type: 'NUMBER',
        maxLength: 3,
      },
    ],
  },
];

export const PERSONAL_DETAILS: IField[] = [
  {
    id: 'full_name',
    label: { ENGLISH: 'Full Name', BENGALI: 'পূর্ণ নাম' },
    placeHolder: { ENGLISH: 'Enter Your Full Name Here', BENGALI: 'এখানে আপনার পূর্ণ নাম লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'age',
    label: { ENGLISH: 'Age', BENGALI: 'বয়স' },
    placeHolder: { ENGLISH: 'Enter Your Age', BENGALI: 'আপনার বয়স লিখুন' },
    type: 'NUMBER',
  },
  {
    id: 'gender',
    label: { ENGLISH: 'Gender', BENGALI: 'লিঙ্গ' },
    placeHolder: { ENGLISH: 'Gender', BENGALI: 'লিঙ্গ' },
    type: 'SELECT',
    options: ['MALE', 'FEMALE'],
  },
  {
    id: 'marital_status',
    label: { ENGLISH: 'Marital Status', BENGALI: 'বৈবাহিক অবস্থা' },
    placeHolder: { ENGLISH: '', BENGALI: '' },
    type: 'SELECT',
    options: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'PARTNER DEATH'],
  },
  {
    id: 'body_color',
    label: { ENGLISH: 'Body Color', BENGALI: 'শরীরের রঙ' },
    placeHolder: { ENGLISH: 'Body Colour', BENGALI: 'শরীরের রঙ' },
    type: 'SELECT',
    options: BODY_COLOR,
  },
  {
    id: 'state',
    label: { ENGLISH: 'District', BENGALI: 'জেলা' },
    placeHolder: { ENGLISH: 'Enter Your District', BENGALI: 'আপনার জেলা লিখুন' },
    type: 'SELECT',
    options: districts_of_bangladesh,
  },
  {
    id: 'height',
    label: { ENGLISH: 'Height', BENGALI: 'উচ্চতা' },
    placeHolder: { ENGLISH: 'Enter Your Height Here', BENGALI: 'এখানে আপনার উচ্চতা লিখুন' },
    type: 'NUMBER',
    maxLength: 3,
  },
  {
    id: 'weight',
    label: { ENGLISH: 'Weight', BENGALI: 'ওজন' },
    placeHolder: { ENGLISH: 'Enter Your Weight', BENGALI: 'আপনার ওজন লিখুন' },
    type: 'NUMBER',
    maxLength: 3,
  },
];

export const USER_INFO_TWO: IField[] = [
  {
    id: 'occupation',
    label: { ENGLISH: 'Occupation', BENGALI: 'পেশা' },
    placeHolder: { ENGLISH: 'Enter Your Occupation', BENGALI: 'আপনার পেশা লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'work_place',
    label: { ENGLISH: 'Workplace', BENGALI: 'কর্মস্থল' },
    placeHolder: { ENGLISH: 'Enter Your Workplace', BENGALI: 'আপনার কর্মস্থল লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'monthly_income',
    label: { ENGLISH: 'Monthly Income', BENGALI: 'মাসিক আয়' },
    placeHolder: { ENGLISH: 'Enter Your Monthly Income', BENGALI: 'আপনার মাসিক আয় লিখুন' },
    type: 'NUMBER',
    maxLength: 8,
  },
];

// .....education...

export const USER_INFO_THREE: IField[] = [
  {
    id: 'education',
    label: { ENGLISH: 'Education', BENGALI: 'শিক্ষা' },
    placeHolder: { ENGLISH: 'Enter Your Education', BENGALI: 'আপনার শিক্ষা লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'islamic_education',
    label: { ENGLISH: 'Islamic Education', BENGALI: 'ইসলামিক শিক্ষা' },
    placeHolder: { ENGLISH: 'Enter Your Islamic Education', BENGALI: 'আপনার ইসলামিক শিক্ষা লিখুন' },
    type: 'TEXT',
  },
];

export const USER_INFO_THREE_part2: IField[] = [
  {
    id: 'salah',
    label: { ENGLISH: 'Select Salah', BENGALI: 'সালাহ নির্বাচন করুন' },
    placeHolder: { ENGLISH: 'Select Salah', BENGALI: 'সালাহ নির্বাচন করুন' },
    type: 'SELECT',
    options: ['YES', 'NO'],
  },
  {
    id: 'sawum',
    label: { ENGLISH: 'Select Sawum', BENGALI: 'সাওম নির্বাচন করুন' },
    placeHolder: { ENGLISH: 'Select Sawum', BENGALI: 'সাওম নির্বাচন করুন' },
    type: 'SELECT',
    options: ['YES', 'NO'],
  },
];

export const USER_INFO_FOUR: IField[] = [
  {
    id: 'fathers_name',
    label: { ENGLISH: 'Fathers Name', BENGALI: 'বাবার নাম' },
    placeHolder: { ENGLISH: 'Enter Your Fathers Name', BENGALI: 'আপনার বাবার নাম লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'fathers_occupation',
    label: { ENGLISH: 'Fathers Occupation', BENGALI: 'বাবার পেশা' },
    placeHolder: { ENGLISH: 'Enter Your Fathers Occupation', BENGALI: 'আপনার বাবার পেশা লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'mothers_name',
    label: { ENGLISH: 'Mothers Name', BENGALI: 'মায়ের নাম' },
    placeHolder: { ENGLISH: 'Enter Your Mothers Name', BENGALI: 'আপনার মায়ের নাম লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'mothers_occupation',
    label: { ENGLISH: 'Mothers Occupation', BENGALI: 'মায়ের পেশা' },
    placeHolder: { ENGLISH: 'Enter Your Mothers Occupation', BENGALI: 'আপনার মায়ের পেশা লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'no_of_brothers',
    label: { ENGLISH: 'No Of Brothers', BENGALI: 'ভাইয়ের সংখ্যা' },
    placeHolder: { ENGLISH: '0', BENGALI: '০' },
    type: 'NUMBER',
    maxLength: 2,
  },
  {
    id: 'no_of_sisters',
    label: { ENGLISH: 'No Of Sisters', BENGALI: 'বোনের সংখ্যা' },
    placeHolder: { ENGLISH: '0', BENGALI: '০' },
    type: 'NUMBER',
    maxLength: 2,
  },
  {
    id: 'financial_condition',
    label: { ENGLISH: 'Financial Condition', BENGALI: 'আর্থিক অবস্থা' },
    placeHolder: { ENGLISH: 'Select Financial Condition', BENGALI: 'আর্থিক অবস্থা নির্বাচন করুন' },
    type: 'SELECT',
    options: COMMON_OPTIONS,
  },
];

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
// no_of_sisters
// total_family_members
// financial_condition

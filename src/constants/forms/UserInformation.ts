import { IField, IGroup } from '../../@types/types/FieldTypes.types';
import { COMMON_OPTIONS } from '../CommonOptions';
import { districts_of_bangladesh } from '../bangladeshDistricts';
import { BODY_COLOR, EYE_COLOR, HAIR_COLOR } from '../color';

export const HEIGHT_OPTIONS: any = [
  4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7,
  4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5,
  5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3,
  6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7
];


export const USER_INFO_ONE: (IField | IGroup)[] = [
  {
    id: 'full_name',
    label: 'Full Name',
    placeHolder: 'Enter Your Full Name Here',
    type: 'TEXT',
  },
  {
    group: [
      {
        id: 'age',
        label: 'Age',
        placeHolder: 'Enter Your Age',
        type: 'NUMBER',
      },
      {
        id: 'gender',
        label: 'Gender',
        placeHolder: 'Gender',
        type: 'SELECT',
        options: ['MALE', 'FEMALE'],
      },
    ],
  },
  {
    group: [
      {
        id: 'marital_status',
        label: 'What is your Martial Status ?',
        placeHolder: '',
        type: 'SELECT',
        options: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'PARTNER DEATH'],
      },
      {
        id: 'body_color',
        label: 'Body Color',
        placeHolder: 'Body Colour',
        type: 'SELECT',
        options: BODY_COLOR,
      },
    ],
  },
  {
    id: 'state',
    label: 'District',
    placeHolder: 'Enter Your District',
    type: 'SELECT',
    options: districts_of_bangladesh,
  },
  {
    group: [
      {
        id: 'height',
        label: 'Height',
        placeHolder: 'Enter Your Height Here',
        type: 'SELECT',
        options: HEIGHT_OPTIONS,
      },
      {
        id: 'weight',
        label: 'Weight',
        placeHolder: 'Enter Your Weight',
        type: 'NUMBER',
        maxLength: 3,
      },
    ],
  },
];

export const PERSONAL_DETAILS: IField[] = [
  {
    id: 'full_name',
    label: 'Full Name',
    placeHolder: 'Enter Your Full Name Here',
    type: 'TEXT',
  },

  {
    id: 'age',
    label: 'Age',
    placeHolder: 'Enter Your Age',
    type: 'NUMBER',
  },
  {
    id: 'gender',
    label: 'Gender',
    placeHolder: 'Gender',
    type: 'SELECT',
    options: ['MALE', 'FEMALE'],
  },
  {
    id: 'marital_status',
    label: 'What is your Martial Status ?',
    placeHolder: '',
    type: 'SELECT',
    options: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'PARTNER DEATH'],
  },
  {
    id: 'body_color',
    label: 'Body Color',
    placeHolder: 'Body Colour',
    type: 'SELECT',
    options: BODY_COLOR,
  },
  {
    id: 'state',
    label: 'District',
    placeHolder: 'Enter Your District',
    type: 'SELECT',
    options: districts_of_bangladesh,
  },
  {
    id: 'height',
    label: 'Height',
    placeHolder: 'Enter Your Height Here',
    type: 'NUMBER',
    maxLength: 3,
  },
  {
    id: 'weight',
    label: 'Weight',
    placeHolder: 'Enter Your Weight',
    type: 'NUMBER',
    maxLength: 3,
  },
];

export const USER_INFO_TWO: IField[] = [
  {
    id: 'occupation',
    label: 'Occupation',
    placeHolder: 'Enter Your Occupation',
    type: 'TEXT',
  },
  {
    id: 'work_place',
    label: 'Workplace',
    placeHolder: 'Enter Your Workplace',
    type: 'TEXT',
  },
  {
    id: 'monthly_income',
    label: 'Monthly Income',
    placeHolder: 'Enter Your Workplace',
    type: 'NUMBER',
    maxLength: 8,
  },
];

// .....education...

export const USER_INFO_THREE: IField[] = [
  {
    id: 'education',
    label: 'Education',
    placeHolder: 'Enter Your Education',
    type: 'TEXT',
  },
  {
    id: 'islamic_education',
    label: 'Islamic Education',
    placeHolder: 'Enter Your Islamic Education',
    type: 'TEXT',
  },
];

export const USER_INFO_THREE_part2: IField[] = [
  {
    id: 'salah',
    label: 'salah',
    placeHolder: 'SELECT YOUR SALAH',
    type: 'SELECT',
    options: ['YES', 'NO'],
  },
  {
    id: 'sawum',
    label: 'sawum',
    placeHolder: '',
    type: 'SELECT',
    options: ['YES', 'NO'],
  },
];

export const USER_INFO_FOUR: IField[] = [
  {
    id: 'fathers_name',
    label: 'Fathers Name',
    placeHolder: 'Enter Your Fathers Name',
    type: 'TEXT',
  },
  {
    id: 'fathers_occupation',
    label: 'Fathers Occupation',
    placeHolder: 'Enter Your Fathers Occupation',
    type: 'TEXT',
  },
  {
    id: 'mothers_name',
    label: 'Mothers Name',
    placeHolder: 'Enter Your Mothers Name',
    type: 'TEXT',
  },
  {
    id: 'mothers_occupation',
    label: 'Mothers Occupation',
    placeHolder: 'Enter Your Mothers Occupation',
    type: 'TEXT',
  },
  {
    id: 'no_of_brothers',
    label: 'No Of Brothers',
    placeHolder: '0',
    type: 'NUMBER',
    maxLength: 2,
  },
  {
    id: 'no_of_sisters',
    label: 'No Of Sister',
    placeHolder: '0',
    type: 'NUMBER',
    maxLength: 2,
  },
  {
    id: 'financial_condition',
    label: 'Financial Condition',
    placeHolder: '0',
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

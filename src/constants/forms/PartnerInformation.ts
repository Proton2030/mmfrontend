import { IField } from '../../@types/types/FieldTypes.types';
import { COMMON_OPTIONS } from '../CommonOptions';
import { WeightRange, ageRange, heightRange } from '../ageHeightWeight';
import { districts_of_bangladesh } from '../bangladeshDistricts';
import { BODY_COLOR } from '../color';
import { USER_INFO_THREE } from './UserInformation';

export const PARTNER_INFO_ONE: IField[] = [
  {
    id: 'partner_age',
    label: { ENGLISH: 'Partner Age', BENGALI: 'সঙ্গীর বয়স' },
    placeHolder: { ENGLISH: 'Enter Your Partner Age', BENGALI: 'আপনার সঙ্গীর বয়স লিখুন' },
    type: 'SELECT',
    options: ageRange,
  },
  {
    id: 'partner_marital_status',
    label: { ENGLISH: 'Partner Marital Status', BENGALI: 'সঙ্গীর বৈবাহিক অবস্থা' },
    placeHolder: { ENGLISH: '', BENGALI: '' },
    type: 'SELECT',
    options: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'PARTNER DEATH'],
  },
  {
    id: 'partner_state',
    label: { ENGLISH: 'District', BENGALI: 'জেলা' },
    placeHolder: { ENGLISH: "Enter Your Partner's State", BENGALI: 'আপনার সঙ্গীর জেলা লিখুন' },
    type: 'SELECT',
    options: districts_of_bangladesh,
  },
  {
    id: 'partner_height',
    label: { ENGLISH: 'Partner Height', BENGALI: 'সঙ্গীর উচ্চতা' },
    placeHolder: { ENGLISH: 'Enter Your Partner Height Here', BENGALI: 'আপনার সঙ্গীর উচ্চতা লিখুন' },
    type: 'SELECT',
    options: heightRange,
  },
  {
    id: 'partner_weight',
    label: { ENGLISH: 'Weight', BENGALI: 'ওজন' },
    placeHolder: { ENGLISH: 'Enter Your Weight', BENGALI: 'আপনার ওজন লিখুন' },
    type: 'SELECT',
    options: WeightRange,
  },
  {
    id: 'partner_bodyColor',
    label: { ENGLISH: 'Partner Body Color', BENGALI: 'সঙ্গীর গায়ের রং' },
    placeHolder: { ENGLISH: '', BENGALI: '' },
    type: 'SELECT',
    options: BODY_COLOR,
  },
];

export const PARTNER_INFO_TWO: IField[] = [
  {
    id: 'partner_education',
    label: { ENGLISH: 'Education', BENGALI: 'শিক্ষা' },
    placeHolder: { ENGLISH: 'Enter Your Education', BENGALI: 'আপনার শিক্ষা লিখুন' },
    type: 'TEXT',
  },
  {
    id: 'partner_islamic_education',
    label: { ENGLISH: 'Islamic Education', BENGALI: 'ইসলামিক শিক্ষা' },
    placeHolder: { ENGLISH: 'Enter Your Islamic Education', BENGALI: 'আপনার ইসলামিক শিক্ষা লিখুন' },
    type: 'TEXT',
  },
];

export const PARTNER_INFO_THREE: IField[] = [
  {
    id: 'partner_salah',
    label: { ENGLISH: 'Select Partner Salah', BENGALI: 'সঙ্গীর সালাহ নির্বাচন করুন' },
    placeHolder: { ENGLISH: '', BENGALI: '' },
    type: 'SELECT',
    options: ['YES', 'NO'],
  },
];

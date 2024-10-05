export interface IField {
  id: string;
  type: 'TEXT' | 'NUMBER' | 'PASSWORD' | 'SELECT' | 'RADIO';
  label: { ENGLISH: string; BENGALI: string };
  placeHolder: { ENGLISH: string; BENGALI: string };
  options?: string[];
  maxLength?: number;
}
export interface IGroup {
  group: IField[];
}

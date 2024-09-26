import { IField, IGroup } from '../types/FieldTypes.types';

export interface ICenterFormProps {
  fieldList: (IField | IGroup)[];
  object: any;
  handleChangeText: (field: string, type: string, text: string) => void;
}

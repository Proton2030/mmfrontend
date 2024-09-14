import { IUserDetails } from '../types/userDEtails.types';

export interface ISignupScreenProps {
  handleChangeScreen: () => void;
  handleChangeText: (field: string, type: string, text: string) => void;
  userDetails: any;
  loading: boolean;
  error?: boolean;
  mode: 'SIGNUP' | 'FORGET';
}

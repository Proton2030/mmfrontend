import { IUserDetails } from '../types/userDEtails.types';

export interface ISignupScreenProps {
  handleChangeScreen: () => void;
  handleChangeText: (field: string, type: string, text: string) => void;
  otp?: string;
  userDetails: any;
  loading: boolean;
  handleGenerateOtp?: () => Promise<void>;
  error?: boolean;
  mode: 'SIGNUP' | 'FORGET';
}

import CryptoJS from 'crypto-js';
import { ENCRYPTION_DECRYPTION_KEY } from '../../config/config';

export const encryptText = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, ENCRYPTION_DECRYPTION_KEY).toString();
  return encrypted;
};

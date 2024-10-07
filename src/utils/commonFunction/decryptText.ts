import CryptoJS from 'crypto-js';
import { ENCRYPTION_DECRYPTION_KEY } from '../../config/config';

export const decryptText = (encryptedText: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_DECRYPTION_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

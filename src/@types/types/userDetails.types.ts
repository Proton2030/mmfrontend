import { IUserInfo } from './userInfo.types';
import { IUserPartnerInfo } from './userPartnerInfo';

export interface IUserDetails extends IUserInfo, IUserPartnerInfo {
  updatedAt: any;
  _id?: string;
  email: string;
  mobile: string;
  password: string;
  acount_status: 'ACTIVE' | 'INACTIVE';
}

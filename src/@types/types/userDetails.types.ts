import { IUserInfo } from './userInfo.types';
import { IUserPartnerInfo } from './userPartnerInfo';

export interface IUserDetails extends IUserInfo, IUserPartnerInfo {
  updatedAt: any;
  _id?: string;
  email: string;
  mobile: string;
  password: string;
  view_count?: number;
  acount_status: 'ACTIVE' | 'INACTIVE';
  is_verified: boolean;
  createdAt: Date;
  account_privet: boolean
}

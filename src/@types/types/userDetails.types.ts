import { IUserInfo } from "./userInfo.types";
import { IUserPartnerInfo } from "./userPartnerInfo";

export interface IUserDetails extends IUserInfo,IUserPartnerInfo{
	_id?:string,
    full_name: string,
	email: string,
	mobile: string,
	password: string,
}
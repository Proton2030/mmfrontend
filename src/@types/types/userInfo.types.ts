export interface IUserInfo {
  full_name: string;
  gender: string;
  age: number;
  marital_status: string;
  country: string;
  state: string;
  height: number;
  weight: number;
  body_color: string;
  occupation: string;
  work_place: string;
  monthly_income: string;
  education: string;
  islamic_education: string;
  salah: string;
  sawum: string;
  fathers_name: string;
  fathers_occupation: string;
  mothers_name: string;
  mothers_occupation: string;
  no_of_brothers: number;
  no_of_sisters: number;
  financial_condition: string;
  status: string;
  profile_image_url: string | null;
  message_limit: number;
  device_token?: string;
}

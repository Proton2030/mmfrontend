
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { get } = request;

const initialRoute = "/sms";
export const getOtp = async (filter: any) => {
	try {
		const endpoint = `${initialRoute}/generate-otp`;
		const response = await get(
			endpoint,
			{
				...headers,
			},
            filter
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.get.succ) {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error: any) {
		console.log(error);
		throw error;
	}
};
export const forgetPassOtp = async (filter: any) => {
	try {
		const endpoint = `${initialRoute}/forget-password`;
		const response = await get(
			endpoint,
			{
				...headers,
			},
            filter
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.get.succ) {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error: any) {
		console.log(error);
		throw error;
	}
};


import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { post,patch } = request;

const initialRoute = "/auth";
export const loginUser = async (payload: any) => {
	try {
		console.log("---->try to login")
		const endpoint = `${initialRoute}/login`;
		const response = await post(
			endpoint,
            payload,
			{
				...headers,
			}
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.post.succ) {
				const {
					data: { result }
				} = response;
				console.log("--------->user result",result);
				return result;
			}
		}
		throw new Error();
	} catch (error: any) {
		console.log(error);
		throw error;
	}
};
export const signupUser = async (payload: any) => {
	try {
		const endpoint = `${initialRoute}/signup`;
		const response = await post(
			endpoint,
            payload,
			{
				...headers,
			}
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.post.succ) {
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
export const chnagePassword = async (payload: any) => {
	try {
		const endpoint = `${initialRoute}/update-password-by-phone`;
		const response = await patch(
			endpoint,
            payload,
			{
				...headers,
			}
		);
		// console.log("----->response",response?.data.result);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.patch.succ) {
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
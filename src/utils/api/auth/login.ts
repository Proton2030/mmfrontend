
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { post } = request;

const initialRoute = "/auth";
export const loginUser = async (payload: any) => {
	try {
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
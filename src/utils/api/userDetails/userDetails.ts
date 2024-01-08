
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { patch,get } = request;

const initialRoute = "/user";
export const updateUserDetails = async (payload: any) => {
	try {
		const endpoint = `${initialRoute}/update-user-details`;
		const response = await patch(
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

export const getSuggestionUser = async (filter: any) => {
	try {
		const endpoint = `${initialRoute}/get-user-suggestion`;
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
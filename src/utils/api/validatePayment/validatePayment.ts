
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { patch } = request;

const initialRoute = "/user";
export const updateUserMessageLimit = async (payload: any) => {
	try {
		const endpoint = `${initialRoute}/update-user-message-limit`;
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
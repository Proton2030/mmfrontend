import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { get } = request;

const initialRoute = "/chat";

export const getNotification = async (userId: any) => {
	try {
		const endpoint = `${initialRoute}/get-notification`;
		const response = await get(
			endpoint,
			{
				...headers,
			},
            userId
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

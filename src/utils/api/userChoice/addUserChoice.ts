
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { post } = request;

const initialRoute = "/choice";
export const addChoice = async (payload: any) => {
	try {
		const endpoint = `${initialRoute}/send-request`;
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
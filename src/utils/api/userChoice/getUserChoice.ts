
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { get } = request;

const initialRoute = "/choice";
export const getChoice = async (filter: any) => {
	try {
		const endpoint = `${initialRoute}/choice-match-list`;
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
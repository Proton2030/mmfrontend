
import {headers} from "../../../config/config"
import { MESSAGE } from "../../../constants/api/message";
import { request } from "../api";

const { del } = request;

const initialRoute = "/choice";
export const unChoice = async (choiceId:string) => {
	try {
		const endpoint = `${initialRoute}/unchoice/${choiceId}`;
		const response = await del(
			endpoint,
			{
				...headers,
			}
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.delete.succ) {
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
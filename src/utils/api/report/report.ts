import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { post, get } = request;

const initialRoute = 'report';


export const reportAccount = async (payload: FormData) => {
    try {
        const endpoint = `${initialRoute}/report_account`;
        const response = await post(
            endpoint,
            payload,
            {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
            'BASE',
        );
        if (response) {
            const {
                data: { message },
            } = response;
            if (message === MESSAGE.post.succ) {
                const {
                    data: { result },
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
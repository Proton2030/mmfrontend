import { Payload } from '../../../@types/api/api.types';
import { headers } from '../../../config/config';
import { MESSAGE } from '../../../constants/api/message';
import { request } from '../api';

const { get, patch } = request;

const initialRoute = 'block';

export const unBlockUser = async (payload: any) => {
    try {
        const endpoint = `${initialRoute}/unblock_account`;
        const response = await patch(
            endpoint,
            payload,
            {
                ...headers,
            },
        );
        if (response) {
            const {
                data: { message },
            } = response;
            if (message === MESSAGE.patch.succ) {
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


export const getBlockList = async (filter: any) => {
    try {
        const endpoint = `${initialRoute}/get_block_account`;
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
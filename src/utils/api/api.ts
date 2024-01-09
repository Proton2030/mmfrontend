import axios from "axios";
import { Endpoint, Headers, Params, Payload } from "../../@types/api/api.types";
import { port, url,version } from "../../config/config";


const get = async (endpoint: Endpoint, headers: Headers, params: Params = {}) => {
	try {
		const response = await axios.get(`${url}:${port}/api/${version}/${endpoint}`, {
			headers,
			params
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const post = async (endpoint: Endpoint, payload: Payload, headers: Headers) => {
	try {
		const response = await axios.post(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const put = async (endpoint: Endpoint, payload: Payload, headers: Headers) => {
	try {
		const response = await axios.put(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const patch = async (endpoint: Endpoint, payload: Payload, headers: Headers) => {
	try {
		const response = await axios.patch(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const del = async (endpoint: Endpoint, headers: Headers) => {
	try {
		const response = await axios.delete(`${url}:${port}/api/${version}/${endpoint}`, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

export const request = {
	fetch,
	get,
	post,
	put,
	patch,
	del
};

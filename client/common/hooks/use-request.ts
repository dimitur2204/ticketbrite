import { useState } from 'react';
import axios from 'axios';

export type Method = 'get' | 'delete' | 'post' | 'put' | 'patch';

export interface UseRequestProps {
	url: string;
	method: Method;
	onSuccess: () => any;
}

export default function useRequest<B>({
	url,
	method,
	onSuccess,
}: UseRequestProps) {
	const [errors, setErrors] = useState(null);
	const doRequest = async (body: B) => {
		try {
			const response = await axios[method](url, body);
			onSuccess();
			return response.data;
		} catch (err) {
			console.log(err);
			setErrors(err.response.data.errors);
		}
	};

	return { doRequest, errors };
}

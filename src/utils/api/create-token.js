import { API_METHODS, API_ROUTES } from 'src/static/api';
import { getHeaders } from './utils';

const getBody = () => {
	return {
		user_id: process.env.USER_ID,
		credentials: process.env.CREDENTIALS,
	};
};

const createToken = async () => {
	try {
		const body = getBody();
		const headers = getHeaders();
		const response = await fetch(`${process.env.UAT_URL}${API_ROUTES.token}`, {
			method: API_METHODS.post,
			headers,
			body: JSON.stringify(body),
		});
		const responseJson = await response.json();
		return responseJson.token;
	} catch (err) {
		throw new Error(err);
	}
};

export default createToken;

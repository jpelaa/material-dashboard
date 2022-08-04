import { API_METHODS, API_ROUTES } from 'src/static/api';
import { getHeaders } from './utils';

const oAuthToken = async () => {
	try {
		const url = `${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.oAuthToken}`;
		const headers = getHeaders();
		const body = {
			user_id: process.env.NEXT_PUBLIC_USER_ID,
			credentials: process.env.NEXT_PUBLIC_CREDENTIALS,
		};
		console.log({ headers }, ' request oAuthToken ');
		const response = await fetch(url, {
			method: API_METHODS.post,
			headers,
			body: JSON.stringify(body),
		});
		console.log(response, '  response createToken ');
		if (response.status === 200) {
			const responseJson = await response.json();
			// localStorage.setItem('access_token', responseJson.access_token);
			return responseJson.token;
		} else {
			throw new Error(JSON.stringify(response));
		}
	} catch (err) {
		throw new Error(err);
	}
};

export default oAuthToken;

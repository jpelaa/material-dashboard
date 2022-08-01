import { API_METHODS, API_ROUTES } from 'src/static/api';
import { getBasicAuthorizationHeader, getHeaders } from './utils';

const createToken = async () => {
	try {
		const url = `${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.token}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&grant_type=${process.env.NEXT_PUBLIC_GRANT_TYPE}`;
		const partialHeaders = getHeaders();
		const authorizationHeader = getBasicAuthorizationHeader();
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(url, {
			method: API_METHODS.post,
			headers,
			mode: 'no-cors',
		});
		if (response.status === 200) {
			const responseJson = await response.json();
			localStorage.setItem('access_token', responseJson.access_token);
		} else {
			throw new Error(response);
		}
	} catch (err) {
		throw new Error(err);
	}
};

export default createToken;

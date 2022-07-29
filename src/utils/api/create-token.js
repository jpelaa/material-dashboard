import { API_METHODS, API_ROUTES } from 'src/static/api';
import { getBasicAuthorizationHeader, getHeaders } from './utils';

const createToken = async () => {
	try {
		const url = `${process.env.API_URL}${API_ROUTES.token}?client_id=${process.env.CLIENT_ID}&grant_type=${process.env.GRANT_TYPE}`;
		const partialHeaders = getHeaders();
		const authorizationHeader = getBasicAuthorizationHeader();
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(url, {
			method: API_METHODS.post,
			headers,
		});
		console.log(response, ' response create token ');

		if (response.status === 200) {
			const responseJson = await response.json();
			// localStorage.setItem('access_token', responseJson.access_token);
			return responseJson.access_token;
		} else {
			throw new Error(response.status);
		}
	} catch (err) {
		throw new Error(err);
	}
};

export default createToken;

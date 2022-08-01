import { API_METHODS, API_ROUTES } from 'src/static/api';
import createToken from './create-token';
import { getBearerAuthorizationHeader, getHeaders } from './utils';

const getBody = ({ currentDate }) => {
	return {
		currentDate,
	};
};

const retrieveUserData = async ({ token, currentDate }) => {
	try {
		const body = getBody({ currentDate });
		const partialHeaders = getHeaders();
		const authorizationHeader = getBearerAuthorizationHeader(token);
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.retrieveUserData}`,
			{
				method: API_METHODS.post,
				headers,
				body: JSON.stringify(body),
				mode: 'no-cors',
			}
		);
		if (response.status === 401) {
			await createToken();
			const access_token = localStorage.getItem('access_token');
			retrieveUserData({ token: access_token });
		} else if (response.status === 200) {
			const responseJson = await response.json();
			return responseJson;
		} else {
			throw new Error(response);
		}
	} catch (err) {
		throw new Error(err);
	}
};

export default retrieveUserData;

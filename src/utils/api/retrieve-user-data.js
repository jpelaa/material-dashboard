import { API_METHODS, API_ROUTES } from 'src/static/api';
import { formatDDMMMYYYY } from '../date';
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
		const response = await fetch(API_ROUTES.retrieveUserData, {
			method: API_METHODS.post,
			headers,
			body: JSON.stringify(body),
		});
		if (response.status === 401) {
			// const access_token =
			await createToken();
			const access_token = localStorage.getItem('access_token');
			await retrieveUserData({
				token: access_token,
				currentDate: formatDDMMMYYYY(new Date()),
			});
		} else if (response.status === 200) {
			const responseJson = await response.json();
			return responseJson;
		} else {
			throw new Error(JSON.stringify(response));
		}
	} catch (err) {
		throw new Error(err);
	}
};

export default retrieveUserData;

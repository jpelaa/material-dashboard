import { API_METHODS, API_ROUTES } from 'src/static/api';
import { formatDDMMMYYYY } from '../date';
import { getAuthorizationHeaderValue, getHeaders } from './utils';

const getBody = () => {
	const date = new Date();
	return {
		currentDate: formatDDMMMYYYY(date),
	};
};

const retrieveUserData = async ({ token }) => {
	try {
		const body = getBody();
		const partialHeaders = getHeaders();
		const authorizationHeader = getAuthorizationHeaderValue(token);
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(
			`${process.env.API_URL}${API_ROUTES.retrieveUserData}`,
			{
				method: API_METHODS.post,
				headers,
				body: JSON.stringify(body),
			}
		);
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		throw new Error(err);
	}
};

export default retrieveUserData;

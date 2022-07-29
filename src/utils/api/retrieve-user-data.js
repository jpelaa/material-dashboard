import { API_METHODS, API_ROUTES } from 'src/static/api';
import { formatDDMMMYYYY } from '../date';
import createToken from './create-token';
import { getBearerAuthorizationHeader, getHeaders } from './utils';

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
		const authorizationHeader = getBearerAuthorizationHeader(token);
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(
			`${process.env.API_URL}${API_ROUTES.retrieveUserData}`,
			{
				method: API_METHODS.post,
				headers,
				body: JSON.stringify(body),
			}
		);
		console.log(response, ' response retried User data ');
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

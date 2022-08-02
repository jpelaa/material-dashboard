import { API_METHODS, API_ROUTES } from 'src/static/api';
import createToken from './create-token';
import { getBearerAuthorizationHeader, getHeaders } from './utils';

const getBody = (requestBody) => {
	return requestBody;
};

const sendEmail = async ({ token, requestBody }) => {
	try {
		const body = getBody(requestBody);
		const partialHeaders = getHeaders();
		const authorizationHeader = getBearerAuthorizationHeader(token);
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.sendEmail}`,
			{
				method: API_METHODS.post,
				headers,
				body: JSON.stringify(body),
				mode: 'no-cors',
			}
		);
		if (response.status === 401) {
			const access_token = await createToken();
			// const access_token = localStorage.getItem('access_token');
			await sendEmail({
				token: access_token,
				requestBody: {},
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

export default sendEmail;

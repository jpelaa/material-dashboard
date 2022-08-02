import { API_METHODS, API_ROUTES } from 'src/static/api';
import createToken from './create-token';
import { getBearerAuthorizationHeader, getHeaders } from './utils';

const getBody = ({ hotelCode, roomNumber }) => {
	return {
		in_hotel_code: hotelCode,
		in_room_no: roomNumber,
	};
};

const revokeKey = async ({ token, hotelCode, roomNumber }) => {
	try {
		const body = getBody({ hotelCode, roomNumber });
		const partialHeaders = getHeaders();
		const authorizationHeader = getBearerAuthorizationHeader(token);
		const headers = { ...partialHeaders, ...authorizationHeader };
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.revokeKey}`,
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
			await revokeKey({
				token: access_token,
				hotelCode,
				roomNumber,
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

export default revokeKey;

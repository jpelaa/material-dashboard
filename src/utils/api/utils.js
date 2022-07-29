import { CONTENT_TYPES } from 'src/static/api';

export const getHeaders = () => {
	return {
		'Content-Type': CONTENT_TYPES.json,
		'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
	};
};

export const getBasicAuthorizationHeader = () => {
	return {
		Authorization: `Basic ${process.env.BASIC_TOKEN}`,
	};
};

export const getBearerAuthorizationHeader = (token) => {
	return {
		Authorization: `Bearer ${token}`,
	};
};

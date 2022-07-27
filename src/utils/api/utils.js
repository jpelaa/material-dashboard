import { CONTENT_TYPES } from 'src/static/api';

export const getHeaders = () => {
	return {
		'Content-Type': CONTENT_TYPES.json,
		'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
	};
};

export const getAuthorizationHeaderValue = (token) => {
	return {
		Authorization: `Bearer ${token}`,
	};
};

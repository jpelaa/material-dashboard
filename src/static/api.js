const API_URL = `${process.env.NEXT_PUBLIC_SERVER}/api`;
const SUB_ROUTE_URL = 'pushnotification/1.0/push-notification';

export const API_ROUTES = {
	token: `${API_URL}/authentication/token`,
	retrieveUserData: `${SUB_ROUTE_URL}/retrive-userData`,
	sendEmail: `${SUB_ROUTE_URL}/sendEmail/secondaryKey`,
	revokeKey: '/hotels/keys/v1/assa-abloy-revoke-key',
	oAuthToken: '/jumeirah/oauth/v1/token',
};

export const API_METHODS = {
	post: 'POST',
	get: 'GET',
};

export const CONTENT_TYPES = {
	json: 'application/json',
};

export const API_STATUS = {
	loading: 'loading',
	failed: 'failed',
	done: 'done',
	initial: 'initial',
};

export const ERROR_MESSAGES = {
	500: 'Something Went Wrong Try Again Later',
	empty: 'No Data Available',
};

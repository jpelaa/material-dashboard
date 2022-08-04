import {
	GUEST_TYPES,
	REQUESTED_STATUS_TYPES,
} from 'src/static/mobile-key-status';
import createToken from './api/create-token';
import oAuthToken from './api/oauth-token';
import revokeKey from './api/revoke-key';
import sendEmail from './api/send-email';
import { formatddMMyyyy24Hours } from './date';

export const getPrimaryEmailId = (rows) => {
	let primaryEmailId = '';
	const row = rows.find((data) => data.guestType === GUEST_TYPES.primary);
	if (row && row.emailId) {
		primaryEmailId = row.emailId;
	}
	return primaryEmailId;
};

export const getRequestBody = (row) => {
	let requestBody = {};
	if (row.requestBody) {
		requestBody = JSON.parse(row.requestBody);
		delete requestBody.guestEmailId;
	}
	return requestBody;
};

export const updateStatus = async ({ rows, row, id, status }) => {
	try {
		// let token;
		console.log({ row, id, status, rows }, ' updateStatus ');
		// const access_token = localStorage.getItem('access_token');
		// if (access_token) {
		// 	token = access_token;
		// } else {
		// token = await createToken();
		// 	token = localStorage.getItem('access_token');
		// }
		const requestBody = getRequestBody(row);
		console.log(requestBody, ' requestBody ');
		if (status === REQUESTED_STATUS_TYPES.revoked) {
			const token = await oAuthToken();
			await revokeKey({
				token,
				hotelCode: requestBody.hotelCode,
				roomNumber: requestBody.roomNumber,
			});
		}
		const primaryEmailId = getPrimaryEmailId(rows);
		const req = {
			primaryEmailId,
			approvalStatus: status.toUpperCase(),
			secondaryEmailId: id,
			approvalTime: formatddMMyyyy24Hours(new Date()),
			...requestBody,
		};
		console.log(req, ' req ');
		const token = await createToken();
		await updateStatusForUser({ token, requestBody: req });
	} catch (err) {
		console.error(err.message);
		throw new Error(err.message);
	}
};

export const updateStatusForUser = async ({ token, requestBody }) =>
	new Promise((resolve, reject) => {
		sendEmail({ token, requestBody }).then((response) => {
			if (response.status === 200) {
				resolve();
			} else {
				reject();
			}
		});
	});

import {
	GUEST_TYPES,
	REQUESTED_STATUS_TYPES,
} from 'src/static/mobile-key-status';
import createToken from './api/create-token';
import revokeKey from './api/revoke-key';
import sendEmail from './api/send-email';

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
	}
	return requestBody;
};

export const updateStatus = async ({ rows, row, id, status }) => {
	try {
		let token;
		// const access_token = localStorage.getItem('access_token');
		// if (access_token) {
		// 	token = access_token;
		// } else {
		token = await createToken();
		// 	token = localStorage.getItem('access_token');
		// }
		const requestBody = getRequestBody(row);

		if (status.toLowerCase() === REQUESTED_STATUS_TYPES.revoked) {
			await revokeKey({
				token,
				hotelCode: requestBody.hotelCode,
				roomNumber: requestBody.roomNumber,
			});
		}
		const primaryEmailId = getPrimaryEmailId(rows);
		const req = {
			primaryEmailId,
			approvalStatus: status,
			secondaryEmailId: id,
			approvalTime: new Date(),
			...requestBody,
		};
		await updateStatusForUser({ token, requestBody: req });
	} catch (err) {
		throw new Error(err.message);
	}
};

export const updateStatusForUser = async ({ token, requestBody }) => {
	return Promise(async (resolve, reject) => {
		const response = await sendEmail({ token, requestBody });
		if (response.status === 200) {
			resolve();
		} else {
			reject();
		}
	});
};

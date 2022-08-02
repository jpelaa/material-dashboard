import { PALETTE_TYPES } from './styles';

export const MOBILE_KEY_STATUS_BY_ID = {
	overAllStatus: 'overAllStatus',
	bookingId: 'bookingId',
	reservationId: 'reservationId',
	checkInChannel: 'checkInChannel',
	roomNumber: 'roomNumber',
	guestName: 'guestName',
	checkInDate: 'checkInDate',
	checkOutdate: 'checkOutdate',
	noOfNights: 'noOfNights',
};

export const MOBILE_KEY_STATUS_TABLE_HEADER = [
	{
		id: 'overAllStatus',
		label: 'Overall Status',
		filterEnabled: true,
	},
	{
		id: 'bookingId',
		label: 'External Booking Ref.',
		filterEnabled: true,
	},
	{
		id: 'reservationId',
		label: 'Reservation Id',
		filterEnabled: true,
	},
	{
		id: 'checkInChannel',
		label: 'Check-in Channel',
		filterEnabled: true,
	},
	{
		id: 'roomNumber',
		label: 'Room Number',
		filterEnabled: true,
	},
	{
		id: 'guestName',
		label: 'Guest Name',
		filterEnabled: true,
	},
	{
		id: 'checkInDate',
		label: 'Check-in Date',
		filterEnabled: true,
	},
	{
		id: 'checkOutdate',
		label: 'Check-out Date',
		filterEnabled: true,
	},
	{
		id: 'noOfNights',
		label: 'Night(s)',
		filterEnabled: true,
	},
	{
		id: 'mobileKeys',
		label: 'Mobile Keys',
		caption: ' (Issued/Requested)',
		filterEnabled: false,
	},
	{
		id: 'action',
		label: 'Action',
		filterEnabled: false,
	},
];

export const MOBILE_KEY_ISSUANCE_SUMMARY_TABLE_HEADER = [
	{
		id: 'sNo',
		label: 'S.No',
	},
	{
		id: 'email',
		label: 'Email',
	},
	{
		id: 'guestType',
		label: 'Guest Type',
	},
	{
		id: 'requestedOn',
		label: 'Requested On',
	},
	{
		id: 'requestStatus',
		label: 'Requested Status',
	},
	{
		id: 'responseDateTime',
		label: 'Response Date Time',
	},
	{
		id: 'responseBy',
		label: 'Response By',
	},
	{
		id: 'comment',
		label: 'Comments',
	},
];

export const OVERALL_STATUS = {
	pending: 'pending',
	complete: 'complete',
};

export const GUEST_TYPES = {
	primary: 'PRIMARY',
	secondary: 'SECONDARY',
};

export const REQUESTED_STATUS_TYPES = {
	approved: 'approved',
	rejected: 'rejected',
	revoked: 'revoked',
	approvalPending: 'approval_pending',
};

export const STATUS_TEXT = {
	[REQUESTED_STATUS_TYPES.approved]: 'Approve',
	[REQUESTED_STATUS_TYPES.rejected]: 'Reject',
	[REQUESTED_STATUS_TYPES.revoked]: 'Revoke',
};

export const REQUESTED_STATUS_COLORS_BY_KEY = {
	[REQUESTED_STATUS_TYPES.approved]: PALETTE_TYPES.success,
	[REQUESTED_STATUS_TYPES.rejected]: PALETTE_TYPES.error,
	[REQUESTED_STATUS_TYPES.revoked]: PALETTE_TYPES.info,
};

export const TRANSITION_LIST_BY_KEY = {
	[REQUESTED_STATUS_TYPES.approved]: [REQUESTED_STATUS_TYPES.revoked],
	[REQUESTED_STATUS_TYPES.rejected]: [REQUESTED_STATUS_TYPES.approved],
	[REQUESTED_STATUS_TYPES.revoked]: [REQUESTED_STATUS_TYPES.approved],
};

import { MOBILE_KEY_STATUS_BY_ID } from 'src/static/mobile-key-status';
import { formatYYYYMMDD } from './date';
import { OVERALL_STATUS } from 'src/static/mobile-key-status';
import { PALETTE_TYPES } from 'src/static/styles';
import createToken from './api/create-token';
import retrieveUserData from './api/retrieve-user-data';

export const getUserData = async ({ currentDate }) => {
	let token;
	// const access_token = localStorage.getItem('access_token');
	// if (access_token) {
	// 	token = access_token;
	// } else {
	token = await createToken();
	// 	token = localStorage.getItem('access_token');
	// }
	const response = await retrieveUserData({ token, currentDate });
	if (response.UserDetailsList && response.UserDetailsList.length > 0) {
		return response.UserDetailsList;
	} else {
		return [];
	}
};

const getColorBasedOnStatus = (overAllStatus) => {
	const overAllStatusLowerCased = overAllStatus.toLowerCase();
	if (overAllStatusLowerCased === OVERALL_STATUS.pending) {
		return PALETTE_TYPES.warning;
	} else if (overAllStatusLowerCased === OVERALL_STATUS.complete) {
		return PALETTE_TYPES.success;
	} else {
		return PALETTE_TYPES.secondary;
	}
};

const getLabel = ({
	mobileKeyRequested,
	mobileKeyIssued,
	mobileKeyRejected,
}) => {
	return mobileKeyRequested === mobileKeyIssued + mobileKeyRejected
		? OVERALL_STATUS.complete
		: OVERALL_STATUS.pending;
};

export const getLabelAndColorBasedData = ({
	mobileKeyRequested,
	mobileKeyIssued,
	mobileKeyRejected,
}) => {
	const label = getLabel({
		mobileKeyRequested,
		mobileKeyIssued,
		mobileKeyRejected,
	});
	const color = getColorBasedOnStatus(label);
	return {
		label,
		color,
	};
};

export const filterCol = ({ arr, filters, data }) => {
	const bool = [];
	arr.forEach((filterKey) => {
		if (filters[filterKey]) {
			const filterInLowerCase = filters[filterKey].toLowerCase().trim();
			if (
				[
					MOBILE_KEY_STATUS_BY_ID.checkInDate,
					MOBILE_KEY_STATUS_BY_ID.checkOutdate,
				].includes(filterKey)
			) {
				const dateFormatted = formatYYYYMMDD(data[filterKey]);
				bool.push(dateFormatted.indexOf(filterInLowerCase) > -1);
			} else if (data[filterKey]) {
				const dataInLowerCase = data[filterKey].toString().toLowerCase().trim();
				bool.push(dataInLowerCase.indexOf(filterInLowerCase) > -1);
			}
		}
	});
	return bool;
};

export const filterAll = ({ arr, filters, commonFilterValue }) => {
	return arr.filter((data) => {
		const filterKeyArr = Object.keys(filters);
		if (commonFilterValue.length > 0 || filterKeyArr.length > 0) {
			if (commonFilterValue.length > 0) {
				const keys = Object.keys(MOBILE_KEY_STATUS_BY_ID);
				const filtersForCommonFilter = keys.reduce((acc, currentKey) => {
					acc[currentKey] = commonFilterValue;
					return acc;
				}, {});
				const bool = filterCol({
					arr: keys,
					filters: filtersForCommonFilter,
					data,
				});
				return bool.some(Boolean);
			}
			if (filterKeyArr.length > 0) {
				const bool = filterCol({ arr: filterKeyArr, filters, data });
				return bool.every(Boolean);
			}
		} else {
			return true;
		}
	});
};

export function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

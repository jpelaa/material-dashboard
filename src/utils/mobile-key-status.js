import { MOBILE_KEY_STATUS_BY_ID } from 'src/static/mobile-key-status';
import { formatYYYYMMDD } from './date';

export const getGuestName = ({ salutation, firstName, lastName }) =>
	`${salutation}.${firstName} ${lastName}`;

export const filterCol = ({ arr, filters, data }) => {
	const bool = [];
	arr.forEach((filterKey) => {
		if (filters[filterKey]) {
			const filterInLowerCase = filters[filterKey].toLowerCase().trim();
			if (filterKey === MOBILE_KEY_STATUS_BY_ID.guestName) {
				const guestNameInLowerCase = getGuestName(data).toLowerCase().trim();
				bool.push(guestNameInLowerCase.indexOf(filterInLowerCase) > -1);
			} else if (
				[
					MOBILE_KEY_STATUS_BY_ID.checkInDate,
					MOBILE_KEY_STATUS_BY_ID.checkOutDate,
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

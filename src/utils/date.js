import { format } from 'date-fns';

const YYYY_MM_DD = 'yyyy-MM-dd';

const DD_MM_YYYY = 'dd/MM/yyyy';

export const formatDDMMMYYYY = (dateString) => {
	const date = new Date(dateString);
	return format(date, 'dd MMM yyyy');
};

export const formatYYYYMMDD = (dateString) => {
	const date = new Date(dateString);
	return format(date, YYYY_MM_DD);
};

export const formatYYYYMMDDWith12hoursAMPM = (dateString) => {
	try {
		const date = new Date(dateString);
		return format(date, `${YYYY_MM_DD} p`);
	} catch (err) {
		return dateString;
	}
};

export const formatddMMyyyy24Hours = (date) => {
	try {
		return format(date, `${DD_MM_YYYY} kk:mm:ss`);
	} catch (err) {
		return date;
	}
};

export const formatddMMyyyy = (dateString) => {
	const date = new Date(dateString);
	return format(date, DD_MM_YYYY);
};

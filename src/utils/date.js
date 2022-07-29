import { format } from 'date-fns';

const YYYY_MM_DD = 'yyyy-MM-dd';

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

export const formatddMMyyyy = (dateString) => {
	const date = new Date(dateString);
	return format(date, 'dd/MM/yyyy');
};

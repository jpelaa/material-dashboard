import { format } from 'date-fns';

const YYYY_MM_DD = 'yyyy-MM-dd';

export const formatDDMMMYYYY = (date) => format(date, 'dd MMM yyyy');

export const formatYYYYMMDD = (date) => format(date, YYYY_MM_DD);

export const formatYYYYMMDDWith12hoursAMPM = (date) =>
	format(date, `${YYYY_MM_DD} p`);

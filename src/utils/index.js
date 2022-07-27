import { OVERALL_STATUS } from 'src/static/mobile-key-status';
import { PALETTE_TYPES } from 'src/static/styles';

export const getColorBasedOnStatus = (overAllStatus) => {
	const overAllStatusLowerCased = overAllStatus.toLowerCase();
	if (overAllStatusLowerCased === OVERALL_STATUS.pending) {
		return PALETTE_TYPES.warning;
	} else if (overAllStatusLowerCased === OVERALL_STATUS.complete) {
		return PALETTE_TYPES.success;
	} else {
		return PALETTE_TYPES.secondary;
	}
};

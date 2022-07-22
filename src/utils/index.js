import { OVERALL_STATUS, PALETTE_TYPES } from "src/static/constants"

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

export const getColorBasedOnStatus = (overAllStatus) => {
    if (overAllStatus.toLowerCase() === "incomplete") {
        return "warning.main"
    } else if (overAllStatus.toLowerCase() === "complete") {
        return "success.main"
    } else {
        return "secondary.main"
    }
}

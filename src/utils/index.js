export const getColorBasedOnStatus = (overAllStatus) => {
    if (overAllStatus.toLowerCase() === "incomplete") {
        return "warning"
    } else if (overAllStatus.toLowerCase() === "complete") {
        return "success"
    } else {
        return "secondary"
    }
}

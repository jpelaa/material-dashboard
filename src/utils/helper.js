export function debounce(func, timeout = 100) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export const getFirstLetterCapitalizedRestInLowerCase = (text) =>
	text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

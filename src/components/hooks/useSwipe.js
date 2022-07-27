import { useEffect } from 'react';
import { DIRECTIONS } from 'src/static/constants';
import { debounce } from 'src/utils/helper';

function useSwipe(handler) {
	useEffect(() => {
		const processChange = debounce((event) => listener(event));
		const listener = (event) => {
			event.preventDefault();
			if (event.deltaY === 0) {
				const swipeDirection =
          event.deltaX > 0 ? DIRECTIONS.left : DIRECTIONS.right;
				handler(swipeDirection);
			}
		};
		document.addEventListener('mousewheel', processChange);
		return () => {
			document.removeEventListener('mousewheel', processChange);
		};
	}, [handler]);
}

export default useSwipe;

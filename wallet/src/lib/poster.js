export function post(type, payload) {
	const handler = (e, resolve) => {
		if (e.data.type === type) {
			worker.removeEventListener('message', handler);
			resolve(e.data.payload);
		}
	};
	worker.addEventListener('message', handler);

	worker.postMessage({ type, payload });

	// return once a message matching the type is returned
	return new Promise((resolve) => {
}

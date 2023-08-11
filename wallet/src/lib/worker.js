//  web worker to generate key
import wasm from '../../../crates/seed-bindgen/Cargo.toml';

export let generate, encrypt, decrypt;

async function init() {
	if (!import.meta.env.SSR) {
		({ generate, encrypt, decrypt } = await wasm());
		console.log('wasm ready', { generate, encrypt, decrypt });
	}
}

init();

// set up web worker messaging
onmessage = async (e) => {
	const { type, payload } = e.data;
	let result;

	// loop until functions have been initialized
	while (!generate || !encrypt || !decrypt) {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	switch (type) {
		case 'generate':
			result = await generate(payload.pin, payload.label);
			break;
		case 'encrypt':
			result = await encrypt(payload.key, payload.data);
			break;
		case 'decrypt':
			console.log('decrypting', payload);
			result = await decrypt(payload.key, payload.data);
			break;
		default:
			break;
	}
	postMessage({ type, payload: result });
};

import wasm from '../../../crates/seed-bindgen/Cargo.toml';

export let generate, encrypt, decrypt;

async function init() {
	if (!import.meta.env.SSR) {
		// 	const wasm = await import('../../../crates/seed-bindgen/Cargo.toml');
		({ generate, encrypt, decrypt } = await wasm());
		console.log('wasm ready', { generate, encrypt, decrypt });
	}
}

init();

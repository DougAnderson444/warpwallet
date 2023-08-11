import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import basicSsl from '@vitejs/plugin-basic-ssl';
import svgLoader from 'vite-svg-loader';
import preprocess from 'svelte-preprocess';
import rust from '@wasm-tool/rollup-plugin-rust';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		rust({
			inlineWasm: true
		}),
		svelte({
			preprocess: preprocess()
		}),
		// basicSsl(),
		viteSingleFile(),
		svgLoader({
			defaultImport: 'raw'
		})
	],
	build: {
		cssCodeSplit: false,
		assetsInlineLimit: 2097152, // 2MB = 1024 * 1024 * 2 = 2097152
		rollupOptions: {
			plugins: [
				rust({
					inlineWasm: true // needed here for build step 
				})
			]
		}
	},
	// no strict fs server
	server: {
		fs: {
			strict: false
		}
	},
	// worker format
	worker: {
		format: 'es'
	}
});

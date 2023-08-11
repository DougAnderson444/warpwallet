import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs';

// 1. read the `wallet/dist/index.html` as String
// 2. read `wallet/template.js` as string
// 3. replace %%index%% in template.js with the read string contents of index.html
// 4. save it to static/wallet.js

// ./wallet/dist/index.html
const index = fs.readFileSync('./wallet/dist/index.html', 'utf-8');

// find match for `new Worker(new URL("/assets/worker-85623606.js"`, convert URL data to Blob, load Blob instead of link
// 1. Find match
const match = index.match(/new Worker\(new URL\("(.*).js"/);

console.log(match[1]);

// 2. Get the URL
const url = match[1];

// 3. Get the file, read from ./wallet/[url]
const workerFile = fs.readFileSync(`./wallet/dist${url}.js`, 'utf-8');

// 4. Convert to Blob
// const blob = new Blob([workerFile], { type: 'application/javascript' });

// 5. Convert to base64
const blobBase64 = btoa(workerFile);

// 6. Replace the URL with the base64
const indexWithBlob = index.replace(
	url + '.js',
	`data:application/javascript;base64,${blobBase64}`
);

// 7. Convert indexWithBlob to base64
const encoded = btoa(indexWithBlob);

// ./template.js
const template = fs.readFileSync('./wallet/template.js', 'utf-8');

const wallet = template.replace('%%index%%', encoded);

// TODO: instead of 'wallet.js', encode as Sha2-256 base32 CID, see: https://cid.ipfs.tech/#QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF
// or, offer the integrity as a IPFS link?
fs.writeFileSync('static/wallet.js', wallet);

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		fs: {
			strict: false
		}
	}
});

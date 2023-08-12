<script lang="ts">
	import './app.css';
	import { onMount, tick } from 'svelte';
	import svelteLogo from './assets/svelte.svg?raw';
	import viteLogo from '/vite.svg?raw';
	import Pin from './lib/Pin.svelte';
	import Progress from './lib/Progress.svelte';

	let seed;
	let label = '';
	let encrypted;
	let urlFragment;
	let processing = false;
	let worker;
	let send;

	onMount(async () => {
		// on mount, show the pin page
		// user chooses a PIN, or Skips this step (dangerous though)
		// then we generate the seed, encrypt it with the PIN, and store it in location href (URL)
		// to use it, decrypt with same pin
		worker = new Worker(new URL('./lib/worker.js', import.meta.url), {
			type: 'module'
		});

		// helper function to post message to worker and process responses
		send = (type, payload) => {
			return new Promise((resolve) => {
				const handler = (e) => {
					if (e.data.type === type) {
						resolve(e.data.payload);
						worker.removeEventListener('message', handler);
					}
				};
				worker.onmessage = handler;
				worker.postMessage({ type, payload });
			});
		};

		urlFragment = location.hash.substring(1);
		if (urlFragment) {
			// there is already a seed stored within the URL
			({ label, encrypted } = JSON.parse(decodeURI(urlFragment)));
			encrypted = new Uint8Array(encrypted);
		}
	});

	async function processPin(event) {
		// user has entered a Label and a PIN
		let label = event.detail.label;
		let pin = event.detail.pin;
		processing = true;

		if (pin && label && encrypted) {
			// decrypt it with the PIN
			let key = await send('generate', { pin, label });
			seed = await send('decrypt', { key, data: new Uint8Array(encrypted) });
		} else {
			// we create a new seed
			seed = new Uint8Array(32);
			crypto.getRandomValues(seed);

			// generate an encryption key from the PIN (password) and label (salt)
			let key = new Uint8Array(await send('generate', { pin, label }));

			// use that deterministic key to encrypt the seed (data)
			encrypted = Array.from(await send('encrypt', { key, data: seed }));

			// and we store it in the URL fragment
			history.pushState(
				0,
				'0',
				location.href + '#' + encodeURI(JSON.stringify({ label, encrypted }))
			);
		}
		processing = false;
	}
</script>

<svelte:head>
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!-- Homescreen icons -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<!-- center the div hor and vert  -->
<div class="flex flex-col items-center justify-center h-screen p-2">
	<div class="text-3xl my-8 font-sans tracking-tight">Self-Wallet App</div>

	<div class="flex flex-col items-center justify-center">
		<div class="text-2xl font-sans tracking-tight items-center justify-center">Label</div>
		<input
			placeholder="My main wallet"
			class="p-2 my-2 border rounded-lg w-full bg-gray-50"
			bind:value={label}
		/>
	</div>
	{#if !seed && !processing}
		<Pin {label} on:pin={processPin} />
	{:else if processing}
		Generating your Secure Seed...
		<Progress />
	{:else}
		<div class="flex flex-col items-center justify-center">
			<div class="text-2xl font-sans tracking-tight items-center justify-center">Seed</div>
			<div class="p-2 m-2 border rounded-lg w-full bg-gray-50">
				{seed.join(' ')}
			</div>
		</div>
	{/if}
</div>

<style>
	/* inputs that are not 'submit' types */
	input:not([type='submit']) {
		@apply px-4 py-2 my-1 rounded border w-full mb-2 bg-slate-100 border-slate-300;
	}
</style>

<script>
	// @ts-nocheck

	import { onMount, createEventDispatcher } from 'svelte';

	export let label;

	let pin = '';
	// let generate = '';

	const dispatch = createEventDispatcher();

	onMount(async () => {
		// ({ generate, encrypt, decrypt } = await wasm());
	});

	function handleNumber(event) {
		// extend PIN
		pin += event.target.innerText;
	}

	function handleSubmit(event) {
		// let key = generate(pin, label);
		console.log('submit', { pin, label });
		dispatch('pin', { label, pin });
	}
</script>

<!-- Show PIN Pad number buttons, Enter and Skip -->

<div class="flex flex-col items-center justify-center">
	<div class="pin__header">
		<p class="my-2 w-full justify-center align-middle text-center">
			{#if pin.length > 0}
				<div class="p-2 border rounded-lg w-full bg-gray-50">
					<!-- only show the last Number, all other leading numbers convert to * -->
					{#each pin.split('').map((n, i) => (i === pin.length - 1 ? n : '*')) as pin}
						{pin}
					{/each}
				</div>
			{:else}
				<h1 class="pin__title">PIN</h1>
			{/if}
		</p>
	</div>
	<div class="pin__pad">
		<div class="pin__pad__row">
			<button class="pin__pad__button" on:click={handleNumber}>1</button>
			<button class="pin__pad__button" on:click={handleNumber}>2</button>
			<button class="pin__pad__button" on:click={handleNumber}>3</button>
		</div>
		<div class="pin__pad__row">
			<button class="pin__pad__button" on:click={handleNumber}>4</button>
			<button class="pin__pad__button" on:click={handleNumber}>5</button>
			<button class="pin__pad__button" on:click={handleNumber}>6</button>
		</div>
		<div class="pin__pad__row">
			<button class="pin__pad__button" on:click={handleNumber}>7</button>
			<button class="pin__pad__button" on:click={handleNumber}>8</button>
			<button class="pin__pad__button" on:click={handleNumber}>9</button>
		</div>
		<div class="pin__pad__row flex">
			<div class="w-20" />
			<button class="pin__pad__button" on:click={handleNumber}>0</button>
			<div class="w-20" />
		</div>
		<div class="pin__pad__row">
			<button
				class="bg-blue-500 w-full text-white px-4 py-2 my-1 rounded shadow"
				disabled={!label || pin.length < 1}
				on:click={handleSubmit}>Enter</button
			>
		</div>
		<!-- <div class="pin__pad__row mt-2">
			<div class="m-2">If you want to risk it:</div>
			<button class="bg-amber-500 rounded p-2 shadow text-white">Skip</button>
		</div> -->
	</div>
</div>

<style>
	.pin__header {
		@apply flex flex-col items-center justify-center;
	}

	.pin__title {
		@apply text-2xl font-sans tracking-tight;
	}

	.pin__pad {
		@apply flex flex-col items-center justify-center;
	}

	.pin__pad__row {
		@apply flex flex-row justify-between w-full space-x-2;
	}

	.pin__pad__button {
		@apply px-4 py-2 my-1 rounded border w-full mb-2 bg-slate-100 border-slate-300;
	}
</style>

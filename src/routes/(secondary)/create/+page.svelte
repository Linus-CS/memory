<script lang="ts">
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { onMount } from 'svelte';

	let value: string;
	let success: boolean | undefined;

	let exists: boolean = false;

	onMount(() => {
		async function ping() {
			try {
				const res = await fetch(`${PUBLIC_API_ENDPOINT}/ping`, {
					credentials: 'include',
					mode: 'cors',
					cache: 'no-cache'
				});
				if (res.ok) {
					exists = true;
				} else exists = false;
			} catch (_) {
				exists = false;
			}
		}
		ping();
	});

	async function sendCreate() {
		try {
			const res = await fetch(`${PUBLIC_API_ENDPOINT}/create?id=${value}`, {
				method: 'POST',
				credentials: 'include',
				mode: 'cors'
			});
			if (res.ok) success = true;
			else success = false;
		} catch (error) {
			success = false;
		}
	}

	async function sendDelete() {
		try {
			const res = await fetch(`${PUBLIC_API_ENDPOINT}/delete`, {
				method: 'POST',
				credentials: 'include',
				mode: 'cors'
			});
			if (res.ok) exists = false;
		} catch (error) {
			success = false;
		}
	}
</script>

<div class="flex flex-col items-center justify-center mt-32">
	{#if success === true}
		<h2 class="mb-3 text-lime-400">Spiel wurde erstellt!</h2>
	{:else if success === false}
		<h2 class="mb-3 text-red-600">Spiel konnte nicht erstellt werden!</h2>
	{/if}
	{#if exists}
		<p class="mt-3 text-white">Spiel existiert bereits!</p>
		<button on:click={sendDelete} class="bg-black mt-3 rounded p-2">Löschen</button>
	{:else}
		<input
			type="text"
			bind:value
			class="rounded h-8 p-2 text-black"
			placeholder="Name des Spiels "
		/>
		<button on:click={sendCreate} class="bg-black mt-3 rounded p-2">Erstellen</button>
	{/if}
</div>

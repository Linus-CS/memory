<script lang="ts">
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';

	let value: string;
	let success: boolean | undefined;

	async function create() {
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
</script>

<div class="flex flex-col items-center justify-center mt-32">
	{#if success === true}
		<h2 class="mb-3 text-lime-400">Spiel wurde erstellt!</h2>
	{:else if success === false}
		<h2 class="mb-3 text-red-600">Spiel konnte nicht erstellt werden!</h2>
	{/if}
	<input type="text" bind:value class="rounded h-8 p-2 text-black" placeholder="Name des Spiels " />
	<button on:click={create} class="bg-black mt-3 rounded p-2">Erstellen</button>
</div>

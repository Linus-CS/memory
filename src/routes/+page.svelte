<script lang="ts">
	import '../app.css';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';

	import JoinInput from './JoinInput.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	// Make a request to server and only show join if game exists
	async function getGameId() {
		return 1;
		const res = await fetch(`${PUBLIC_API_ENDPOINT}/ping`);
		const id = await res.text();
		const gameId = parseInt(id);
		if (res.ok && !isNaN(gameId)) return gameId;
		else throw new Error('No game found');
	}

	const promise = getGameId();

	async function joinWithName(event: CustomEvent<string>) {
		// Request server with name and set cookie for token
	}
</script>

<h1 class="text-center primary-font text-7xl mt-56">Memory</h1>
<div class="flex flex-col items-center justify-center mt-10">
	{#await promise}
		<LoadingSpinner />
	{:then gameId}
		<JoinInput {gameId} on:join={joinWithName} />
	{:catch error}
		<p class="text-center text-2xl mb-4">
			Momentan gibt es kein Spiel, dem beigetreten werden kann.
		</p>
	{/await}
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

	:global(html) {
		background-color: #98a6d4;
		color: white;
	}

	:global(.primary-font) {
		font-family: 'Staatliches', cursive;
	}

	:global(.secondary-font) {
		font-family: 'Poppins', sans-serif;
	}
</style>

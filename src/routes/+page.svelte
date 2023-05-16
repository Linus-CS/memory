<script lang="ts">
	import '../app.css';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { goto } from '$app/navigation';

	import JoinInput from './JoinInput.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import CreateGame from './CreateGame.svelte';
	import { onMount } from 'svelte';

	export let data;
	let id: string;
	let unavailable: boolean = false;

	// Make a request to server and only show join if game exists
	onMount(async () => {
		try {
			const res = await fetch(`http://${PUBLIC_API_ENDPOINT}/ping`);
			const game_id = await res.json();
			if (res.ok) id = game_id;
			else unavailable = true;
		} catch (_) {
			unavailable = true;
		}
	});

	async function joinWithName(event: CustomEvent<string>) {
		console.log('Joining with name' + event.detail);
		const res = await fetch(`http://${PUBLIC_API_ENDPOINT}/join?name=${event.detail}&id=${id}`, {
			method: 'POST'
		});
		console.log('joined');
		if (res.ok) {
			goto(`/game/${id}`);
		}
	}
</script>

<h1 class="text-center primary-font text-7xl mt-56">Memory</h1>
<div class="flex flex-col items-center justify-center mt-10">
	{#if id === undefined && !unavailable}
		<LoadingSpinner />
	{:else if !unavailable}
		<JoinInput on:join={joinWithName} />
	{:else}
		<p class="text-center text-2xl mb-4">
			Momentan gibt es kein Spiel, dem beigetreten werden kann.
		</p>
	{/if}
	{#if data.master_key !== undefined}
		<CreateGame />
	{/if}
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

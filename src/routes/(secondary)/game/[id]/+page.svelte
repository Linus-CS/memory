<script lang="ts">
	import '../../../../app.css';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import Cards from './Cards.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import type { Player } from '../../../../types';
	import { onMount } from 'svelte';

	let running = true;
	let ready = false;
	let openCards: Map<number, string> = new Map();
	let hiddenCards: Array<number> = [];
	let players: Array<Player> = [];
	let eventSrc: EventSource;

	$: players.sort((a, b) => b[1] - a[1]);

	onMount(() => {
		eventSrc = new EventSource(`${PUBLIC_API_ENDPOINT}/game`, {
			withCredentials: true
		});
		eventSrc.addEventListener('leaderboard', (event) => {
			let data = JSON.parse(event.data);
			players = data.players;
		});

		eventSrc.addEventListener('flipCard', (event) => {
			let data = JSON.parse(event.data);
			openCards.set(data.card_id, data.img_path);
			openCards = openCards;
		});

		eventSrc.addEventListener('gameOver', (event) => {
			console.log(event.data);
		});

		eventSrc.addEventListener('state', (event) => {
			const data = JSON.parse(event.data);
			players = data.players;
			ready = data.ready;
			running = data.game_state == 'Running';
			for (const [card_id, img_path] of data.flipped) {
				openCards.set(card_id, img_path);
			}
			openCards = openCards;
			hiddenCards = data.hidden;
		});

		return () => {
			eventSrc.close();
		};
	});

	async function makeReady() {
		const res = await fetch(`${PUBLIC_API_ENDPOINT}/ready`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors'
		});
		if (res.ok) ready = true;
	}
</script>

<div class="lg:grid lg:grid-cols-5 mt-8 w-full h-full">
	<div class="mb-8 mx-16 lg:mt-0 mt-10">
		<Leaderboard {players} />
		{#if !ready && !running}
			<button on:click={makeReady} class="bg-green-500 rounded p-2 mt-8 hover:bg-green-400"
				>Bereit</button
			>
		{/if}
	</div>
	<div class="col-span-3 m-auto mx-4">
		<Cards {hiddenCards} {openCards} />
	</div>
</div>

<script lang="ts">
	import '../../../../app.css';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { page } from '$app/stores';
	import Cards from './Cards.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import type { Player } from '../../../../types';

	let turn = true;
	let openCards: Array<number> = [];
	let players: Array<Player> = [];
	$: players.sort((a, b) => b.points - a.points);

	const eventSrc = new EventSource(`//${PUBLIC_API_ENDPOINT}/${$page.params.id}`, {
		withCredentials: true
	});

	eventSrc.addEventListener('leaderboard', (event) => {
		console.log(event.data);
	});

	eventSrc.addEventListener('flipCard', (event) => {
		console.log(event.data);
	});

	eventSrc.addEventListener('turn', (event) => {
		console.log(event.data);
	});

	eventSrc.addEventListener('gameOver', (event) => {
		console.log(event.data);
	});
</script>

<div class="grid grid-cols-5 mt-8 w-full h-full">
	<div class="mx-auto">
		<Leaderboard {players} />
	</div>
	<div class="col-span-3 m-auto">
		<Cards {openCards} lock={!turn} />
	</div>
</div>

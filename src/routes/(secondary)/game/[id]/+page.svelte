<script lang="ts">
	import '../../../../app.css';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { page } from '$app/stores';
	import Cards from './Cards.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import type { Player } from '../../../../types';
	import { onMount } from 'svelte';

	let running = true;
	let turn = false;
	let ready = false;
	let openCards: Array<number> = [];
	let players: Array<Player> = [];
	$: players.sort((a, b) => b.points - a.points);

	onMount(() => {
		async function check_state() {
			const res = await fetch(`${PUBLIC_API_ENDPOINT}/state`, {
				credentials: 'include',
				mode: 'cors'
			});
			const json = await res.json();
			running = json.game_state == 'Running';
			ready = json.ready;
		}

		check_state();
	});

	async function makeReady() {
		let res = await fetch(`${PUBLIC_API_ENDPOINT}/ready`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors'
		});

		if (res.ok) ready = true;
		turn = true;
	}

	const eventSrc = new EventSource(`${PUBLIC_API_ENDPOINT}/game`, {
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
		console.log(event.data.turn);
		turn = event.data.turn;
	});

	eventSrc.addEventListener('gameOver', (event) => {
		console.log(event.data);
	});
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
		<Cards {openCards} lock={!turn} />
	</div>
</div>

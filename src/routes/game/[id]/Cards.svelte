<script lang="ts">
	import { page } from '$app/stores';
	import Card from './Card.svelte';

	export let openCards: Array<number> = [];
	export let lock = false;
	let hideCards: Array<number> = [];
	let cards = [...Array(54).keys()];

	const gameId = $page.params.id;

	function handleCardClick(event: CustomEvent<number>) {
		openCards.push(event.detail);
		closeCards();
	}

	$: closeCards();

	function closeCards() {
		if (openCards.length === 2) {
			lock = true;
			// Send request with ids of both cards to server
			const pair = false;
			if (!pair) {
				setTimeout(() => {
					openCards = [];
					lock = false;
				}, 2000);
			} else {
				setTimeout(() => {
					hideCards = [...hideCards, ...openCards];
					openCards = [];
					lock = false;
				}, 1000);
			}
		}
	}
</script>

<div class="grid grid-cols-9 gap-5">
	{#each cards as card}
		<Card
			on:cardClicked={handleCardClick}
			id={card}
			hide={hideCards.includes(card)}
			reveal={openCards.includes(card)}
			locked={lock}
		/>
	{/each}
</div>

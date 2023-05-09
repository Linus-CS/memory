<script lang="ts">
	import Card from './Card.svelte';

	let cards = [...Array(54).keys()];
	let openCards: Array<number> = [];
	let hideCards: Array<number> = [];
	let lock = false;

	function handleCardClick(event: CustomEvent<number>) {
		openCards.push(event.detail);
		if (openCards.length === 2) {
			lock = true;
			// Send request with ids of both cards to server
			const pair = true;
			if (!pair) {
				setTimeout(() => {
					openCards = [];
					lock = false;
				}, 2000);
			} else {
				setTimeout(() => {
					hideCards.push(...openCards);
					openCards = [];
					lock = false;
					console.log(hideCards);
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

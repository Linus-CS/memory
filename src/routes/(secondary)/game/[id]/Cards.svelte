<script lang="ts">
	import Card from './Card.svelte';

	export let openCards: Map<number, string> = new Map();
	export let hiddenCards: Array<number> = [];
	let cards = [...Array(54).keys()];

	$: closeCards();

	function closeCards() {
		if (openCards.values.length === 2) {
			setTimeout(() => {
				openCards = new Map();
			}, 2000);
		}
	}
</script>

<div class="grid grid-cols-9 gap-3">
	{#each cards as card}
		<Card
			id={card}
			hide={hiddenCards.includes(card)}
			reveal={openCards.has(card)}
			backgroundImg={openCards.get(card)}
		/>
	{/each}
</div>

<script lang="ts">
	import Card from './Card.svelte';

	export let openCards: Map<number, string> = new Map();
	export let hiddenCards: Array<number> = [];
	let cards = [...Array(54).keys()];

	$: closeCards(openCards);

	function closeCards(cards: Map<number, string>) {
		if (cards.size === 2) {
			let removeCards = Array.from(cards.keys());
			setTimeout(() => {
				for (const remove of removeCards) {
					openCards.delete(remove);
				}
				openCards = openCards;
			}, 2000);
		}
	}
</script>

<div class="pt-10">
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
</div>

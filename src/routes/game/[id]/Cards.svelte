<script lang="ts">
    import Card from "./Card.svelte";
   
    let cards = [...Array(48).keys()];;
    let openCards: Array<number> = [];
    let lock = false;

    function handleCardClick(event: CustomEvent<number>) {
        openCards.push(event.detail);
        if (openCards.length === 2) {
            lock = true;
            setTimeout(() => {
                openCards = [];
                lock =false;
            }, 2000);
        }
    }
</script>

<div class="grid grid-cols-8 gap-y-8 w-3/6 h-3/6">
    {#each cards as card}
        <Card on:cardClicked={handleCardClick} id={card} show={openCards.includes(card)} locked={lock}/>   
    {/each}
</div>
<script lang="ts">
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import Icon from '$lib/assets/playing-card.png';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';

	export let id: number;
	export let reveal: boolean = false;
	export let hide: boolean = false;
	export let locked: boolean = false;
	let backgroundImg: string;
	const dispatch = createEventDispatcher();

	$: if (!reveal) backgroundImg = '';

	const gameId = $page.params.id;

	async function clicked() {
		if (locked || reveal || hide) return;

		// const res = await fetch(
		// 	`${PUBLIC_API_ENDPOINT}/click?gameId=${gameId}&cardId=${id}&token=${3}`
		// );
		// const img = await res.blob();
		// backgroundImg = URL.createObjectURL(img);

		backgroundImg = 'https://cdn-icons-png.flaticon.com/512/1998/1998659.png';
		reveal = true;
		dispatch('cardClicked', id);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flip-card w-20 h-20" on:click={clicked}>
	<div class="flip-card-inner" class:hidden={hide} class:flip={reveal}>
		<div class="flip-card-front flex justify-center items-center">
			<img class="w-10 opacity-30" src={Icon} alt="" />
		</div>
		<div class="flip-card-back flex items-center justify-center">
			<img src={backgroundImg} alt={id.toString()} />
		</div>
	</div>
</div>

<style>
	.flip-card {
		background-color: transparent;
		perspective: 1000px;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	.flip {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	.flip-card-front {
		background-color: white;
		color: red;
	}

	.flip-card-back {
		background-color: red;
		color: white;
		transform: rotateY(180deg);
	}
</style>

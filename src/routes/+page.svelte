<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import JoinInput from './JoinInput.svelte';

	let value: string = '';
	let failed = false;

	function join() {
		if (value.trim() !== 'Linus') {
			failed = true;
			return;
		}
		goto('/game/1');
	}
</script>

<h1 class="text-center primary-font text-7xl mt-56">Memory</h1>
<div class="flex flex-col items-center justify-center mt-10">
	<JoinInput on:click={join} bind:value />
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

	.join-button {
		background-color: #9cec5b;
	}
</style>

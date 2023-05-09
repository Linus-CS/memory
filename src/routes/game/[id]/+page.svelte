<script lang="ts">
	import '../../../app.css';
	import Cards from './Cards.svelte';
	import Leaderboard from './Leaderboard.svelte';
</script>

<h1 class="text-center primary-font text-lg mt-2">Memory</h1>
<div class="grid grid-cols-5 mt-8 w-full h-full">
	<div class="mx-auto">
		<Leaderboard />
	</div>
	<div class="col-span-3 m-auto">
		<Cards />
	</div>
</div>

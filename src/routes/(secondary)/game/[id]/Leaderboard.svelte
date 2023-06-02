<script lang="ts">
	import type { Player } from '../../../../types';

	// SSE to get leaderboard state
	export let players: Array<Player> = [];
</script>

<div>
	<h1 class="secondary-font font-bold text-lg mb-2">Bestenliste</h1>
	<ol class="list-decimal">
		{#each players as [name, points, ready]}
			<li>
				{name}
				<span class="float-right">
					{points}
					{#if ready}
						🟢
					{:else}
						🟣
					{/if}
				</span>
			</li>
		{/each}
	</ol>
</div>

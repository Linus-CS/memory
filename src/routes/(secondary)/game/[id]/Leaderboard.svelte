<script lang="ts">
	import type { Player } from '../../../../types';

	export let players: Array<Player> = [];
</script>

<!-- 👑 -->
<div>
	<h1 class="secondary-font font-bold text-lg mb-2">Bestenliste</h1>
	<ol class="list-decimal">
		{#each players as [name, points, ready, turn]}
			<li>
				{#if turn}
					<span class="font-bold text-lime-600">{name}</span>
				{:else}
					{name}
				{/if}

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

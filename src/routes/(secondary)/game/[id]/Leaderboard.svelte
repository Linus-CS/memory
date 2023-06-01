<script lang="ts">
	import type { Player } from '../../../../types';

	// SSE to get leaderboard state
	export const players: Array<Player> = [
		{ name: 'Mike', points: 10 },
		{ name: 'Linus', points: 4 },
		{ name: 'John', points: 3 },
		{ name: 'Jane', points: 1 },
		{ name: 'Doe', points: 1 },
		{ name: 'Helen', points: 0 }
	];
</script>

<div>
	<h1 class="secondary-font font-bold text-lg mb-2">Bestenliste</h1>
	<ol class="list-decimal">
		{#each players as { name, points }}
			<li>
				{name}
				<span class="float-right">
					{points}
				</span>
			</li>
		{/each}
	</ol>
</div>

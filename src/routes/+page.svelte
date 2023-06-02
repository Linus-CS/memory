<script lang="ts">
	import '../app.css';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { goto, invalidate } from '$app/navigation';
	import cookie from 'cookie';

	import JoinInput from './JoinInput.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import CreateGame from './CreateGame.svelte';
	import { onMount } from 'svelte';
	import MasterKeyInput from './MasterKeyInput.svelte';

	let id: string;
	let unavailable: boolean = false;

	let has_token = false;
	let is_master = false;

	onMount(() => {
		async function ping() {
			has_token = document.cookie.includes('has_token');
			is_master = document.cookie.includes('is_master');
			try {
				const res = await fetch(`${PUBLIC_API_ENDPOINT}/ping`, {
					credentials: 'include',
					mode: 'cors',
					cache: 'no-cache'
				});
				const game_id = await res.json();
				if (res.status === 410) {
					document.cookie = cookie.serialize('has_token', '', {
						maxAge: -1,
						path: '/',
						sameSite: 'strict',
						secure: true
					});
					invalidate('app:main');
				}
				if (res.ok) {
					id = game_id;
					unavailable = false;
				} else unavailable = true;
			} catch (_) {
				unavailable = true;
			}
		}

		const interval = setInterval(ping, 2000);
		ping();
		return () => clearInterval(interval);
	});

	async function joinWithName(event: CustomEvent<string>) {
		const res = await fetch(`${PUBLIC_API_ENDPOINT}/join?name=${event.detail}&id=${id}`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors'
		});

		if (res.ok) {
			document.cookie = cookie.serialize('has_token', '', {
				path: '/',
				sameSite: 'strict',
				secure: true
			});
			goto(`/game/${id}`);
		}
	}

	let cnt = 0;
	let check_master = false;
	function master() {
		cnt++;
		setTimeout(() => (cnt = 0), 800);
		if (cnt === 4) {
			check_master = true;
		}
	}
</script>

<h1 on:click={master} class="text-center primary-font text-7xl mt-56">Memory</h1>
<div class="flex flex-col items-center justify-center mt-10">
	{#if id === undefined && !unavailable}
		<LoadingSpinner />
	{:else if !unavailable}
		{#if !has_token}
			<JoinInput on:join={joinWithName} />
		{:else}
			<a
				href="/game/{id}"
				class="z-10 select-none rounded bg-green-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
				type="button"
				data-ripple-light="true"
			>
				Beitreten
			</a>
		{/if}
	{:else}
		<p class="text-center text-2xl mb-4">
			Momentan gibt es kein Spiel, dem beigetreten werden kann.
		</p>
	{/if}
	{#if check_master}
		<MasterKeyInput bind:check_master />
	{/if}
	{#if is_master}
		<CreateGame />
	{/if}
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
</style>

<script>
	import { io } from 'socket.io-client'
	import Player from './Player.svelte'
	import Host from './Host.svelte'
	export let userData
	let endpoint = 'https://starterkana-live.onrender.com/'

	const socket = io(endpoint)

	let joiningGame = null
	let hostingGame = null
	let game
	let gameInput = ''
	let gameError = null
	function joinGame() {
		socket.emit('playerJoinGame', gameInput, userData, (response) => {
			if (response.game && response.ok) {
				joiningGame = 'p'
			} else {
				gameError = "That game doesn't exist."
			}
		})
	}
	function hostGame() {
		hostingGame = 'l'
		socket.emit('hostingGameCreate', userData, (response) => {
			hostingGame = 'p'
			game = response
		})
	}
</script>

{#if joiningGame == 'p'}
	<Player bind:userData bind:game {socket} />
{:else if hostingGame == 'p'}
	<Host bind:game {socket} />
{:else}
	<div class="flex flex-col justify-between w-screen h-screen overflow-hidden p-10">
		<div class="flex flex-row justify-between">
			<h2 class="text-2xl font-semibold text-main">Live</h2>
			<h2 class="text-2xl font-semibold text-black">
				{userData.name}
			</h2>
		</div>
		<div>
			{#if joiningGame == 'l'}
				<h2 class="text-2xl font-semibold text-black">Enter the game pin you see on the screen.</h2>
				<input
					type="number"
					class="m-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
					placeholder="Game Pin"
					bind:value={gameInput}
				/>
				{#if gameError}
					<p class="text-red-500 text-md">{gameError}</p>
				{/if}
				<button class="btn-main block" on:click={joinGame}>Continue →</button>
			{:else if hostingGame == 'l'}
				<h1 class="text-2xl font-semibold">Creating game...</h1>
			{:else}
				<h1 class="text-2xl font-semibold">Would you like to join or host a game?</h1>
				<button class="btn-main block" on:click={() => (joiningGame = 'l')}>Join a game →</button>
				<button class="btn-main" on:click={hostGame}>Host a game →</button>
			{/if}
		</div>
		<h2 class="text-2xl font-semibold text-main">Starterkana</h2>
	</div>
{/if}

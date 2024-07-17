<script>
	import LiveQuiz from './LiveQuiz.svelte'
	import LiveLearn from './LiveLearn.svelte'
	import LiveSpeedSkills from './LiveSpeedSkills.svelte'
	import LivePlain from './LivePlain.svelte';

	export let userData
	export let game
	export let socket
	let status1 = "You've joined!"
	let status2 = 'Wait for the host to start the game.'
	let sleep = (ms) => new Promise((res) => setTimeout(res, ms))
	let inTask = false
	let activeTask = null

	socket.on('playerResetGame', (game2) => {
		game = game2
		inTask = false
		activeTask = null

		status1 = "You've joined!"
		status2 = 'Wait for the host to start the game.'
	})

	socket.on('leaveGameEnd', () => window.location.reload())
	socket.on('playerSelectingGame', (game2) => {
		status1 = 'Get ready!'
		status2 = 'The host is starting the game.'
		game = game2
	})
	socket.on('playerStartGame', async (task, game2) => {
		let countdown = 5
		status2 = "We're starting!"
		while (countdown > 0) {
			countdown--
			if (countdown == 4) {
				status1 = 'Get ready!'
			} else {
				status1 = `${countdown}`
			}
			await sleep(1000)
		}
		game = game2
		activeTask = task
		inTask = true
	})
</script>

{#if inTask}
	<main class="p-10 h-screen overflow-x-hidden">
		<h2 class="text-2xl font-semibold text-main mb-2">Live</h2>
		{#if activeTask.plain}
			<LivePlain bind:userData bind:activeTask bind:game {socket} />
		{:else if activeTask.type == 0}
			<LiveQuiz bind:userData bind:activeTask bind:game {socket} />
		{:else if activeTask.type == 1}
			<LiveLearn bind:userData bind:activeTask bind:game {socket} />
		{:else if activeTask.type == 2}
			<LiveSpeedSkills bind:userData bind:activeTask bind:game {socket} />
		{:else if activeTask.type == 3}
			<h1 class="text-2xl text-red-500">Error! This is not not implemented yet.</h1>
			<p class="text-italic text-gray-500">How did we get here?</p>
		{/if}
	</main>
	<!-- WOrk -->
{:else}
	<div
		class="bg-gradient-to-bl from-highlight to-main w-screen h-screen grid place-items-center fixed top-0 left-0 overflow-hidden"
	>
		<div class="text-center">
			<h1 class="font-semibold text-5xl text-white mb-2">{status1}</h1>
			<h3 class="font-medium text-2xl text-white">{status2}</h3>
		</div>

		<h2 class="font-semibold text-2xl absolute bottom-2.5 left-2.5 text-white">Starterkana.</h2>
	</div>
{/if}

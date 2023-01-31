<script>
	import LiveStartTask from './LiveStartTask.svelte'
	export let game
	export let socket

	let startingLiveTask = false
	let startingTask = false
	let activeTask = {
		hiragana: [],
		katakana: [],
		title: '',
		type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
		answerIn: 0, // 0 ROMANJI 1 JAPENESE
		live: true,
	}

	function backToCode() {
		activeTask = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
			live: true,
		}
		startingLiveTask = false
		startingTask = false
		showLeaderboard = false
		socket.emit('resetGame', game)
	}

	socket.on('updateUserListHost', (game2) => {
		game = game2
		if (showLeaderboard && game.task.type == 2) {
			game.finishers.sort((a, b) => {
				if (a.task.countingCorrect > b.task.countingCorrect) return -1 // any negative number works
				if (a.task.countingCorrect < b.task.countingCorrect) return 1 // any positive number works
				return 0 // equal values MUST yield zero
			})
		}
		if (game.users.length <= 0) {
			backToCode()
		}
	})
	function selectGame() {
		startingLiveTask = true
		socket.emit('hostSelectingGame', game, (response) => {
			game = response
		})
	}

	let sleep = (ms) => new Promise((res) => setTimeout(res, ms))
	let status2 = ''
	let status1 = ''
	let showLeaderboard = false

	socket.on('playerStartGame', async (activeTask, res) => {
		game = res
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
		showLeaderboard = true
	})
</script>

{#if startingLiveTask}
	<main class="p-10 h-screen overflow-x-hidden">
		<div class="flex flex-row place-content-between">
			<h2 class="text-2xl font-semibold text-main">Live</h2>
			<h2 class="text-2xl font-semibold text-black">
				{game.users.length} Player{game.users.length == 1 ? '' : 's'}
			</h2>
		</div>
		<LiveStartTask bind:activeTask {socket} bind:startingTask bind:startingLiveTask bind:game />
	</main>
{:else if startingTask}
	{#if !showLeaderboard}
		<div
			class="bg-gradient-to-bl from-highlight to-main w-screen h-screen grid place-items-center fixed top-0 left-0 overflow-hidden"
		>
			<div class="text-center">
				<h1 class="font-semibold text-5xl text-white mb-2">{status1}</h1>
				<h3 class="font-medium text-2xl text-white">{status2}</h3>
			</div>

			<h2 class="font-semibold text-2xl absolute bottom-2.5 left-2.5 text-white">Starterkana.</h2>
		</div>
	{:else}
		<main class="p-10 h-screen overflow-x-hidden">
			<div class="flex flex-row place-content-between">
				<h2 class="text-2xl font-semibold text-main">Finished Players</h2>
				<h2 class="text-2xl font-semibold text-black">
					{game.users.length} Player{game.users.length == 1 ? '' : 's'}
				</h2>
			</div>
			{#each game.finishers as finisher, index}
				<div class="flex place-content-between items-center w-full border-b border-fade last:border-0 p-5">
					{#if game.task.type == 2}
						<h1 class="text-2xl font-medium"><b class="font-semibold">#{index + 1} </b> {finisher.name}</h1>
						<p class="text-right">
							{finisher.task.countingCorrect} completed • {finisher.task.percentage}% • {finisher.task
								.totalCorrect} correct
						</p>
					{:else}
						<h1 class="text-2xl font-medium"><b class="font-semibold">#{index + 1} </b> {finisher.name}</h1>
						<p class="text-right">
							{finisher.task.time} seconds • {finisher.task.percentage}% • {finisher.task
								.totalCorrect}/{finisher.task.totalCompleted} correct
						</p>
					{/if}
				</div>
			{/each}
		</main>
		<button class="absolute bottom-8 right-8 btn-main" on:click={backToCode}>Play again →</button>
	{/if}
{:else}
	<div class="w-screen h-screen overflow-hidden">
		<!-- <div class="flex flex-row justify-between">
		<h2 class="text-2xl font-semibold text-main">Live</h2>
		<h2 class="text-2xl font-semibold text-black">
			{userData.name}
		</h2>
	</div> -->
		<div class="flex items-center flex-col">
			<div class="bg-gradient-to-bl from-highlight to-main w-screen h-[25vh] grid place-items-center relative">
				<div class="w-fit h-fit p-5 bg-white rounded-lg text-center">
					<h1 class="text-[80px] font-bold">{game.gameId}</h1>
					<h2 class="text-lg font-medium">Join at {window.location.href}</h2>
				</div>
				<h2 class="font-semibold text-2xl absolute bottom-2.5 left-2.5 text-white">Starterkana.</h2>
			</div>
			<div class="flex items-center text-center p-5">
				{#if game.users.length > 0}
					{#each game.users as user}
						<div class="bg-highlight p-2.5 rounded-md w-10 m-2">
							<h3 class="text-xl font-medium">{user.name}</h3>
						</div>
					{/each}
				{:else}
					<h2 class="font-semibold text-2xl">Waiting for players...</h2>
				{/if}
			</div>
			{#if game.users.length > 0}
				<button class="btn-main" on:click={selectGame}>Start Game →</button>
			{/if}
			<button class="btn-fade" on:click={() => window.location.reload()}>End Game →</button>
		</div>
	</div>
{/if}

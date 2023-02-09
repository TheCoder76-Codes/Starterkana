<script>
	import About from './About.svelte'
	import Groups from './Groups.svelte'
	import ReccomendTask from './ReccomendTask.svelte'
	import StartTask from './StartTask.svelte'
	import Sync from './Sync.svelte'
	import MobileWarning from './MobileWarning.svelte'
	import Live from './Live.svelte'
	export let userData
	export let streaks
	let dev = false
	let liveGame = false

	let activeTask = null
	let sTask = false
	let openPage = () => {}

	let vNumber = ''
	fetch('https://api.github.com/repos/TheCoder76-Codes/Starterkana/releases/latest')
		.then((res) => res.json())
		.then((res) => {
			vNumber = res.tag_name
			openPage = () => {
				window.open(res.html_url, '_blank')
			}
		})

	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('dev')) dev = true

	let setupSyncPage = false
	function setupSync() {
		setupSyncPage = true
	}

	// quiz and speed skills of previous belts
	// quiz and learn and speed skills of current belt
	// learn of next belt (except black)
	// test of current belt ()
</script>

<MobileWarning />

{#if liveGame}
	<Live bind:userData />
{:else if sTask || activeTask}
	<main class="p-10 h-screen overflow-x-hidden">
		<div class="flex flex-row place-content-between">
			<h2 class="text-2xl font-semibold text-main">Starterkana</h2>
			{#if dev}
				<button
					class="btn-main"
					on:click={() => {
						localStorage.removeItem('isSetUp')
						localStorage.removeItem('userData')
						window.location.reload()
					}}>Reset LocalStorage</button
				>
			{/if}
			<h2 class="text-2xl font-semibold text-black">
				{userData.points} Points • {userData.name}
			</h2>
		</div>
		<StartTask bind:activeTask bind:userData bind:sTask bind:streaks />
	</main>
{:else}
	<main class="p-10 h-screen overflow-x-hidden">
		<div class="flex flex-row place-content-between">
			<h2 class="text-2xl font-semibold text-main">Starterkana</h2>
			{#if dev}
				<button
					class="btn-main"
					on:click={() => {
						localStorage.removeItem('isSetUp')
						localStorage.removeItem('userData')
						window.location.reload()
					}}>Reset LocalStorage</button
				>
			{/if}
			<h2 class="text-2xl font-semibold text-black">
				{userData.points} Points • {userData.name}
			</h2>
		</div>
		{#if setupSyncPage}
			<Sync bind:userData bind:setupSyncPage />
		{:else}
			<ReccomendTask bind:userData bind:activeTask bind:sTask />
			<Groups bind:userData />
			<h2 class="text-2xl font-semibold text-black my-5">Live</h2>
			<button class="btn-main" on:click={() => (liveGame = true)}>Join or host a live game ↗</button>
			<div class="flex gap-5">
				<p
					class="text-fade text-lg hover:underline hover:cursor-pointer mt-5"
					on:click={openPage}
					on:keypress={openPage}
				>
					Starterkana {vNumber}
				</p>
				<p
					class="text-fade text-lg hover:underline hover:cursor-pointer mt-5"
					on:click={setupSync}
					on:keypress={setupSync}
				>
					Setup Sync ↗
				</p>
			</div>
		{/if}
	</main>
{/if}

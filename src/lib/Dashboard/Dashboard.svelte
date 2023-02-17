<script>
	import Groups from './Groups.svelte'
	import ReccomendTask from './ReccomendTask.svelte'
	import StartTask from './StartTask.svelte'
	import Sync from './Sync.svelte'
	import MobileWarning from './MobileWarning.svelte'
	import Live from '../Live/Live.svelte'
	import Errors from './Errors.svelte'
	export let userData
	export let streaks
	export let errors
	let dev = false
	let liveGame = false

	let liveEndpoint = 'https://starterkana-live.onrender.com'

	let activeTask = null
	let sTask = false
	let showErrors = false
	let openPage = () => {}

	let vNumber = ''
	fetch('https://api.github.com/repos/TheCoder76-Codes/Starterkana/releases/latest')
		.then((res) => res.json())
		.then((res) => {
			vNumber = res.tag_name
			openPage = (e) => {
				if (e.shiftKey || e.altKey) {
					showErrors = true
				} else {
					window.open(res.html_url, '_blank')
				}
			}
		})

	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('dev')) dev = true

	let setupSyncPage = false
	function setupSync() {
		setupSyncPage = true
	}

	async function fetchWithTimeout(resource, options = {}) {
		const { timeout = 8000 } = options

		const controller = new AbortController()
		const id = setTimeout(() => controller.abort(), timeout)
		const response = await fetch(resource, {
			...options,
			signal: controller.signal,
		})
		clearTimeout(id)
		return response
	}

	// quiz and speed skills of previous belts
	// quiz and learn and speed skills of current belt
	// learn of next belt (except black)
	// test of current belt ()

	// check sk live status
	// https://starterkana-live.onrender.com/status
	let offline = 0 // 0 = check, 1 online 2 offline
	let x = new XMLHttpRequest()

	fetchWithTimeout(liveEndpoint + '/status', { timeout: 8000 })
		.then(() => (offline = 1))
		.catch(() => (offline = 2))
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
{:else if showErrors}
	<Errors bind:showErrors bind:errors bind:userData />
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
			{#if offline == 0}
				<p class="m-2 text-base">Please wait, checking status...</p>
			{:else if offline == 1}
				<button class="btn-main" on:click={() => (liveGame = true)}>Join or host a live game ↗</button>
			{:else}
				<p class="m-2 text-red-500 text-base">The server is offline. Please contact the administrator.</p>
			{/if}

			<div class="flex gap-5">
				<button class="text-fade text-lg hover:underline hover:cursor-pointer mt-5" on:click={openPage}>
					Starterkana {vNumber}
				</button>
				<button class="text-fade text-lg hover:underline hover:cursor-pointer mt-5" on:click={setupSync}>
					Setup Sync ↗
				</button>
			</div>
		{/if}
	</main>
{/if}

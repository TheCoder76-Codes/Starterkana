<script>
	import Setup from './Setup.svelte'

	export let userData
	export let migrate
	let hasMigrated = false
	let urlParams = new URLSearchParams(window.location.search)
	if (!urlParams.has('migrate') || !urlParams.has('token')) {
		migrate = false
	}
	let isSetup
	if (localStorage.getItem('isSetUp')) {
		isSetup = Boolean(localStorage.getItem('isSetUp'))
	}
	function setup() {
		window.location.search = ''
		migrate = false
	}
	function migrateFunc() {
		if (!userData.migrated) {
			let newPoints = urlParams.get('token')
			newPoints = atob(newPoints)
			userData.points = parseInt(userData.points)
			newPoints = parseInt(newPoints)
			userData.points += newPoints
			hasMigrated = true
			userData.migrated = true
			if (userData.cookies) {
				localStorage.setItem('userData', JSON.stringify(userData))
			}
		} else {
			hasMigrated = true
		}
	}
</script>

<main class="p-10 min-h-screen overflow-x-hidden flex flex-col place-content-between overflow-y-auto">
	<h2 class="text-2xl font-semibold text-main">Migrate</h2>

	<div>
		<h2 class="text-2xl font-semibold">Your about to migrate.</h2>
		<p>Your transferring your points over from a previous version of Starterkana. Do you want to proceed?</p>
		{#if !isSetup}
			<p class="text-red-500">You need to setup to continue.</p>
			<button class="btn-main" on:click={setup}>Setup →</button>
		{:else if hasMigrated}
			<p>Completed! Successfully added points from a previous version of starterkana.</p>
			<button class="btn-main" on:click={setup}>Go back to your dashboard →</button>
		{:else if userData.migrated}
			<p class="text-red-500">You have already migrated.</p>
		{:else}
			<p class="text-red-500">You can only migrate once.</p>
			<button class="btn-main" on:click={migrateFunc}>Proceed →</button>
		{/if}
	</div>

	<h3 class="text-xl font-semibold text-main">Starterkana</h3>
</main>

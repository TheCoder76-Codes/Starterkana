<script>
	import Welcome from './Welcome.svelte'
	import Cookies from './Cookies.svelte'
	import Name from './Name.svelte'
	import Hbelt from './HiraganaBelt.svelte'
	import Kbelt from './KatakanaBelt.svelte'
	import AllDone from './SetupDone.svelte'
	export let userData
	export let setup

	let steps = {
		welcome: false,
		cookies: false,
		name: false,
		hbelt: false,
		kbelt: false,
		done: false,
	}
</script>

<main class="p-10 min-h-screen overflow-x-hidden flex flex-col place-content-between overflow-y-auto">
	<h2 class="text-2xl font-semibold text-main">Setup</h2>

	<div class="flex items-center h-full">
		<div>
			{#if !steps.welcome}
				<Welcome bind:steps />
			{:else if !steps.cookies}
				<Cookies bind:userData bind:steps />
			{:else if !steps.name}
				<Name bind:userData bind:steps />
			{:else if !steps.hbelt}
				<Hbelt bind:userData bind:steps />
			{:else if !steps.kbelt}
				<Kbelt bind:userData bind:steps />
			{:else if !steps.done || !setup}
				<AllDone bind:setup bind:steps bind:userData />
			{/if}
		</div>
	</div>

	<h3 class="text-xl font-semibold text-main">Starterkana.</h3>
</main>

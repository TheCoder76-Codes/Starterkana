<script>
	import About from './About.svelte'
	import Groups from './Groups.svelte'
	import ReccomendTask from './ReccomendTask.svelte'
	import StartTask from './StartTask.svelte'
	export let userData
	let dev = false

	let activeTask = null
	let sTask = false
	let openPage = () => {}

	let vNumber = ''
	fetch('https://api.github.com/repos/TheCoder76-Codes/StarterKana/releases/latest')
		.then((res) => res.json())
		.then((res) => {
			vNumber = res.tag_name
			openPage = () => {
				window.open(res.html_url, '_blank')
			}
		})

	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('dev')) dev = true

	// quiz and speed skills of previous belts
	// quiz and learn and speed skills of current belt
	// learn of next belt (except black)
	// test of current belt ()
</script>

{#if sTask || activeTask}
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
			<h2 class="text-2xl font-semibold text-black">{userData.points} Points • {userData.name}</h2>
		</div>
		<StartTask bind:activeTask bind:userData bind:sTask />
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
			<h2 class="text-2xl font-semibold text-black">{userData.points} Points • {userData.name}</h2>
		</div>
		<ReccomendTask bind:userData bind:activeTask bind:sTask />
		<Groups bind:userData />
		<p
			class="text-fade text-lg hover:underline hover:cursor-pointer mt-5"
			on:click={openPage}
			on:keypress={openPage}
		>
			Starterkana {vNumber}
		</p>
	</main>
{/if}

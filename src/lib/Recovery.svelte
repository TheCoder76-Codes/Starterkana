<script>
	let e
	function reset() {
		localStorage.clear()
	}
</script>

<div class="p-10 w-screen h-screen overflow-x-hidden">
	<div class="flex place-content-between w-full flex-row">
		<h1 class="text-2xl font-semibold text-main mb-2.5">Recovery Mode</h1>
		<button
			class="bg-highlight text-black p-2.5 rounded-lg transition-transform ease-in-out duration-300 hover:scale-105"
			on:click={() => (window.location.search = '')}>↻ Reload the page</button
		>
	</div>
	<h1 class="text-xl font-semibold">Raw Storage</h1>
	{localStorage.getItem('userData')} <br />
	{localStorage.getItem('streaks')}<br />
	Setup: {localStorage.getItem('isSetUp')}<br />

	<button class="btn-main" on:click={reset}>Reset Localstorage</button>
</div>

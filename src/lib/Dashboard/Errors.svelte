<script>
	export let userData
	export let errors
	export let showErrors
	if (localStorage.getItem('errors')) {
		errors = JSON.parse(localStorage.getItem('errors'))
	}

	function clearErrors() {
		errors = []
		if (userData.cookies) {
			localStorage.setItem('errors', JSON.stringify(errors))
		}
	}
	function removeItem(item) {
		let index = errors.indexOf(item)
		if (index > -1) {
			errors.splice(index, 1)
			errors = errors
		}
		if (userData.cookies) {
			localStorage.setItem('errors', JSON.stringify(errors))
		}
	}
	let isSetup

	if (localStorage.getItem('isSetUp')) {
		isSetup = localStorage.getItem('isSetUp')
	} else isSetup = false
</script>

<div class="p-10 flex place-content-between flex-col w-screen h-screen overflow-x-hidden">
	<div class="flex place-content-between w-full flex-row">
		<h1 class="text-2xl font-semibold text-main mb-2.5">Errors</h1>

		<div>
			<button class="btn-main" on:click={clearErrors}>Clear all errors ⌫</button>
			<button
				class="bg-highlight text-black p-2.5 rounded-lg transition-transform ease-in-out duration-300 hover:scale-105"
				on:click={() => (showErrors = false)}>Go back to your dashboard ↗</button
			>
		</div>
	</div>
	<div>
		{#if errors.length == 0}
			<p class="text-lg">No errors to show</p>
		{/if}
		{#each errors as error}
			<div
				class="bg-red-300 my-2 p-5 rounded-lg hover:cursor-pointer hover:bg-red-400"
				on:click={() => removeItem(error)}
				on:keypress={() => removeItem(error)}
			>
				{#if error.date}
					<div class="flex place-content-between">
						<h1 class="text-xl font-medium">{error.event}</h1>
						<p>{new Date(error.date).toLocaleString('en-AU')}</p>
					</div>
				{:else}
					<h1 class="text-xl font-medium">{error.event}</h1>
				{/if}
				<p class="text-lg">Line: {error.lineno} Colno: {error.colno}</p>
				<p class="text-lg">Source: {error.source}</p>
				<p class="text-lg">Error: {JSON.stringify(error.error)}</p>
			</div>
		{/each}
	</div>

	<h1 class="text-2xl font-semibold text-main mb-2.5">Starterkana.</h1>
</div>

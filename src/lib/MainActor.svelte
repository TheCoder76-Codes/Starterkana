<script>
	export let userData
	export let errors
	export let fullAccess
	function caps(str) {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}
	const uid = function () {
		return Date.now().toString(36) + Math.random().toString(36).substr(2)
	}
	if (localStorage.getItem('userData')) {
		userData = JSON.parse(localStorage.getItem('userData'))
	}
	if (localStorage.getItem('errors')) {
		errors = JSON.parse(localStorage.getItem('errors'))
	}

	function clearErrors() {
		errors = []
		if (userData.cookies) {
			localStorage.setItem('errors', JSON.stringify(errors))
		}
	}
	function saveData() {
		if (userData.cookies) {
			localStorage.setItem('userData', JSON.stringify(userData))
			localStorage.setItem('isSetUp', JSON.stringify(isSetup))
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
		<h1 class="text-2xl font-semibold text-main mb-2.5">Actor</h1>
		<button
			class="bg-highlight text-black p-2.5 rounded-lg transition-transform ease-in-out duration-300 hover:scale-105"
			on:click={() => (window.location.search = '')}>Go back to UX ↗</button
		>
	</div>
	<div class="grid w-full md:grid-cols-[1fr_1fr]">
		{#if fullAccess}
			<div>
				<h1 class="text-2xl font-semibold mb-2">User Data</h1>
				<h1 class="text-xl font-medium">Name</h1>
				<input
					type="text"
					class="mt-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
					bind:value={userData.name}
				/>
				<h1 class="text-xl font-medium mt-2.5">Points</h1>
				<input
					type="text"
					class="mt-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
					bind:value={userData.points}
				/>
				<h1 class="text-xl font-medium">Group ID</h1>
				<input
					type="text"
					class="mt-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
					bind:value={userData.groupID}
				/>
				<h1 class="text-xl font-medium">UID</h1>
				<input
					type="text"
					class="mt-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
					bind:value={userData.uid}
				/> <button class="btn-main" on:click={() => (userData.uid = uid())}>Regnerate UID ↻</button>
				<h1 class="text-xl font-medium mt-2.5">Cookies</h1>
				<input type="checkbox" bind:checked={userData.cookies} />
				<h1 class="text-xl font-medium mt-2.5">Setup State</h1>
				<input type="checkbox" bind:checked={isSetup} />
				<div class="block md:grid grid-cols-[1fr,1fr]">
					<div>
						<h1 class="text-xl font-medium mt-2.5">Hiragana Belt</h1>
						{#each Object.entries(userData.hiragana) as [key, value]}
							<label>
								<input type="checkbox" bind:checked={userData.hiragana[key]} />
								{caps(key)} Belt
							</label> <br />
						{/each}
					</div>
					<div>
						<h1 class="text-xl font-medium mt-2.5">Katakana Belt</h1>
						{#each Object.entries(userData.katakana) as [key, value]}
							<label>
								<input type="checkbox" bind:checked={userData.katakana[key]} />
								{caps(key)} Belt
							</label> <br />
						{/each}
					</div>
				</div>
				<button class="btn-main" on:click={saveData}>Save Data ✓</button>
			</div>
		{/if}
		<div>
			<h1 class="text-2xl font-semibold">Errors</h1>
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
			<button class="btn-main" on:click={clearErrors}>Clear all errors ⌫</button>
		</div>
	</div>

	<h1 class="text-2xl font-semibold text-main mb-2.5">Starterkana.</h1>
</div>

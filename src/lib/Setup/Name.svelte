<script>
	export let steps
	export let userData

	let nInput
	let invalid = false

	function nameSubmit() {
		if (nInput.value.length > 0) {
			steps.name = true
			userData.name = nInput.value
			if (userData.cookies) {
				localStorage.setItem('userData', JSON.stringify(userData))
			}
		} else {
			invalid = true
			nInput.classList.add('invalid:border-red-500')
			nInput.required = true
		}
	}
</script>

<h1 class="text-4xl font-bold m-2">Whats your name?</h1>
<h2 class="text-2xl font-medium m-2">We don't share this information with anyone else.</h2>
<form on:submit|preventDefault={nameSubmit}>
	<div class="block md:flex">
		<input
			type="text"
			class="m-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
			placeholder="Click here to enter your name"
			bind:this={nInput}
		/>
		<input class="btn-main hover:cursor-pointer" type="submit" value="Continue →" />
	</div>

	{#if invalid}
		<p class="text-red-500 font-medium text-md mx-2">This field is required.</p>
	{/if}
</form>

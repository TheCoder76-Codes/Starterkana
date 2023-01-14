<script>
	export let steps
	export let userData

	let belts = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']
	let beltRadio = null
	let invalid = false

	function getBeltBackground(belt) {
		if (belt == 'white') {
			return 'bg-gray-100'
		} else if (belt == 'brown') {
			return 'bg-orange-800/50'
		} else if (belt == 'black') {
			return 'bg-black text-white'
		} else if (belt == 'yellow') {
			return 'bg-yellow-100'
		} else if (belt == 'orange') {
			return 'bg-orange-100'
		} else if (belt == 'green') {
			return 'bg-green-100'
		} else if (belt == 'blue') {
			return 'bg-blue-100'
		} else if (belt == 'purple') {
			return 'bg-purple-100'
		} else if (belt == 'red') {
			return 'bg-red-100'
		}
	}

	function beltSubmit() {
		if (beltRadio != null) {
			userData.katakana = {
				white: false,
				yellow: false,
				orange: false,
				green: false,
				blue: false,
				purple: false,
				red: false,
				brown: false,
				black: false,
			}
			let allBefore = belts.slice(0, belts.indexOf(beltRadio))

			allBefore.forEach((item) => {
				userData.katakana[item] = true
			})
			steps.kbelt = true
			if (userData.cookies) {
				localStorage.setItem('userData', JSON.stringify(userData))
			}
		} else {
			invalid = true
		}
	}
</script>

<h1 class="text-4xl font-bold m-2">What level of Katakana belts are you on?</h1>
<h2 class="text-2xl font-medium m-2">
	Starterkana uses Katakana belts for progression indicators. If you don't know what level you are on, select the
	starting belt (white).
</h2>
<form on:submit|preventDefault={beltSubmit}>
	<div class="flex flex-col flex-wrap md:max-h-72 md:max-w-[544px]">
		{#each belts as belt}
			<label
				class="p-2 m-2 rounded-md text-md w-64 {getBeltBackground(
					belt
				)} transition-transform ease-in-out duration-300 hover:scale-105 hover:darken"
			>
				<input class="" type="radio" name="belts" value={belt} bind:group={beltRadio} />
				{belt.charAt(0).toUpperCase() + belt.slice(1)}
			</label>
		{/each}
		<input class="btn-main hover:cursor-pointer" type="submit" value="Continue →" />
	</div>

	{#if invalid}
		<p class="text-red-500 font-medium text-md mx-2">Please select a belt.</p>
	{/if}
</form>

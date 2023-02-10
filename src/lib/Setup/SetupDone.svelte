<script>
	export let steps
	export let setup
	export let userData
	const uid = function () {
		return Date.now().toString(36) + Math.random().toString(36).substr(2)
	}

	function click() {
		userData.uid = uid()
		steps.welcome = true
		setup = true
		if (!userData.points) userData.points = 0
		if (userData.cookies) {
			localStorage.setItem('isSetUp', 'true')
			localStorage.setItem('userData', JSON.stringify(userData))
		}
	}
</script>

<h1 class="text-4xl font-bold m-2">All Done!</h1>
<h2 class="text-2xl font-medium m-2">You can now continue to your dashboard.</h2>
<button class="btn-main" on:click={click}>Go to your dashboard →</button>

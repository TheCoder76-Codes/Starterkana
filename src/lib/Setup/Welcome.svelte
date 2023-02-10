<script>
	export let steps
</script>

<h1 class="text-4xl font-bold m-2">Hey there! Welcome to StarterKana.</h1>
<h2 class="text-2xl font-medium m-2">We suggest you go through setup. It won't take any longer than a few minutes.</h2>
<button class="btn-main" on:click={() => (steps.welcome = true)}>Go through setup →</button>

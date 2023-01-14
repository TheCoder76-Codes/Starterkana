<script>
	function actor() {
		window.location.search = '?actor&dev'
	}
	function reload() {
		window.location.reload()
	}
</script>

<div class="w-screen h-screen fixed top-0 left-0 bg-fade/50 grid place-items-center z-50">
	<div class="bg-white rounded-lg p-7 w-[400px] text-center">
		<h1 class="text-2xl font-bold mb-2">An error has occurred</h1>
		<p class="mb-2">
			Starterkana has experienced an error. We suggest you reload the page, however if this popup persists,
			contact the creator to use Actor to troubleshoot.
		</p>
		<button class="btn-main" on:click={reload}>Reload the page ↻</button>
		<button class="btn-fade" on:click={actor}>Open Actor ↗</button>
	</div>
</div>

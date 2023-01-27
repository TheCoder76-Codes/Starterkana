<script>
	export let userData
	let notice = true
	if (localStorage.getItem('notice')) notice = false
	function dismiss() {
		if (userData.cookies) {
			localStorage.setItem('notice', 'true')
		}
		notice = false
	}
</script>

{#if notice}
	<div class="w-screen h-screen fixed top-0 left-0 grid place-content-center bg-fade bg-opacity-50">
		<div class="bg-white rounded-lg p-5 max-w-lg min-h-[200px] grid place-content-center">
			<div>
				<h1 class="text-2xl font-semibold my-3 text-main">Groups rework</h1>
				<p class="text-md font-normal mb-2">
					In the next few days, the Groups feature is going to be reworked, as the server is going to be
					changed. This means that, when the new version is released, you will leave your current group and
					will be unable to join back. Don't worry- your points will still be stored on your device.
				</p>
				<button class="btn-main" on:click={dismiss}>Dismiss</button>
			</div>
		</div>
	</div>
{/if}

<script>
	export let aboutPage
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
</script>

<main class="p-10 h-screen overflow-x-hidden">
	<div class="flex flex-row place-content-between">
		<h2 class="text-2xl font-semibold text-main">Starterkana</h2>
		<p class="text-fade text-lg hover:underline hover:cursor-pointer" on:click={openPage} on:keypress={openPage}>
			{vNumber}
		</p>
	</div>
	<h2 class="text-lg mt-2">Collected errors:</h2>

	<p
		class="text-fade text-lg hover:underline hover:cursor-pointer mt-5"
		on:click={() => (aboutPage = !aboutPage)}
		on:keypress={() => (aboutPage = !aboutPage)}
	>
		About ↗
	</p>
</main>

<script>
	export let steps
	export let userData

	let noCookiesB = false

	function allowCookies() {
		userData.cookies = true
		steps.cookies = true
		if (userData.cookies) {
			localStorage.setItem('userData', JSON.stringify(userData))
		}
	}
	function noCookies() {
		userData.cookies = false
		steps.cookies = true
	}
</script>

<h1 class="text-4xl font-bold m-2">We use cookies to personalise your experience.</h1>
<h2 class="text-2xl font-medium m-2">We only store your preferences and diagnotstic data. No ads. No trackers.</h2>
<button class="btn-main" on:click={allowCookies}>Yes, I allow cookies.</button>
<button class="btn-fade" on:click={() => (noCookiesB = true)}>No, don't store any cookies.</button>
{#if noCookiesB}
	<div class="w-screen h-screen fixed top-0 left-0 grid place-content-center bg-fade bg-opacity-50">
		<div class="bg-white rounded-lg p-5 max-w-lg text-center min-h-[200px] grid place-content-center">
			<div>
				<h1 class="text-2xl font-bold my-3">Are you sure?</h1>
				<p class="text-md font-normal mb-2">
					By disabling cookies, your data will reset each time you reload the page and you will be prompted
					through setup again.
				</p>
				<div class="md:flex">
					<button class="btn-main" on:click={allowCookies}>Yes, I allow cookies.</button>
					<button class="btn-fade" on:click={noCookies}>No, don't store any cookies.</button>
				</div>
			</div>
		</div>
	</div>
{/if}

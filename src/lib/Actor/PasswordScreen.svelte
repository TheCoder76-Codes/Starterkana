<script>
	export let unlocked
	export let fullAccess
	import CryptoJS from 'crypto-js'
	let password
	let invalid = false

	function loginForm() {
		if (!password) {
			invalid = true
			return
		}
		if (password.length > 0) {
			if (
				CryptoJS.AES.decrypt(
					'U2FsdGVkX18TGOkqKqajZRtFENqdlXKuHTHEF90kR+oWrQrK+O74yt3uVXn61HOM',
					password
				).toString(CryptoJS.enc.Utf8) === 'unlock actor for me pls'
			) {
				unlocked = true
				fullAccess = true
				return
			} else if (
				CryptoJS.AES.decrypt(
					'U2FsdGVkX18FziwsoTy7g9FayKaLTsRlHpfuhRqwf2i975unpHRf8L6gBkZ8OhAD',
					password
				).toString(CryptoJS.enc.Utf8) == 'unlock but only err pls'
			) {
				unlocked = true
				fullAccess = false
				return
			} else {
				invalid = true
				return
			}
		} else {
			invalid = true
			return
		}
	}
</script>

<main class="grid md:grid-cols-[1fr_2fr] w-screen h-screen overflow-hidden">
	<div class="flex place-content-between p-10 flex-col">
		<h1 class="text-2xl font-semibold text-main">Actor</h1>
		<form on:submit|preventDefault={loginForm}>
			<h2 class="text-2xl font-semibold">This area is restricted. Please login.</h2>
			<input
				type="password"
				placeholder="Password"
				bind:value={password}
				class="mt-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2 w-2/3"
				autocomplete="off"
			/> <br />
			{#if invalid}
				<p class="text-red-500 font-medium text-md mt-2">Incorrect Password.</p>
			{/if}
			<input
				type="submit"
				class="bg-highlight text-black p-2.5 rounded-lg mt-2 transition-transform ease-in-out duration-300 hover:scale-105 w-2/3"
				value="Continue →"
			/>
		</form>
		<div />
	</div>
	<div class="hidden bg-gradient-to-bl from-highlight to-main w-full h-full md:grid place-items-center">
		<h1 class="text-6xl font-semibold text-white">Starterkana.</h1>
	</div>
</main>

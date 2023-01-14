<script>
	export let userData
	export let errors
	import CryptoJS from 'crypto-js'
	import MainActor from './MainActor.svelte'
	import PasswordScreen from './PasswordScreen.svelte'
	let unlocked = false
	let fullAccess = false
</script>

{#if !unlocked}
	<PasswordScreen bind:unlocked bind:fullAccess />
{:else if unlocked}
	<MainActor bind:userData bind:errors bind:fullAccess />
{:else}
	<PasswordScreen bind:unlocked bind:fullAccess />
{/if}

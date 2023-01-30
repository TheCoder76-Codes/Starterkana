<script>
	import JoinGroup from './JoinGroup.svelte'
	import Leaderboard from './Leaderboard.svelte'
	export let userData
	let groupPopup = false
	function jg() {
		groupPopup = true
	}
</script>

<h2 class="text-2xl font-semibold text-black my-5">Groups</h2>

{#if userData.group && userData.groupID}
	<Leaderboard bind:userData />
{:else if groupPopup}
	<JoinGroup bind:groupPopup bind:userData />
{:else}
	<p>You are not in a group.</p>
	<button class="btn-main" on:click={jg}>Join or create a group ↗</button>
{/if}

<script>
	export let userData
	export let setupSyncPage

	let checking = false
	let error = null
	let success = false
	let euid = ''

	function checkuid() {
		if (userData.uid == euid) {
			error = 'You cannot enter your own UID!'
			return
		}
		if (userData.group.scores) {
			let f = userData.group.scores.filter((item) => item.uid == euid)
			if (f.length > 0) {
				checking = true
				fetch(userData.groupID, {
					method: 'GET',
				})
					.then((res) => res.json())
					.then((res) => {
						userData.group = res
						userData = userData
						let me = userData.group.scores.filter((item) => item.uid == euid)
						if (me.length > 0 && me[0].points < userData.points) {
							let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)
							withoutMe = userData.group.scores.filter((item) => item.uid != euid)

							withoutMe.push({
								name: userData.name,
								points: userData.points,
								uid: euid,
							})
							userData.group.scores = withoutMe

							let stringify = JSON.stringify(userData.group)
							fetch(userData.groupID, {
								method: 'PUT',
								headers: {
									'Content-Type': 'application/json',
									'Content-Length': String(stringify.length),
								},
								body: stringify,
							}).then((res) => {
								userData.uid = euid
								error = null
								success = true
								checking = false
							})
						} else if (me.length > 0) {
							let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)

							userData.group.scores = withoutMe

							let stringify = JSON.stringify(userData.group)
							fetch(userData.groupID, {
								method: 'PUT',
								headers: {
									'Content-Type': 'application/json',
									'Content-Length': String(stringify.length),
								},
								body: stringify,
							}).then((res) => {
								userData.uid = euid
								error = null
								success = true
								checking = false
							})
						} else {
							// Error: entered UID doesn't exist in remote group
							error = "That User ID doesn't exist."
						}
						userData.group.scores.sort((a, b) => {
							if (a.points > b.points) return -1 // any negative number works
							if (a.points < b.points) return 1 // any positive number works
							return 0 // equal values MUST yield zero
						})
						if (userData.cookies) {
							localStorage.setItem('userData', JSON.stringify(userData))
						}
					})
			} else {
				error = "That User ID doesn't exist."
			}
		} else {
			error = 'You are not in a group. Try reloading the page.'
		}
	}
</script>

<div class="grid place-content-center w-full h-full overflow-hidden">
	<div class="max-w-xl">
		<h1 class="text-3xl font-bold mb-2">Sync Setup</h1>
		<p>
			Sync allows you to save your points between devices to avoid conflict while in a group. To use sync, you
			must set the same User ID for both devices, and must be in the same group.
		</p>
		{#if userData.group}
			{#if !checking}
				{#if error}
					<p class="text-red-500 font-medium">{error}</p>
				{/if}
				{#if success}
					<p class="text-correct">Success! You can now go back to your dashboard.</p>
				{/if}
				<h2 class="text-lg mt-5">This Device's User ID: {userData.uid}</h2>
				<h2 class="text-lg mt-2">Enter in another device's User ID:</h2>
				<input
					type="text"
					class="m-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
					placeholder="Enter in a User ID"
					bind:value={euid}
				/>
				<button class="btn-main" on:click={checkuid}> Check User ID </button>
			{:else}
				<p class="text-lg mt-5">Checking, please wait...</p>
			{/if}
		{:else}
			<p class="text-red-500 font-medium mt-2">You are not in a group, so you cannot use sync.</p>
		{/if}
		<button class="btn-main" on:click={() => (setupSyncPage = false)}> ← Go back to dashboard </button>
	</div>
</div>

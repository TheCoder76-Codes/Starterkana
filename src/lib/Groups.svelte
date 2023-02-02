<script>
	export let userData

	let joinGroup
	let gidErr

	const uid = function () {
		return Date.now().toString(36) + Math.random().toString(36).substr(2)
	}
	function jGroup() {
		let gid = joinGroup.value
		if (gid.length <= 0) {
			gidErr = true
			return
		}
		if (!gid.startsWith('https://www.jsonblob.com/api/jsonBlob/')) {
			gid = 'https://www.jsonblob.com/api/jsonBlob/' + gid
		}
		fetch(gid, {
			method: 'GET',
		})
			.then((res) => {
				if (res.ok) {
					return res.json()
				} else {
					gidErr = true
					throw new Error('Network error when getting inputted GID: ' + res.status)
				}
			})
			.then((res) => {
				userData.groupID = gid
				userData.group = res
				userData = userData
				let me = userData.group.scores.filter((item) => item.uid == userData.uid)
				if (me.length > 0 && me[0].points < userData.points) {
					let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)
					withoutMe.push({
						name: userData.name,
						points: userData.points,
						uid: userData.uid,
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
					}).then((res) => res.json())
				} else if (me.length > 0 && me[0].points > userData.points) {
					let index = userData.group.findIndex(
						(item) => item.points < userData.points && item.uid == userData.uid
					)
					userData.group.splice(index, 1)
				} else {
					let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)
					withoutMe.push({
						name: userData.name,
						points: userData.points,
						uid: userData.uid,
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
					}).then((res) => res.json())
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
	}
	function createGroup() {
		userData.group = {
			scores: [
				{
					name: userData.name,
					points: userData.points,
					uid: userData.uid,
				},
			],
		}
		fetch('https://www.jsonblob.com/api/jsonBlob', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': String(userData.group.length),
			},
			body: JSON.stringify(userData.group),
		}).then((res) => {
			userData.groupID = res.headers.get('location')
			if (userData.groupID.startsWith('http://')) {
				userData.groupID = 'https://' + userData.groupID.split('http://')[1]
			}
			userData = userData
			if (userData.cookies) {
				localStorage.setItem('userData', JSON.stringify(userData))
			}
		})
	}
	if (!userData.uid) {
		userData.uid = uid()
		if (userData.cookies) {
			localStorage.setItem('userData', JSON.stringify(userData))
		}
	}

	function leaveGroup() {
		fetch(userData.groupID, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				userData.group = res
				userData = userData
				let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)
				let stringify = JSON.stringify({ scores: withoutMe })
				fetch(userData.groupID, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Content-Length': String(stringify.length),
					},
					body: stringify,
				}).then((res) => {
					userData.group = undefined
					userData.groupID = undefined
					userData = userData
					if (userData.cookies) {
						localStorage.setItem('userData', JSON.stringify(userData))
					}
				})
			})
	}

	if (userData.groupID) {
		fetch(userData.groupID, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				userData.group = res
				userData = userData
				let me = userData.group.scores.filter((item) => item.uid == userData.uid)
				if (me.length > 0 && me[0].points < userData.points) {
					let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)
					withoutMe.push({
						name: userData.name,
						points: userData.points,
						uid: userData.uid,
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
					}).then((res) => res.json())
				} else if (me.length > 0 && me[0].points > userData.points) {
					let index = userData.group.findIndex(
						(item) => item.points < userData.points && item.uid == userData.uid
					)
					userData.group.splice(index, 1)
				} else {
					let withoutMe = userData.group.scores.filter((item) => item.uid != userData.uid)
					withoutMe.push({
						name: userData.name,
						points: userData.points,
						uid: userData.uid,
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
					}).then((res) => res.json())
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
	}
</script>

<h2 class="text-2xl font-semibold text-black my-5">Groups</h2>

{#if !userData.groupID || !userData.groupID.startsWith('https://www.jsonblob.com/')}
	<p class="mt-5 m-2">Looks like you aren't in a group yet.</p>
	<p class="text-red-500 m-2">
		By joining or creating a group, your name, points, and a unique ID will be sent online.
	</p>
	<button class="btn-main" on:click={createGroup}>Create a group +</button> <br />
	<input
		type="text"
		class="m-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
		placeholder="Group ID"
		bind:this={joinGroup}
	/>
	<button class="btn-main" on:click={jGroup}>Join this group</button>
	{#if gidErr}
		<p class="text-red-500">An error occured! Have you put in the correct group ID?</p>
	{/if}
{:else if userData.groupID}
	<div class="bg-highlight p-5 rounded-xl">
		<div class="block md:flex place-content-between w-full flex-row my-2">
			<h1 class="text-xl font-medium">Leaderboard</h1>
			<p>Group ID: {userData.groupID.split('https://www.jsonblob.com/api/jsonBlob/')[1]}</p>
		</div>
		{#each userData.group.scores as score}
			<div class="block md:flex place-content-between w-full flex-row even:bg-main p-2.5 rounded-lg">
				<h1 class="text-lg">{score.name}</h1>
				<h1 class="text-lg">{score.points}</h1>
			</div>
		{/each}
	</div>
	<button class="btn-main" on:click={leaveGroup}>Leave this group →</button>
{:else}
	<p class="mt-5 m-2">Looks like you aren't in a group yet.</p>
	<p class="text-red-500 m-2">
		By joining or creating a group, your name, points, and a unique ID will be sent online, and anyone with the
		group ID will be able to view them.
	</p>
	<button class="btn-main" on:click={createGroup}>Create a group +</button> <br />
	<input
		type="text"
		class="m-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2"
		placeholder="Group ID"
		bind:this={joinGroup}
	/>
	<button class="btn-main" on:click={jGroup}>Join a group</button>
{/if}

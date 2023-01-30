<script>
	import { onMount } from 'svelte'
	import 'vanilla-hcaptcha'
	export let groupPopup
	export let userData

	let captcha
	let captchaComplete = false
	let sk__ = 'b7c83833-7441-429c-8b50-b5022ff0a8e6'
	let joiningGroup = true
	let jInput = ''
	let jerror = null
	let cerror = null
	let loading = false

	onMount(() => {
		captcha.addEventListener('verified', async (e) => {
			console.log('verified event', { token: e.token })
			let res = await fetch(`https://sk-hcaptcha.thecoder76.workers.dev/`, {
				method: 'POST',
				body: JSON.stringify({
					token: e.token,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			res = await res.json()
			if (res.success) {
				captchaComplete = true
			} else {
				captchaComplete = false
				captcha.reset()
			}
		})
		captcha.addEventListener('error', (e) => {
			console.log('error event', { error: e.error })
			captcha.reset()
			captchaComplete = false
		})
	})
	const uid = function () {
		return Date.now().toString(36) + Math.random().toString(36).substr(2)
	}
	function joinSubmit() {
		if (!captchaComplete) {
			captcha.reset()
			jerror = 'Please complete the captcha.'
			return
		}
		if (!jInput || jInput.length < 1) {
			captcha.reset()
			captchaComplete = false
			jerror = 'Please enter a group ID.'
			return
		}
		if (!userData.uid) {
			userData.uid = uid()
		}
		if (!jInput.includes('.')) {
			captcha.reset()
			captchaComplete = false
			jerror = 'Please enter a valid group ID.'
			return
		}
		loading = true
		let kid = jInput.split('.')[0]
		let rid = jInput.split('.')[1]
		fetch(`https://krat.es/${kid}/record/${rid}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.scores) {
					userData.groupID = `${kid}.${res._id}`
					userData.group = res
					loading = false
					groupPopup = false
					if (userData.cookies) {
						localStorage.setItem('userData', JSON.stringify(userData))
					}
				} else {
					captcha.reset()
					captchaComplete = false
					loading = false
					jerror = 'Please enter a valid group ID.'
					return
				}
			})
	}
	// uid().padEnd(20, Math.random().toString(36)[5])
	function createSubmit() {
		if (!captchaComplete) {
			captcha.reset()
			return (cerror = 'Please complete the captcha.')
		}
		if (!userData.uid) {
			userData.uid = uid()
		}
		loading = true
		userData.group = {
			scores: [
				{
					name: userData.name,
					uid: userData.uid,
					points: userData.points,
				},
			],
		}
		let kid = uid().padEnd(20, Math.random().toString(36)[5])
		fetch(`https://krat.es/${kid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': `${JSON.stringify(userData.group).length}`,
			},
			body: JSON.stringify(userData.group),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res._id) {
					userData.groupID = `${kid}.${res._id}`
					loading = false
					groupPopup = false
					if (userData.cookies) {
						localStorage.setItem('userData', JSON.stringify(userData))
					}
				} else {
					captcha.reset()
					captchaComplete = false
					loading = false
					cerror = 'Error: Are you doing this too quickly?'
					return
				}
			})
	}
</script>

<div class="w-screen h-screen fixed top-0 left-0 grid place-content-center bg-fade bg-opacity-50 z-10">
	<div class="bg-white rounded-lg p-5 max-w-lg min-h-[200px] z-50">
		<h1 class="text-2xl font-bold my-3">Join or create a group</h1>
		<p class="text-md font-normal mb-2">
			Groups allow you to see how you place on a leaderboard, and compare your points to others within the group.
		</p>
		<p class="text-md mb-2 text-incorrect">
			By joining a group, your name, user ID, and your points will be sent online, and will be viewable by anyone
			who has the group ID.
		</p>
		{#if !loading}
			<button class="text-fade text-md mb-2 hover:underline" on:click={() => (groupPopup = false)}
				>Close this popup</button
			>
		{/if}
		<label>
			<input type="checkbox" class="hidden" bind:checked={joiningGroup} />
			<div class="bg-highlight rounded-full p-1 flex justify-between w-fit mb-3 hover:cursor-pointer gap-2">
				{#if joiningGroup}
					<p class="p-2 bg-main rounded-full">Join Group</p>
					<p class="p-2">Create Group</p>
				{:else if !joiningGroup}
					<p class="p-2">Join Group</p>
					<p class="p-2 bg-main rounded-full">Create Group</p>
				{/if}
			</div>
		</label>
		{#if !loading}
			{#if joiningGroup}
				<h2 class="text-lg font-semibold my-2">Join Group</h2>
				<input
					type="text"
					class="text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2 my-2"
					placeholder="Enter your group ID"
					bind:value={jInput}
				/>
				{#if jerror}
					<p class="text-red-500">{jerror}</p>
				{/if}
				<br />
				<button
					class="bg-highlight text-black p-2.5 rounded-lg my-2 transition-transform ease-in-out duration-300 hover:scale-105"
					on:click={joinSubmit}>Join this group</button
				>
			{:else}
				<h2 class="text-lg font-semibold my-2">Create Group</h2>
				{#if cerror}
					<p class="text-red-500">{cerror}</p>
				{/if}
				<button
					class="bg-highlight text-black p-2.5 rounded-lg my-2 transition-transform ease-in-out duration-300 hover:scale-105"
					on:click={createSubmit}>Create a new group</button
				>
			{/if}
			<h-captcha bind:this={captcha} site-key={sk__} size="normal" />
		{:else}
			<p>Loading, please wait...</p>
		{/if}
	</div>
</div>

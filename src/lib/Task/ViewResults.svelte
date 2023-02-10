<script>
	export let activeTask
	export let taskHLine
	export let taskKLine
	export let totalCorrect
	export let totalIncorrect
	export let totalCompleted
	export let percentage
	export let sTask
	export let countingCorrect = null
	let HCorrect
	let KCorrect

	if (activeTask.incorrect) {
		HCorrect = taskHLine.filter((item) => !(item[0] + '|' + item[1] in activeTask.incorrect))
		KCorrect = taskKLine.filter((item) => !(item[0] + '|' + item[1] in activeTask.incorrect))
	} else {
		HCorrect = taskHLine
		KCorrect = taskKLine
	}
</script>

<h1 class="text-2xl font-semibold">
	You got <span class="text-main">{totalCorrect}</span> correct out of
	<span class="text-main">{totalCompleted}</span>, with a score of <span class="text-main">{percentage}%</span>.
	{#if countingCorrect}You completed <span class="text-main">{countingCorrect}</span> questions in 60 seconds.{/if}
</h1>
{#if totalIncorrect > 0}
	<h2 class="text-xl mt-2 font-semibold">Here's what you should work on:</h2>
	<div class="block md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5">
		{#each Object.entries(activeTask.incorrect) as [jp, count]}
			<div class="m-2 bg-highlight p-5 text-center rounded-lg">
				<h1 class="text-4xl font-jp">{jp.split('|')[0]}</h1>
				<h2 class="text-xl font-medium mt-1">{jp.split('|')[1]}</h2>
				<h2 class="text-xl font-medium mt-1">
					You got "{jp.split('|')[1]}" wrong {count}
					{count == 1 ? 'time' : ' times'}.
				</h2>
			</div>
		{/each}
	</div>
{:else}
	<h2 class="text-xl mt-2 font-semibold">You didn't get any incorrect!</h2>
{/if}
{#if totalCorrect > 0}
	<h2 class="text-xl mt-2 font-semibold">Here's what you got correct:</h2>
	<div class="block md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
		{#each HCorrect as [jp, ro]}
			<div class="m-2 bg-highlight p-5 text-center rounded-lg">
				<h1 class="text-4xl font-jp">{jp}</h1>
				<h2 class="text-xl font-medium mt-1">{ro.split('|')[0]}</h2>
			</div>
		{/each}
		{#each KCorrect as [jp, ro]}
			<div class="m-2 bg-highlight p-5 text-center rounded-lg">
				<h1 class="text-4xl font-jp">{jp}</h1>
				<h2 class="text-xl font-medium mt-1">{ro.split('|')[0]}</h2>
			</div>
		{/each}
	</div>
{:else}
	<h2 class="text-xl mt-2 font-semibold">You didn't get any correct! Try harder next time!</h2>
{/if}
<button
	class="btn-main"
	on:click={() => {
		activeTask = null
		sTask = false
	}}>← Go back to your dashboard</button
>

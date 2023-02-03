<script>
	export let activeTask
	export let userData
	export let sTask
	export let streaks
	import * as wanakana from 'wanakana'
	import { onMount } from 'svelte'
	import ViewResults from './ViewResults.svelte'

	function addStreaks() {
		const isToday = (someDate) => {
			const today = new Date()
			return (
				someDate.getDate() == today.getDate() &&
				someDate.getMonth() == today.getMonth() &&
				someDate.getFullYear() == today.getFullYear()
			)
		}
		let lastItem = streaks[streaks.length - 1]
		if (lastItem) {
			if (!isToday(new Date(lastItem))) {
				streaks.push(new Date())
			}
		} else {
			streaks.push(new Date())
		}
	}

	let hiragana = {
		a: [
			['あ', 'a'],
			['い', 'i'],
			['う', 'u'],
			['え', 'e'],
			['お', 'o'],
		],
		ka: [
			['か', 'ka'],
			['き', 'ki'],
			['く', 'ku'],
			['け', 'ke'],
			['こ', 'ko'],
		],
		sa: [
			['さ', 'sa'],
			['し', 'shi'],
			['す', 'su'],
			['せ', 'se'],
			['そ', 'so'],
		],
		ta: [
			['た', 'ta'],
			['ち', 'chi'],
			['つ', 'tsu'],
			['て', 'te'],
			['と', 'to'],
		],
		na: [
			['な', 'na'],
			['に', 'ni'],
			['ぬ', 'nu'],
			['ね', 'ne'],
			['の', 'no'],
		],
		ha: [
			['は', 'ha'],
			['ひ', 'hi'],
			['ふ', 'fu|hu'],
			['へ', 'he'],
			['ほ', 'ho'],
		],
		ma: [
			['ま', 'ma'],
			['み', 'mi'],
			['む', 'mu'],
			['め', 'me'],
			['も', 'mo'],
		],
		ya: [
			['や', 'ya'],
			['ゆ', 'yu'],
			['よ', 'yo'],
		],
		ra: [
			['ら', 'ra'],
			['り', 'ri'],
			['る', 'ru'],
			['れ', 're'],
			['ろ', 'ro'],
		],
		wa: [
			['わ', 'wa'],
			['を', 'wo'],
			['ん', 'n'],
		],
		ga: [
			['が', 'ga'],
			['ぎ', 'gi'],
			['ぐ', 'gu'],
			['げ', 'ge'],
			['ご', 'go'],
		],
		za: [
			['ざ', 'za'],
			['じ', 'ji|zi'], //
			['ず', 'zu'],
			['ぜ', 'ze'],
			['ぞ', 'zo'],
		],
		da: [
			['だ', 'da'],
			['ぢ', 'di'],
			['づ', 'dzu|du'],
			['で', 'de'],
			['ど', 'do'],
		],
		ba: [
			['ば', 'ba'],
			['び', 'bi'],
			['ぶ', 'bu'],
			['べ', 'be'],
			['ぼ', 'bo'],
		],
		pa: [
			['ぱ', 'pa'],
			['ぴ', 'pi'],
			['ぷ', 'pu'],
			['ぺ', 'pe'],
			['ぽ', 'po'],
		],
		kya: [
			['きゃ', 'kya'],
			['きゅ', 'kyu'],
			['きょ', 'kyo'],
		],
		sha: [
			['しゃ', 'sha'],
			['しゅ', 'shu'],
			['しょ', 'sho'],
		],
		cha: [
			['ちゃ', 'cha'],
			['ちゅ', 'chu'],
			['ちょ', 'cho'],
		],
		nya: [
			['にゃ', 'nya'],
			['にゅ', 'nyu'],
			['にょ', 'nyo'],
		],
		hya: [
			['ひゃ', 'hya'],
			['ひゅ', 'hyu'],
			['ひょ', 'hyo'],
		],
		mya: [
			['みゃ', 'mya'],
			['みゅ', 'myu'],
			['みょ', 'myo'],
		],
		rya: [
			['りゃ', 'rya'],
			['りゅ', 'ryu'],
			['りょ', 'ryo'],
		],
		gya: [
			['ぎゃ', 'gya'],
			['ぎゅ', 'gyu'],
			['ぎょ', 'gyo'],
		],
		ja: [
			['じゃ', 'ja|jya'],
			['じゅ', 'ju|jyu'],
			['じょ', 'jo|jyo'],
		],
		bya: [
			['びゃ', 'bya'],
			['びゅ', 'byu'],
			['びょ', 'byo'],
		],
		pya: [
			['ぴゃ', 'pya'],
			['ぴゅ', 'pyu'],
			['ぴょ', 'pyo'],
		],
		dya: [
			['ぢゃ', 'dya'],
			['ぢゅ', 'dyu'],
			['ぢょ', 'dyo'],
		],
	}
	let katakana = {
		a: [
			['ア', 'a'],
			['イ', 'i'],
			['ウ', 'u'],
			['エ', 'e'],
			['オ', 'o'],
		],
		ka: [
			['カ', 'ka'],
			['キ', 'ki'],
			['ク', 'ku'],
			['ケ', 'ke'],
			['コ', 'ko'],
		],
		sa: [
			['サ', 'sa'],
			['シ', 'shi'],
			['ス', 'su'],
			['セ', 'se'],
			['ソ', 'so'],
		],
		ta: [
			['タ', 'ta'],
			['チ', 'chi'],
			['ツ', 'tsu'],
			['テ', 'te'],
			['ト', 'to'],
		],
		na: [
			['ナ', 'na'],
			['ニ', 'ni'],
			['ヌ', 'nu'],
			['ネ', 'ne'],
			['ノ', 'no'],
		],
		ha: [
			['ハ', 'ha'],
			['ヒ', 'hi'],
			['フ', 'fu|hu'],
			['ヘ', 'he'],
			['ホ', 'ho'],
		],
		ma: [
			['マ', 'ma'],
			['ミ', 'mi'],
			['ム', 'mu'],
			['メ', 'me'],
			['モ', 'mo'],
		],
		ya: [
			['ヤ', 'ya'],
			['ユ', 'yu'],
			['ヨ', 'yo'],
		],
		ra: [
			['ラ', 'ra'],
			['リ', 'ri'],
			['ル', 'ru'],
			['レ', 're'],
			['ロ', 'ro'],
		],
		wa: [
			['ワ', 'wa'],
			['ヲ', 'wo'],
			['ン', 'n'],
		],
		ga: [
			['ガ', 'ga'],
			['ギ', 'gi'],
			['グ', 'gu'],
			['ゲ', 'ge'],
			['ゴ', 'go'],
		],
		za: [
			['ザ', 'za'],
			['ジ', 'ji|zi'], // Unsure (but ji)
			['ズ', 'zu'],
			['ゼ', 'ze'],
			['ゾ', 'zo'],
		],
		da: [
			['ダ', 'da'],
			['ヂ', 'di'],
			['ヅ', 'dzu|du'],
			['デ', 'de'],
			['ド', 'do'],
		],
		ba: [
			['バ', 'ba'],
			['ビ', 'bi'],
			['ブ', 'bu'],
			['ベ', 'be'],
			['ボ', 'bo'],
		],
		pa: [
			['パ', 'pa'],
			['ピ', 'pi'],
			['プ', 'pu'],
			['ペ', 'pe'],
			['ポ', 'po'],
		],
		kya: [
			['キャ', 'kya'],
			['キュ', 'kyu'],
			['キョ', 'kyo'],
		],
		sha: [
			['シャ', 'sha'],
			['シュ', 'shu'],
			['ショ', 'sho'],
		],
		cha: [
			['チャ', 'cha'],
			['チュ', 'chu'],
			['チョ', 'cho'],
		],
		nya: [
			['ニャ', 'nya'],
			['ニュ', 'nyu'],
			['ニョ', 'nyo'],
		],
		hya: [
			['ヒャ', 'hya'],
			['ヒュ', 'hyu'],
			['ヒョ', 'hyo'],
		],
		mya: [
			['ミャ', 'mya'],
			['ミュ', 'myu'],
			['ミョ', 'myo'],
		],
		rya: [
			['リャ', 'rya'],
			['リュ', 'ryu'],
			['リョ', 'ryo'],
		],
		gya: [
			['ギャ', 'gya'],
			['ギュ', 'gyu'],
			['ギョ', 'gyo'],
		],
		ja: [
			['ジャ', 'ja|jya'],
			['ジュ', 'ju|jyu'],
			['ジョ', 'jo|jyo'],
		],
		bya: [
			['ビャ', 'bya'],
			['ビュ', 'byu'],
			['ビョ', 'byo'],
		],
		pya: [
			['ピャ', 'pya'],
			['ピュ', 'pyu'],
			['ピョ', 'pyo'],
		],
		dya: [
			['ヂャ', 'dya'],
			['ヂュ', 'dyu'],
			['ヂョ', 'dyo'],
		],
	}
	let finished

	let belts = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']
	let beltsContain = {
		white: ['a'],
		yellow: ['ka', 'sa', 'ta'],
		orange: ['na', 'ha', 'ma'],
		green: ['ya', 'ra', 'wa'],
		blue: ['ga', 'za', 'da'],
		purple: ['ba', 'pa', 'kya'],
		red: ['sha', 'cha', 'nya'],
		brown: ['hya', 'mya', 'rya'],
		black: ['gya', 'ja', 'bya', 'pya'],
	}
	let taskHLine = []
	let taskKLine = []

	activeTask.hiragana.forEach((item) => {
		taskHLine = taskHLine.concat(hiragana[item])
	})
	taskHLine = taskHLine.filter((item) => typeof item == 'object')
	activeTask.katakana.forEach((item) => {
		taskKLine = taskKLine.concat(katakana[item])
	})
	taskKLine = taskKLine.filter((item) => typeof item == 'object')

	let allArr = taskHLine.concat(taskKLine)
	allArr.sort(() => Math.random() - 0.5)
	onMount(() => {
		input.focus()
		if (activeTask.answerIn == 1) {
			if (wanakana.isHiragana(allArr[index][0])) {
				wanakana.bind(input, { IMEMode: 'toHiragana' })
			} else {
				wanakana.bind(input, { IMEMode: 'toKatakana' })
			}
		}
		let width = 0

		let inte = setInterval(() => {
			width++
			progressBar.style.width = width + '%'
			if (width >= 100) {
				clearInterval(inte)
				allcompleted()
				return
			}
		}, 600)
	})

	function arrayContainsAll(needle, haystack) {
		for (let i = 0; i < needle.length; i++) {
			if (haystack.indexOf(needle[i]) === -1) {
				return false
			}
		}

		return true
	}
	let index = 0

	let totalCorrect = 0
	let totalIncorrect = 0
	let countingCorrect = 0
	let totalCompleted = allArr.length
	let percentage
	let completedBeltsH = []
	let completedBeltsK = []
	let niceCompletedBeltsStrH = ''
	let niceCompletedBeltsStrK = ''
	let niceCompletedBeltsStr = ''
	let progressBar
	let input
	let nudge = `<p class="text-fade">Hint: Press 'Enter' once your done typing</p>`
	let viewingResults = false
	function allcompleted() {
		finished = true
		addStreaks()
		belts.forEach((item) => {
			if (arrayContainsAll(beltsContain[item], activeTask.hiragana)) {
				completedBeltsH.push(item)
			}
		})
		belts.forEach((item) => {
			if (arrayContainsAll(beltsContain[item], activeTask.katakana)) {
				completedBeltsK.push(item)
			}
		})

		for (let key in activeTask.incorrect) {
			totalIncorrect += activeTask.incorrect[key]
		}
		if (!totalIncorrect) totalIncorrect = 0
		totalCorrect = totalCompleted - totalIncorrect
		percentage = (totalCorrect / totalCompleted).toFixed(4) * 100
		completedBeltsH.forEach((item, index) => {
			if (index + 1 == completedBeltsH.length && completedBeltsH.length != 1) {
				niceCompletedBeltsStrH += 'and ' + item + ' belts in Hiragana'
			} else if (completedBeltsH.length == 1) {
				niceCompletedBeltsStrH += item + ' belt in Hiragana'
			} else {
				niceCompletedBeltsStrH += item + ', '
			}
		})
		completedBeltsK.forEach((item, index) => {
			if (index + 1 == completedBeltsK.length && completedBeltsK.length != 1) {
				niceCompletedBeltsStrK += 'and ' + item + ' belts in Katakana'
			} else if (completedBeltsK.length == 1) {
				niceCompletedBeltsStrK += item + ' belt in Katakana'
			} else {
				niceCompletedBeltsStrK += item + ', '
			}
		})
		if (niceCompletedBeltsStrH.length > 0 && niceCompletedBeltsStrK.length > 0) {
			niceCompletedBeltsStr = niceCompletedBeltsStrH + ' and ' + niceCompletedBeltsStrK
		} else if (niceCompletedBeltsStrH.length > 0 && niceCompletedBeltsStrK.length <= 0) {
			niceCompletedBeltsStr = niceCompletedBeltsStrH
		} else if (niceCompletedBeltsStrH.length <= 0 && niceCompletedBeltsStrK.length > 0) {
			niceCompletedBeltsStr = niceCompletedBeltsStrK
		}

		if (typeof userData.points == 'string') {
			userData.points = parseInt(userData.points)
		}

		userData.points += parseInt((countingCorrect / 2).toFixed(0))
		if (completedBeltsK.length > 4 || completedBeltsH.length > 4) userData.points += 10
		if (completedBeltsK.length > 6 || completedBeltsH.length > 6) userData.points += 10
		if (completedBeltsK.length > 8 || completedBeltsH.length > 8) userData.points += 10
		if (userData.cookies) {
			localStorage.setItem('userData', JSON.stringify(userData))
		}
		console.log(
			totalCorrect,
			totalIncorrect,
			percentage,
			totalCompleted,
			completedBeltsH,
			completedBeltsK,
			niceCompletedBeltsStrH,
			niceCompletedBeltsStrK,
			activeTask
		)
	}
	function handleSubmit() {
		let [jp, ro] = allArr[index]
		if (input.value.length <= 0) {
			nudge = `<p class="text-incorrect">Please put in a response!</p>`
			return
		}
		if (activeTask.answerIn == 0) {
			let ans = ro.split('|')
			if (ans.includes(input.value)) {
				if (index + 1 == allArr.length) {
					index = -1
					allArr.sort(() => Math.random() - 0.5)
				}
				index++
				countingCorrect++
				input.value = ''
				input.focus()
				nudge = `<p class="text-fade">Hint: Press 'Enter' once your done typing</p>`
			} else {
				if (activeTask.incorrect) {
					if (activeTask.incorrect[jp + '|' + ro]) {
						activeTask.incorrect[jp + '|' + ro]++
					} else {
						activeTask.incorrect[jp + '|' + ro] = 1
					}
				} else {
					activeTask.incorrect = {}
					activeTask.incorrect[jp + '|' + ro] = 1
				}
				if (index + 1 == allArr.length) {
					index = -1
					allArr.sort(() => Math.random() - 0.5)
				}
				index++
				input.value = ''
				input.focus()
				nudge = `<p class="text-fade">Hint: Press 'Enter' once your done typing</p>`
			}
		} else {
			if (input.value == jp) {
				if (index + 1 == allArr.length) {
					index = -1
					allArr.sort(() => Math.random() - 0.5)
				}
				index++
				countingCorrect++
				input.value = ''
				input.focus()
				nudge = `<p class="text-fade">Hint: Press 'Enter' once your done typing</p>`
				if (activeTask.answerIn == 1) {
					if (wanakana.isHiragana(allArr[index][0])) {
						wanakana.bind(input, { IMEMode: 'toHiragana' })
					} else {
						wanakana.bind(input, { IMEMode: 'toKatakana' })
					}
				}
			} else {
				if (activeTask.incorrect) {
					if (activeTask.incorrect[jp + '|' + ro]) {
						activeTask.incorrect[jp + '|' + ro]++
					} else {
						activeTask.incorrect[jp + '|' + ro] = 1
					}
				} else {
					activeTask.incorrect = {}
					activeTask.incorrect[jp + '|' + ro] = 1
				}
				if (index + 1 == allArr.length) {
					index = -1
					allArr.sort(() => Math.random() - 0.5)
				}
				index++
				input.value = ''
				input.focus()
				nudge = `<p class="text-fade">Hint: Press 'Enter' once your done typing</p>`
				if (activeTask.answerIn == 1) {
					if (wanakana.isHiragana(allArr[index][0])) {
						wanakana.bind(input, { IMEMode: 'toHiragana' })
					} else {
						wanakana.bind(input, { IMEMode: 'toKatakana' })
					}
				}
			}
		}
	}
	function viewResults() {
		viewingResults = true
		finished = false
	}
</script>

{#if finished}
	<div class="w-full h-full grid place-content-center overflow-hidden">
		{#if percentage >= 80}
			<div class="text-center">
				<h1 class="text-4xl text-correct font-semibold">Well done!</h1>
				<p class="text-correct my-2.5">
					You have successfully completed {niceCompletedBeltsStr}!
				</p>
				<button
					class="btn-main"
					on:click={() => {
						activeTask = null
						sTask = false
					}}>← Go back to your dashboard</button
				>
				<button class="btn-main" on:click={viewResults}>View in-depth results →</button>
			</div>
		{:else}
			<div class="text-center">
				<h1 class="text-4xl text-incorrect font-semibold">Nice try</h1>
				<p class="text-incorrect my-2.5">
					You didn't manage to complete {niceCompletedBeltsStr}. Try again next time.
				</p>
				<button
					class="btn-main"
					on:click={() => {
						activeTask = null
						sTask = false
					}}>← Go back to your dashboard</button
				>
				<button class="btn-main" on:click={viewResults}>View in-depth results →</button>
			</div>
		{/if}
	</div>
{:else if viewingResults}
	<ViewResults
		bind:activeTask
		bind:taskHLine
		bind:taskKLine
		bind:totalCorrect
		bind:totalIncorrect
		bind:totalCompleted
		bind:percentage
		bind:sTask
		bind:countingCorrect
	/>
{:else}
	<div class="grid md:p-20 place-content-center w-full h-full overflow-hidden">
		<div class="text-center">
			<h1 class="text-6xl font-semibold mb-10 md:mb-24 lg:mb-64 xl:mb-80 font-jp">
				{allArr[index][0]}
			</h1>
			<form on:submit|preventDefault={handleSubmit} class="mt-10 md:mt-24 lg:mt-64 xl:mt-80">
				{@html nudge}
				<input
					type="text"
					bind:this={input}
					class="m-2 text-lg border rounded-lg border-gray-300 hover:border-gray-400 focus:border-gray-500 outline-none p-2 disabled:hover:cursor-not-allowed"
					placeholder="Type in your answer here"
					id={allArr[index][0]}
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
				/>
			</form>
		</div>
	</div>
	<div class="fixed bottom-0 left-0 w-[calc(100vw-80px)] m-10">
		<div class="w-full h-5 rounded-full bg-highlight">
			<div class="bg-main h-5 rounded-full w-0" bind:this={progressBar} />
		</div>
	</div>
{/if}

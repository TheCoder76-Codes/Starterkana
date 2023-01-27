<script>
	export let activeTask
	export let userData
	export let sTask
	export let streaks
	import * as wanakana from 'wanakana'
	import { onMount } from 'svelte'
	import ViewResults from './ViewResults.svelte'

	function streaksCheck() {
		if (localStorage.getItem('streaks')) {
			let ostreaks = JSON.parse(localStorage.getItem('streaks'))
			if (!ostreaks[0].date) {
				streaks = ostreaks
			} else {
				if (userData.cookies) {
					localStorage.setItem('streaks', JSON.stringify([]))
				}
				streaks = []
			}
		}
		let lastItem = streaks[streaks.length - 1]
		if (lastItem) {
			let ldate = new Date(lastItem) // last date
			let cdate = new Date()
			let ydate = new Date() // yesterdays date
			cdate.setHours(0, 0, 0, 0)
			ldate.setHours(0, 0, 0, 0)
			ydate.setDate(cdate.getDate() - 1)
			ydate.setHours(0, 0, 0, 0)
			if (ldate.toDateString() == ydate.toDateString()) {
				// was yesterday
				streaks.push(cdate)
			} else if (ldate.toDateString() == cdate.toDateString()) {
				// was today
				// nothing
			} else {
				// lost streaks
				streaks = []
			}
		} else {
			// array is empty
			streaks.push(new Date())
		}
		if (userData.cookies) {
			localStorage.setItem('streaks', JSON.stringify(streaks))
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
	function arraysIdentical(arr1, arr2) {
		var i = arr1.length
		if (i !== arr2.length) {
			return false
		}
		while (i--) {
			if (arr1[i] !== arr2[i]) {
				return false
			}
		}
		return true
	}

	function indexOf(arr, val, comparer) {
		for (var i = 0, len = arr.length; i < len; ++i) {
			if (i in arr && comparer(arr[i], val)) {
				return i
			}
		}
		return -1
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
		if (activeTask.answerIn == 1) {
			allArr.forEach(([jp, ro]) => {
				if (wanakana.isHiragana(jp)) {
					wanakana.bind(document.getElementById(jp), { IMEMode: 'toHiragana' })
				} else {
					wanakana.bind(document.getElementById(jp), { IMEMode: 'toKatakana' })
				}
			})
		}
	})

	function arrayContainsAll(needle, haystack) {
		for (let i = 0; i < needle.length; i++) {
			if (haystack.indexOf(needle[i]) === -1) {
				return false
			}
		}

		return true
	}

	let totalCorrect = 0
	let totalIncorrect = 0
	let totalCompleted = allArr.length
	let percentage
	let completedBeltsH = []
	let completedBeltsK = []
	let niceCompletedBeltsStrH = ''
	let niceCompletedBeltsStrK = ''
	let niceCompletedBeltsStr = ''
	let testErr = ''
	let errSeconds = 10
	let fs
	let countdownInt = false
	let viewingResults = false
	let allowedReload = true
	function countdown() {
		clearInterval(fs)
		errSeconds = 10
		fs = setInterval(() => {
			if (countdownInt) {
				errSeconds -= 1
				if (errSeconds <= 0 && countdownInt) {
					reloadThePage()
				}
			}
		}, 1000)
	}
	function reloadThePage() {
		if (allowedReload) {
			window.location.reload()
		}
	}

	if (activeTask.type == 3 && !finished) {
		document.addEventListener('blur', (e) => {
			e.preventDefault()
			testErr = 'You need to focus on this window to complete this test.'
			countdown()
			countdownInt = true
		})

		document.addEventListener('focus', (e) => {
			e.preventDefault()
			countdownInt = false
			testErr = ''
		})
	}
	function allcompleted() {
		finished = true
		countdownInt = false
		allowedReload = false
		clearInterval(fs)
		streaksCheck()
		if (activeTask.type == 3) {
			document.removeEventListener('blur', (e) => {
				e.preventDefault()
				testErr = 'You need to focus on this window to complete this test.'
				countdown()
				countdownInt = true
			})
			countdownInt = false
			clearInterval(fs)
		}
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

		if (activeTask.type == 3) {
			let currentHBelt
			let currentKBelt

			belts.forEach((item, index) => {
				if (userData.hiragana[item] == false && !currentHBelt) {
					currentHBelt = [item, index]
				}
				if (userData.katakana[item] == false && !currentKBelt) {
					currentKBelt = [item, index]
				}
			})
			if (
				completedBeltsH.includes(belts[currentHBelt[1] + 1]) &&
				!userData.hiragana[belts[currentHBelt[1] + 1]]
			) {
				userData.hiragana[belts[currentHBelt[1] + 1]] = true
			}
			if (
				completedBeltsK.includes(belts[currentKBelt[1] + 1]) &&
				!userData.katakana[belts[currentKBelt[1] + 1]]
			) {
				userData.katakana[belts[currentKBelt[1] + 1]] = true
			}
		}

		if (typeof userData.points == 'string') {
			userData.points = parseInt(userData.points)
		}

		userData.points += totalCorrect
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

	function handleSubmit(jp, ro) {
		let input = document.getElementById(jp)
		if (input.value.length <= 0) return
		if (activeTask.answerIn == 0) {
			let ans = ro.split('|')
			if (ans.includes(input.value)) {
				input.parentElement.classList.remove('bg-highlight')
				input.parentElement.classList.add('bg-correct')
				input.parentElement.style.transform = 'scale(1.00)'
				input.disabled = true
				let index = indexOf(allArr, [jp, ro], arraysIdentical)
				if (index > -1 && index + 1 != allArr.length) {
					document.getElementById(allArr[index + 1][0]).focus()
				} else {
					document.getElementById('fbtn').focus()
				}
			} else {
				input.parentElement.classList.remove('bg-highlight')
				input.parentElement.classList.add('bg-incorrect')
				input.placeholder = input.value
				input.value = ''
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
			}
		} else {
			if (input.value == jp) {
				input.parentElement.classList.remove('bg-highlight')
				input.parentElement.classList.add('bg-correct')
				input.parentElement.style.transform = 'scale(1.00)'
				input.disabled = true
				let index = indexOf(allArr, [jp, ro], arraysIdentical)
				if (index > -1 && index + 1 != allArr.length) {
					document.getElementById(allArr[index + 1][0]).focus()
				} else {
					document.getElementById('fbtn').focus()
				}
			} else {
				input.parentElement.classList.remove('bg-highlight')
				input.parentElement.classList.add('bg-incorrect')
				input.placeholder = input.value
				input.value = ''
				if (activeTask.incorrect) {
					if (activeTask.incorrect[jp]) {
						activeTask.incorrect[jp]++
					} else {
						activeTask.incorrect[jp] = 1
					}
				} else {
					activeTask.incorrect = {}
					activeTask.incorrect[jp] = 1
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
	/>
{:else if testErr.length > 0}
	<div class="w-screen h-screen overflow-hidden bg-incorrect fixed top-0 left-0 grid place-items-center">
		<div class="bg-white/50 p-5 rounded-lg text-center max-w-sm">
			<h1 class="text-4xl text-white font-semibold">Test Error</h1>
			<p class="text-white font-medium 2xl my-2 mb-5">{testErr}</p>
			<p class="text-white font-medium 2xl">
				If you do not fix this error in the next {errSeconds} seconds, this page will reload.
			</p>
		</div>
	</div>
{:else}
	<div class="block md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
		{#each allArr as [jp, ro]}
			<form
				class="bg-highlight p-5 rounded-lg m-2 text-center transition-transform ease-in-out duration-300 focus:scale-105"
				on:submit|preventDefault={() => handleSubmit(jp, ro)}
			>
				{#if activeTask.answerIn == 0}
					<h1 class="text-6xl text-white font-jp">{jp}</h1>
					<input
						type="text"
						placeholder="Answer"
						class="text-lg rounded-lg outline-none p-2 mt-5 w-full hover:disabled:cursor-not-allowed"
						autocomplete="off"
						autocorrect="off"
						autocapitalize="off"
						spellcheck="false"
						id={jp}
						on:focus={() => {
							document.getElementById(jp).parentElement.style.transform = 'scale(1.05)'
						}}
						on:blur={() => {
							document.getElementById(jp).parentElement.style.transform = 'scale(1.00)'
						}}
					/>
				{:else if activeTask.answerIn == 1}
					<h1 class="text-6xl text-white">{ro.split('|')[0]}</h1>
					<input
						type="text"
						placeholder="Answer"
						class="text-lg rounded-lg outline-none p-2 mt-5 w-full hover:disabled:cursor-not-allowed"
						autocomplete="off"
						autocorrect="off"
						autocapitalize="off"
						spellcheck="false"
						id={jp}
						on:focus={() => {
							document.getElementById(jp).parentElement.style.transform = 'scale(1.05)'
						}}
						on:blur={() => {
							document.getElementById(jp).parentElement.style.transform = 'scale(1.00)'
						}}
					/>
				{/if}
			</form>
		{/each}
		<button
			class="bg-highlight p-5 rounded-lg m-2 text-center text-white text-4xl font-semibold transition-transform ease-in-out duration-300 focus:scale-105 hover:scale-105 outline-none"
			id="fbtn"
			on:click={allcompleted}>Finish</button
		>
	</div>
{/if}

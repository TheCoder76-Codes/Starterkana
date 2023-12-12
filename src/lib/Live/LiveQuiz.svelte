<script>
	export let activeTask
	export let userData
	export let socket
	export let game
	import './kanji-canvas'
	import * as wanakana from 'wanakana'
	import { onMount } from 'svelte'

	let moduletoImport = 'patterns-ref'
	if (activeTask.kanji) {
		moduletoImport = 'patterns-kanji'
	}
	;(async()=>{
		await import(`./refpatterns/${moduletoImport}.js`)
	})()

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

	let startingTime

	activeTask.hiragana.forEach((item) => {
		taskHLine = taskHLine.concat(hiragana[item])
	})
	taskHLine = taskHLine.filter((item) => typeof item == 'object')
	activeTask.katakana.forEach((item) => {
		taskKLine = taskKLine.concat(katakana[item])
	})
	taskKLine = taskKLine.filter((item) => typeof item == 'object')

	let allArr
	let allKanji = []
	if (!activeTask.kanji) {
		allArr = taskHLine.concat(taskKLine)
		allArr.sort(() => Math.random() - 0.5)
	} else {
		allArr = activeTask.odkanji.concat(activeTask.oskanji)
		allKanji = [...allArr]
		allArr.sort(() => Math.random() - 0.5)
	}
	onMount(() => {
		if (activeTask.answerIn == 1) {
			KanjiCanvas.init('can')
			document.getElementById(allArr[jpIndex][0]).style.transform = 'scale(1.05)'
		}
		startingTime = Date.now()
	})
	let charactersArr = []
	function kcan() {
		let characters = KanjiCanvas.recognize('can')
		characters = characters.split(' ').filter((i) => i != '')
		charactersArr = characters
	}

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
	let totalCompleted = 0
	let ferror = null
	let percentage
	let completedBeltsH = []
	let completedBeltsK = []
	let testErr = ''
	let errSeconds = 10
	let fs
	let countdownInt = false
	let allowedReload = true
	let jpIndex = 0
	let hgOrKk = ''

	hgOrKk = wanakana.isHiragana(allArr[jpIndex][0]) ? 'Hiragana' : activeTask.kanji ? 'Kanji' : 'Katakana'

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
	let totalTime
	let unitMapping = {
		'dunit2': 'OD/Unit 2',
		'dunit3': 'OD/Unit 3',
		'dunit7': 'OD/Unit 7',
		'sunit1': 'OS/Unit 1',
		'sunit2': 'OS/Unit 2',
		'sunit3': 'OS/Unit 3',
		'sunit4': 'OS/Unit 4',
		'sunit5': 'OS/Unit 5',
		'sunit6': 'OS/Unit 6',
		'sunit7': 'OS/Unit 7',
		'sunit8': 'OS/Unit 8',
		'sunit9': 'OS/Unit 9',
		'sunit10': 'OS/Unit 10',
		'sunit11': 'OS/Unit 11',
		'sunit12': 'OS/Unit 12',
	}
	function allcompleted() {
		if (totalCompleted != allArr.length) {
			ferror = 'Please complete all the questions!'
			return
		}
		totalTime = ((Date.now() - startingTime) / 1000).toFixed(2)
		finished = true
		countdownInt = false
		allowedReload = false
		clearInterval(fs)
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
		if (!activeTask.kanji) {
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
		}

		for (let key in activeTask.incorrect) {
			totalIncorrect += activeTask.incorrect[key]
		}
		if (!totalIncorrect) totalIncorrect = 0
		totalCorrect = totalCompleted - totalIncorrect
		percentage = (totalCorrect / totalCompleted).toFixed(4) * 100

		if (typeof userData.points == 'string') {
			userData.points = parseInt(userData.points)
		}

		userData.points += totalCorrect
		if (!activeTask.kanji) {
			if (completedBeltsK.length > 4 || completedBeltsH.length > 4) userData.points += 10
			if (completedBeltsK.length > 6 || completedBeltsH.length > 6) userData.points += 10
			if (completedBeltsK.length > 8 || completedBeltsH.length > 8) userData.points += 10
		}
		if (userData.cookies) {
			localStorage.setItem('userData', JSON.stringify(userData))
		}

		activeTask.totalIncorrect = totalIncorrect
		activeTask.totalCompleted = totalCompleted
		activeTask.totalCorrect = totalCorrect
		activeTask.percentage = percentage
		activeTask.time = totalTime

		socket.emit('playerCompletedTask', activeTask, game, userData, (res) => (game = res))
	}

	function handleSubmit(jp, ro = null) { // in kanji mode, jp = kanji, ro = reading (e.g. jp = 時 and ro = 'ji|toki')
		let input
		if (ro) input = document.getElementById(jp)
		if (ro && input.value.length <= 0) return
		if (activeTask.answerIn == 0) {
			let ans = ro.split('|')
			if (ans.includes(input.value)) {
				totalCompleted += 1
				input.parentElement.classList.remove('bg-highlight')
				input.parentElement.classList.add('bg-correct')
				input.parentElement.style.transform = 'scale(1.00)'
				input.disabled = true
				let index = -1
				if (!activeTask.kanji) {
					index = indexOf(allArr, [jp, ro], arraysIdentical)
				} else {
					index = allArr.findIndex((item) => item[0] == jp)
				}
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
						// activeTask.incorrect[jp + '|' + ro]++ // Removed due to negative percentages
					} else {
						activeTask.incorrect[jp + '|' + ro] = 1
					}
				} else {
					activeTask.incorrect = {}
					activeTask.incorrect[jp + '|' + ro] = 1
				}
			}
		} else {
			let item = allArr[jpIndex] // ['あ', 'a'] or ['時', 'じ|とき', 'ji|toki', 'time|hour']
			if (jp == item[0]) {
				// correct
				// reset canvas, recognized characters and add to jpIndex
				totalCompleted++
				let form = document.getElementById(item[0])
				form.classList.remove('bg-highlight')
				form.classList.add('bg-correct')
				form.style.transform = 'scale(1.00)'
				KanjiCanvas.erase('can')
				charactersArr = []
				if (allArr[jpIndex + 1]) {
					jpIndex++
					hgOrKk = wanakana.isHiragana(allArr[jpIndex][0]) ? 'Hiragana' : activeTask.kanji ? 'Kanji' : 'Katakana'
					document.getElementById(allArr[jpIndex][0]).style.transform = 'scale(1.05)'
				} else {
					document.getElementById('fbtn').focus()
				}
			} else {
				// incorrect
				let form = document.getElementById(item[0])
				form.classList.remove('bg-highlight')
				form.classList.add('bg-incorrect')
				KanjiCanvas.erase('can')
				charactersArr = []
				if (activeTask.incorrect) {
					if (activeTask.incorrect[jp + '|' + ro]) {
						// activeTask.incorrect[jp + '|' + ro]++ // Removed due to negative percentages
					} else {
						activeTask.incorrect[jp + '|' + ro] = 1
					}
				} else {
					activeTask.incorrect = {}
					activeTask.incorrect[jp + '|' + ro] = 1
				}
			}
		}
	}

	document.body.addEventListener('touchend', function () {
		kcan()
	})
</script>

{#if finished}
	<div
		class="bg-gradient-to-bl from-highlight to-main w-screen h-screen grid place-items-center fixed top-0 left-0 overflow-hidden"
	>
		<div class="text-center">
			<h1 class="font-semibold text-5xl text-white mb-2">Finished!</h1>
			<h3 class="font-medium text-2xl text-white">
				You completed all {activeTask.totalCompleted} questions in {totalTime} seconds!
			</h3>
			<p class="text-white text-md">Wait for the host to start another game.</p>
		</div>

		<h2 class="font-semibold text-2xl absolute bottom-2.5 left-2.5 text-white">Starterkana.</h2>
	</div>
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
		{#if activeTask.answerIn == 0}
			{#if activeTask.kanji}
				{#each allArr as [kanji, jp, ro, meaning]}
					<form
						class="bg-highlight p-5 rounded-lg m-2 text-center transition-transform ease-in-out duration-300 focus:scale-105"
						on:submit|preventDefault={() => handleSubmit(kanji, ro)}
					>
						<h1 class="text-6xl text-white font-jp">{kanji}</h1>
						<input
							type="text"
							placeholder="Answer"
							class="text-lg rounded-lg outline-none p-2 mt-5 w-full hover:disabled:cursor-not-allowed"
							autocomplete="off"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
							id={kanji}
							on:focus={() => {
								document.getElementById(kanji).parentElement.style.transform = 'scale(1.05)'
							}}
							on:blur={() => {
								document.getElementById(kanji).parentElement.style.transform = 'scale(1.00)'
							}}
						/>
					</form>
				{/each}
			{:else}
				{#each allArr as [jp, ro]}
					<form
						class="bg-highlight p-5 rounded-lg m-2 text-center transition-transform ease-in-out duration-300 focus:scale-105"
						on:submit|preventDefault={() => handleSubmit(jp, ro)}
					>
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
					</form>
				{/each}
			{/if}
		{:else if activeTask.answerIn == 1}
				{#each allArr as [jp, ro]}
					<form
						class="bg-highlight p-5 rounded-lg m-2 text-center transition-transform ease-in-out duration-300 focus:scale-105"
						id={jp}
						on:submit|preventDefault={() => handleSubmit(jp, ro)}
					>
						<h1 class="text-6xl text-white">{ro.split('|')[0]}</h1>
						<div class="hidden" data-jp={jp} data-ro={ro} id="data" />
					</form>
				{/each}
			<div
				class="w-screen h-[40vh] fixed bottom-0 left-0 p-5 lg:px-16 bg-highlight lg:flex lg:flex-row overflow-y-auto"
			>
				<div>
					<h1 class="font-semibold text-xl m-2.5">Drawing Canvas</h1>
					<p class="text-base mx-2.5">{hgOrKk}</p>
					<div class="flex flex-row">
						<canvas
							width="256px"
							height="256px"
							id="can"
							on:click={kcan}
							class="bg-white rounded-lg m-2.5"
						/>
						<div>
							<button
								class="text-black p-2.5 rounded-lg m-2 transition-transform ease-in-out duration-300 hover:scale-105 bg-white"
								on:click={() => KanjiCanvas.erase('can')}>↻ Erase</button
							>
							<br />
							<button
								class="text-black p-2.5 rounded-lg m-2 transition-transform ease-in-out duration-300 hover:scale-105 bg-white"
								on:click={() => KanjiCanvas.deleteLast('can')}>↩ Undo</button
							>
						</div>
					</div>
				</div>
				<div>
					<h1 class="font-semibold text-xl m-2.5">Recognized Characters</h1>
					{#each charactersArr as character}
						<button
							class="w-fit h-fit font-jp bg-white p-2.5 rounded-lg m-2 transition-transform ease-in-out duration-300 hover:scale-105 text-black text-6xl"
							on:click={() => handleSubmit(character)}>{character}</button
						>
					{/each}
				</div>
			</div>
		{/if}
		<button
			class="bg-highlight p-5 rounded-lg m-2 text-center text-white text-4xl font-semibold transition-transform ease-in-out duration-300 focus:scale-105 hover:scale-105 outline-none"
			id="fbtn"
			on:click={allcompleted}>Finish</button
		>
	</div>
{/if}

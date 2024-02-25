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
		} else {
			input.focus()
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
	let charactersArr = []
	let inTimeout = false
	function kcan() {
		if (!inTimeout) {
			let characters = KanjiCanvas.recognize('can')
			characters = characters.split(' ').filter((i) => i != '')
			charactersArr = characters
		}
	}

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
	let progressBar
	let input
	let nudge = `<p class="text-fade">Hint: Press 'Enter' once your done typing</p>`
	let jpIndex = 0
	let hgOrKk = ''

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
		finished = true

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

		userData.points += parseInt((countingCorrect / 2).toFixed(0))
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
		activeTask.countingCorrect = countingCorrect
		activeTask.time = totalTime

		socket.emit('playerCompletedTask', activeTask, game, userData, (res) => (game = res))
	}

	if (activeTask.answerIn == 1) {
		nudge = `<p class="text-fade">Hint: Click on a character once your done writing.</p>`
		if (wanakana.isHiragana(allArr[jpIndex][0])) {
			hgOrKk = 'Hiragana'
		} else {
			hgOrKk = 'Katakana'
		}
	}
	function handleSubmit(jpI = null) {
		let jp, ro
		if (activeTask.kanji) {
			jp = allArr[index][0]
			ro = allArr[index][2]
		} else {
			jp = allArr[index][0]
			ro = allArr[index][1]
		}
		if (!jpI && input.value.length <= 0) {
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
						// activeTask.incorrect[jp + '|' + ro]++
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
			let item = allArr[jpIndex] // ['あ', 'a']
			if (jpI == item[0]) {
				// correct
				// reset canvas, recognized characters and add to jpIndex
				nudge = `<p class="text-correct">Correct! Well done!</p>`
				if (index + 1 == allArr.length) {
					index = -1
					jpIndex = -1
					allArr.sort(() => Math.random() - 0.5)
				}
				index++
				countingCorrect++
				KanjiCanvas.erase('can')
				charactersArr = []
				jpIndex++
				if (wanakana.isHiragana(allArr[jpIndex][0])) {
					hgOrKk = 'Hiragana'
				} else {
					hgOrKk = 'Katakana'
				}
			} else {
				// incorrect
				nudge = `<p class="text-incorrect">Incorrect! Try again!</p>`
				KanjiCanvas.erase('can')
				charactersArr = []
				if (activeTask.incorrect) {
					if (activeTask.incorrect[jp + '|' + ro]) {
						// activeTask.incorrect[jp + '|' + ro]++
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

	if (activeTask.answerIn == 1) {
		document.body.addEventListener('touchend', function () {
			kcan()
		})
	}
</script>

{#if finished}
	<div
		class="bg-gradient-to-bl from-highlight to-main w-screen h-screen grid place-items-center fixed top-0 left-0 overflow-hidden"
	>
		<div class="text-center">
			<h1 class="font-semibold text-5xl text-white mb-2">Finished!</h1>
			<h3 class="font-medium text-2xl text-white">
				You managed to get {activeTask.totalCorrect} correct answers in 60 seconds, with {activeTask.percentage}%
				accuracy.
			</h3>
			<p class="text-white text-md">Wait for the host to start another game.</p>
		</div>

		<h2 class="font-semibold text-2xl absolute bottom-2.5 left-2.5 text-white">Starterkana.</h2>
	</div>
{:else if activeTask.answerIn == 0}
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
{:else}
	<div class="h-[calc(40vh)] w-full text-center mt-10 md:mt-20 flex flex-col place-content-between">
		<div>
			<h1 class="text-6xl font-semibold">
				{activeTask.kanji ? allArr[index][2].split('|')[0] : allArr[index][1].split('|')[0]}
			</h1>
		</div>

		<div>
			<div class="mb-5">
				{@html nudge}
			</div>
			<div class="w-full h-5 rounded-full bg-highlight">
				<div class="bg-main h-5 rounded-full w-0" bind:this={progressBar} />
			</div>
		</div>
	</div>
	<div class="w-screen h-[40vh] fixed bottom-0 left-0 p-5 lg:px-16 bg-highlight lg:flex lg:flex-row overflow-y-auto">
		<div>
			<h1 class="font-semibold text-xl m-2.5 text-left">Drawing Canvas</h1>
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
			<h1 class="font-semibold text-xl m-2.5 text-left">Recognized Characters</h1>
			{#each charactersArr as character}
				<button
					class="w-fit h-fit font-jp bg-white p-2.5 rounded-lg m-2 transition-transform ease-in-out duration-300 hover:scale-105 text-black text-6xl"
					on:click={() => handleSubmit(character)}>{character}</button
				>
			{/each}
		</div>
	</div>
{/if}

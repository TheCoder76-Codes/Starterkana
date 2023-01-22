<script>
	import Quiz from './Quiz.svelte'
	import Learn from './Learn.svelte'
	import SpeedSkills from './SpeedSkills.svelte'
	export let activeTask
	export let userData
	export let sTask
	export let streaks

	let invalid = false

	if (!activeTask) {
		activeTask = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
	}
	if (activeTask.incorrect) activeTask.incorrect = null
	let inTask = false

	function startTask() {
		if (activeTask.hiragana.length > 0 || activeTask.katakana.length > 0) {
			inTask = true
		} else {
			invalid = true
		}
	}

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
	let mainKatakana = {
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
	}
	let dakutenKatakana = {
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
	}
	let comboKatakana = {
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
	let mainHiragana = {
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
	}
	let dakutenHiragana = {
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
	}
	let comboHiragana = {
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
</script>

{#if inTask}
	{#if activeTask.type == 0}
		<Quiz bind:userData bind:activeTask bind:sTask bind:streaks />
	{:else if activeTask.type == 1}
		<Learn bind:userData bind:activeTask bind:sTask bind:streaks />
	{:else if activeTask.type == 2}
		<SpeedSkills bind:userData bind:activeTask bind:sTask bind:streaks />
	{:else if activeTask.type == 3}
		<Quiz bind:userData bind:activeTask bind:sTask bind:streaks />
	{/if}
{:else}
	<h1 class="text-2xl font-semibold">Starting task</h1>
	<div class="block md:grid grid-cols-2 w-full mt-2 gap-5">
		<div>
			<label class="text-lg m-2">
				<input type="radio" name="type" value={0} bind:group={activeTask.type} />
				Quiz
			</label> <br />
			<label class="text-lg m-2">
				<input type="radio" name="type" value={1} bind:group={activeTask.type} />
				Learn
			</label><br />
			<label class="text-lg m-2">
				<input type="radio" name="type" value={2} bind:group={activeTask.type} />
				Speed Skills
			</label> <br />
			<label class="text-lg m-2">
				<input type="radio" name="type" value={3} bind:group={activeTask.type} />
				Test
			</label> <br />
		</div>
		<div>
			<div class="sm:block md:hidden m-5" />
			<label class="text-lg m-2">
				<input type="radio" name="answerIn" bind:group={activeTask.answerIn} value={0} />
				Answer in Romaji
			</label> <br />
			<label class="text-lg m-2">
				<input type="radio" name="answerIn" bind:group={activeTask.answerIn} value={1} />
				Answer in Japanese
			</label> <br />
		</div>
		<div class="text-center">
			<h1 class="text-xl font-semibold">Hiragana</h1>
			<h2 class="text-lg font-semibold mt-2">Main Hiragana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(mainHiragana).forEach((item) => {
							let i = activeTask.hiragana.indexOf(item)
							if (i === -1) {
								activeTask.hiragana.push(item)
							} else {
								activeTask.hiragana.splice(i, 1)
							}
						})
						activeTask.hiragana = [...new Set(activeTask.hiragana)]
					}}>Toggle All</button
				>
				{#each Object.entries(mainHiragana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.hiragana}
							name="gana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>

			<h2 class="text-lg font-semibold mt-2">Dakuten Hiragana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(dakutenHiragana).forEach((item) => {
							let i = activeTask.hiragana.indexOf(item)
							if (i === -1) {
								activeTask.hiragana.push(item)
							} else {
								activeTask.hiragana.splice(i, 1)
							}
						})
						activeTask.hiragana = [...new Set(activeTask.hiragana)]
					}}>Toggle All</button
				>
				{#each Object.entries(dakutenHiragana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.hiragana}
							name="gana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
			<h2 class="text-lg font-semibold mt-2">Combination Hiragana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(comboHiragana).forEach((item) => {
							let i = activeTask.hiragana.indexOf(item)
							if (i === -1) {
								activeTask.hiragana.push(item)
							} else {
								activeTask.hiragana.splice(i, 1)
							}
						})
						activeTask.hiragana = [...new Set(activeTask.hiragana)]
					}}>Toggle All</button
				>
				{#each Object.entries(comboHiragana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.hiragana}
							name="gana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
		</div>
		<div class="text-center">
			<h1 class="text-xl font-semibold">Katakana</h1>
			<h2 class="text-lg font-semibold mt-2">Main Katakana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(mainKatakana).forEach((item) => {
							let i = activeTask.katakana.indexOf(item)
							if (i === -1) {
								activeTask.katakana.push(item)
							} else {
								activeTask.katakana.splice(i, 1)
							}
						})
						activeTask.katakana = [...new Set(activeTask.katakana)]
					}}>Toggle All</button
				>
				{#each Object.entries(mainKatakana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.katakana}
							name="kana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
			<h2 class="text-lg font-semibold mt-2">Dakuten Katakana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(dakutenKatakana).forEach((item) => {
							let i = activeTask.katakana.indexOf(item)
							if (i === -1) {
								activeTask.katakana.push(item)
							} else {
								activeTask.katakana.splice(i, 1)
							}
						})
						activeTask.katakana = [...new Set(activeTask.katakana)]
					}}>Toggle All</button
				>
				{#each Object.entries(dakutenKatakana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.katakana}
							name="kana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
			<h2 class="text-lg font-semibold mt-2">Combination Katakana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(comboKatakana).forEach((item) => {
							let i = activeTask.katakana.indexOf(item)
							if (i === -1) {
								activeTask.katakana.push(item)
							} else {
								activeTask.katakana.splice(i, 1)
							}
						})
						activeTask.katakana = [...new Set(activeTask.katakana)]
					}}>Toggle All</button
				>
				{#each Object.entries(comboKatakana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.katakana}
							name="kana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
		</div>
		<div class="col-span-2 text-center">
			<button class="btn-main" on:click={startTask}>Start Task →</button>
			{#if invalid}
				<p class="text-red-500">Please select an option.</p>
			{/if}
		</div>
	</div>
{/if}

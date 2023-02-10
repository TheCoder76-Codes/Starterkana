<script>
	import { get } from 'svelte/store'

	export let userData
	export let activeTask
	export let sTask
	function randint(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
	}
	function caps(str) {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}
	function getType(num) {
		// 0 QUIZ 1 LEARN 2 SPEED 3 TEST
		// 0 ROMANJI 1 JAPENESE
		if (num == 0) {
			return 'Quiz • '
		} else if (num == 1) {
			return 'Learn • '
		} else if (num == 2) {
			return 'Speed Skills • '
		} else if ((num = 3)) {
			return 'Test • '
		}
	}
	function getLang(num) {
		if (num == 0) {
			return 'Answer in Romaji'
		} else if (num == 1) {
			return 'Answer in Japanese'
		}
	}
	function handleTask(task) {
		activeTask = task
		sTask = true
	}

	let currentHBelt = null
	let currentKBelt = null
	let HBeltsBefore = []
	let HBeltNext = null
	let KBeltsBefore = []
	let KBeltNext = null

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
	belts.forEach((item, index) => {
		if (userData.hiragana[item] == false && !currentHBelt) {
			currentHBelt = [item, index]
		}
		if (userData.katakana[item] == false && !currentKBelt) {
			currentKBelt = [item, index]
		}
	})
	if (currentHBelt == null) {
		currentHBelt = ['white', 0]
	}
	if (currentKBelt == null) {
		currentKBelt = ['white', 0]
	}

	HBeltsBefore = belts.slice(0, currentHBelt[1])
	HBeltNext = belts[currentHBelt[1] + 1]
	KBeltsBefore = belts.slice(0, currentKBelt[1])
	KBeltNext = belts[currentKBelt[1] + 1]
	let similarBelts = KBeltsBefore.filter((element) => HBeltsBefore.includes(element))

	// quiz and speed skills of previous belts
	// quiz and learn and speed skills of current belt
	// learn of next belt (except black)
	// test of current belt ()
	// ---------------------------------
	// let task = {
	// 	hiragana: [],
	// 	katakana: [],
	//     title: '',
	// 	type: 0, | 0 QUIZ 1 LEARN 2 SPEED 3 TEST
	//     answerIn: 0, | 0 ROMANJI 1 JAPENESE
	// }
	let reccomendedtasks = []

	if (currentKBelt[0] != 'white' && currentHBelt[0] != 'white') {
		let newTask = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		KBeltsBefore.forEach((item) => {
			newTask.katakana = newTask.katakana.concat(beltsContain[item])
		})
		HBeltsBefore.forEach((item) => {
			newTask.hiragana = newTask.hiragana.concat(beltsContain[item])
		})
		newTask.title = 'All Completed Belts (Hiragana & Katakana)'
		// newTask.answerIn = randint(0, 1)

		reccomendedtasks.push(newTask)
	} else if (currentKBelt[0] == 'white' && currentHBelt[0] != 'white') {
		let newTask1 = {
			hiragana: [],
			katakana: ['a'],
			title: 'Katakana White Belt',
			type: 1, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		reccomendedtasks.push(newTask1)

		let newTask2 = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		HBeltsBefore.forEach((item) => {
			newTask2.hiragana = newTask2.hiragana.concat(beltsContain[item])
		})
		newTask2.title = 'All Completed Hiragana Belts'
		// newTask2.answerIn = randint(0, 1)
		reccomendedtasks.push(newTask2)
	} else if (currentKBelt[0] != 'white' && currentHBelt[0] == 'white') {
		reccomendedtasks.push({
			hiragana: ['a'],
			katakana: [],
			title: 'Hiragana White Belt',
			type: 1, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})

		let newTask2 = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		KBeltsBefore.forEach((item) => {
			newTask2.katakana = newTask2.katakana.concat(beltsContain[item])
		})
		newTask2.title = 'All Completed Katakana Belts'
		reccomendedtasks.push(newTask2)
	} else {
		reccomendedtasks.push({
			hiragana: ['a'],
			katakana: [],
			title: 'Hiragana White Belt',
			type: 1, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})
		reccomendedtasks.push({
			hiragana: [],
			katakana: ['a'],
			title: 'Katakana White Belt',
			type: 1, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})
	}

	if (HBeltNext) {
		reccomendedtasks.push({
			hiragana: [].concat(beltsContain[HBeltNext]),
			katakana: [],
			title: `Hiragana ${caps(HBeltNext)} Belt`,
			type: 1, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})

		reccomendedtasks.push({
			hiragana: [].concat(beltsContain[HBeltNext]),
			katakana: [],
			title: `Hiragana ${caps(HBeltNext)} Belt`,
			type: 3, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})
	}
	if (KBeltNext) {
		reccomendedtasks.push({
			hiragana: [],
			katakana: [].concat(beltsContain[KBeltNext]),
			title: `Katakana ${caps(KBeltNext)} Belt`,
			type: 1, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})

		reccomendedtasks.push({
			hiragana: [],
			katakana: [].concat(beltsContain[HBeltNext]),
			title: `Katakana ${caps(KBeltNext)} Belt`,
			type: 3, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		})
	}
	if (currentKBelt[0] != 'white' && currentHBelt[0] != 'white' && reccomendedtasks.length < 4) {
		let newTask = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 2, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		KBeltsBefore.forEach((item) => {
			newTask.katakana = newTask.katakana.concat(beltsContain[item])
		})
		HBeltsBefore.forEach((item) => {
			newTask.hiragana = newTask.hiragana.concat(beltsContain[item])
		})
		newTask.title = 'All Completed Belts (Hiragana & Katakana)'
		// newTask.answerIn = randint(0, 1)

		reccomendedtasks.push(newTask)
	} else if (currentKBelt[0] == 'white' && currentHBelt[0] != 'white' && reccomendedtasks.length < 4) {
		let newTask2 = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 2, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		HBeltsBefore.forEach((item) => {
			newTask2.hiragana = newTask2.hiragana.concat(beltsContain[item])
		})
		newTask2.title = 'All Completed Hiragana Belts'
		// newTask2.answerIn = randint(0, 1)
		reccomendedtasks.push(newTask2)
	} else if (currentKBelt[0] != 'white' && currentHBelt[0] == 'white' && reccomendedtasks.length < 4) {
		let newTask2 = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 2, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		KBeltsBefore.forEach((item) => {
			newTask2.katakana = newTask2.katakana.concat(beltsContain[item])
		})
		newTask2.title = 'All Completed Katakana Belts'
		reccomendedtasks.push(newTask2)
	}
	if (currentHBelt[0] != 'white' && reccomendedtasks.length < 4) {
		let newTask2 = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 3, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		HBeltsBefore.forEach((item) => {
			newTask2.hiragana = newTask2.hiragana.concat(beltsContain[item])
		})
		newTask2.title = 'All Completed Hiragana Belts'
		// newTask2.answerIn = randint(0, 1)
		reccomendedtasks.push(newTask2)
	}
	if (currentKBelt[0] != 'white' && reccomendedtasks.length < 4) {
		let newTask2 = {
			hiragana: [],
			katakana: [],
			title: '',
			type: 3, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
		}
		KBeltsBefore.forEach((item) => {
			newTask2.katakana = newTask2.katakana.concat(beltsContain[item])
		})
		newTask2.title = 'All Completed Katakana Belts'
		// newTask2.answerIn = randint(0, 1)
		reccomendedtasks.push(newTask2)
	}
	reccomendedtasks.sort(() => Math.random() - 0.5)
</script>

<h2 class="text-2xl font-semibold text-black mt-5">Recommended tasks</h2>
<div class="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr]">
	{#each reccomendedtasks as task}
		<div
			class="min-w-[25%] h-52 bg-highlight rounded-lg mx-2 my-2 p-3 flex flex-col place-content-between transition-transform ease-in-out duration-300 hover:scale-105 hover:cursor-pointer"
			on:click={() => handleTask(task)}
			on:keypress={() => handleTask(task)}
		>
			<h1 class="text-xl font-semibold">{task.title}</h1>
			<p class="text-lg">{getType(task.type)}{getLang(task.answerIn)}</p>
		</div>
	{/each}
</div>
<span>or</span>
<button class="btn-main" on:click={() => (sTask = true)}>Start your own task ↗</button>

<script>
	import Setup from './lib/Setup/Setup.svelte'
	import Dash from './lib/Dashboard/Dashboard.svelte'
	import ErrorPopup from './lib/Dashboard/ErrorPopup.svelte'
	import Actor from './lib/Actor/Actor.svelte'
	import Migrate from './lib/Dashboard/Migrate.svelte'
	let setup = false
	let belts = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']
	let userData = {}
	let streaks = []
	let errors = []
	// {
	// 	hiragana: {
	// 		white: false,
	// 		yellow: false,
	// 		orange: false,
	// 		green: false,
	// 		blue: false,
	// 		purple: false,
	// 		red: false,
	// 		brown: false,
	// 		black: false,
	// 	},
	// 	katakana: {
	// 		white: false,
	// 		yellow: false,
	// 		orange: false,
	// 		green: false,
	// 		blue: false,
	// 		purple: false,
	// 		red: false,
	// 		brown: false,
	// 		black: false,
	// 	},
	// 	name: '',
	// 	points: 0,
	//	cookies: true,
	// }

	let colors = localStorage.getItem('colorTheme') || 'pink' // either 'pink' or 'green'

	const root = document.querySelector(':root');

	let colorsList = {
		pink: {
			'--highlight': '#FADDE1',
			'--main': '#FFA6C1',
		},
		green: {
			'--highlight': '#d5ebd4',
			'--main': '#79a778',
		}
	}

	root.style.setProperty('--highlight', colorsList[colors]['--highlight']);
	root.style.setProperty('--main', colorsList[colors]['--main']);

	if (!localStorage.getItem('isSetUp')) {
		setup = false
	} else if (localStorage.getItem('isSetUp') == 'true') {
		setup = true
		if (localStorage.getItem('userData')) {
			userData = JSON.parse(localStorage.getItem('userData'))
		} else {
			setup = false
			userData = {}
		}
	} else {
		setup = false
	}

	let newError = false

	window.onerror = (event, source, lineno, colno, error) => {
		if (localStorage.getItem('errors')) {
			errors = JSON.parse(localStorage.getItem('errors'))
			errors.push({
				event,
				source,
				lineno,
				colno,
				error,
				date: new Date(),
			})
			if (userData.cookies) {
				localStorage.setItem('errors', JSON.stringify(errors))
			}
		} else {
			errors.push({
				event,
				source,
				lineno,
				colno,
				error,
			})
			if (userData.cookies) {
				localStorage.setItem('errors', JSON.stringify(errors))
			}
		}
		newError = true
		return false
	}
	let actor = false
	let migrate = false

	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('actor')) actor = true
	if (urlParams.has('migrate') && urlParams.has('token')) migrate = true
</script>

{#if newError}
	<ErrorPopup />
{/if}

{#if actor}
	<Actor bind:userData bind:errors bind:streaks />
{:else if migrate}
	<Migrate bind:userData bind:migrate />
{:else if !setup}
	<Setup bind:setup bind:userData />
{:else if setup}
	<Dash bind:userData bind:streaks bind:errors bind:colorsList />
{:else}
	<Setup bind:setup bind:userData />
{/if}

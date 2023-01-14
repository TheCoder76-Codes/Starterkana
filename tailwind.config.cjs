/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				highlight: '#FADDE1',
				main: '#FFA6C1',
				correct: '#719E4B',
				incorrect: '#EF233C',
				fade: '#6b7280',
			},
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			jp: ['Noto Sans JP', 'sans-serif'],
		},
	},
	plugins: [],
}

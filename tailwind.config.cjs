/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				highlight: 'var(--highlight)',
				main: 'var(--main)',
				correct: 'var(--correct)',
				incorrect: 'var(--incorrect)',
				fade: 'var(--fade)',
			},
			transitionProperty: {
                'width': 'width'
            },
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			jp: ['Noto Sans JP', 'sans-serif'],
		},
	},
	plugins: [],
}

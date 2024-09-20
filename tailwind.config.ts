import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'color-pallette-madder': '#A20021',
				'color-pallette-cafe-noir': '#312509',
				'color-pallette-ecru': '#CDAA6B',
				'color-pallette-lavander-web': '#E5EAFA',
				'color-pallette-aquamarine': '#78FECF',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: '#CDAA6B',
						},
					},
				},
			},
		}),
	],
};
export default config;

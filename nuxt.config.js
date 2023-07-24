export default {
	server: {
		host: '0.0.0.0',
		port: process.env.PORT || 3000
	},
	ssr: true,
	mode: 'universal',

	head: {
		title: 'table-test',
		titleTemplate: '%s | table',
		htmlAttrs: {
			lang: 'ru',
			amp: true
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no'
			},
		],
	},

	pwa: {
		meta: {
			title: 'Test',
			author: 'Seenve',
			favicon: false,
		},
		manifest: {
			name: 'Table Test',
			short_name: 'Test',
			lang: 'ru',
		},
	},

	loading: {
		color: '$color-1',
		height: '3px',
		continuous: true,
		throttle: 0
	},
	loadingIndicator: {
		name: 'circle',
		color: '$color-1',
		background: 'white'
	},

	styleResources: {
		sass: [],
		scss: [
			'@/assets/scss/_base/_variables.scss',
			'@/assets/scss/_mixins/*.scss',
		],
		less: [],
	},

	css: [
		'@/assets/scss/app.scss',
	],

	plugins: [],

	components: true,

	buildModules: [
		["@nuxtjs/svg"],
		['@nuxtjs/pwa'],
		['@nuxtjs/moment', {

		}]
	],

	modules: [
		['@nuxtjs/style-resources'],
		['@nuxtjs/axios'],
		['@nuxtjs/markdownit']
	],

	svg: {
		vueSvgLoader: {
			// vue-svg-loader options
		},
		svgSpriteLoader: {
			// svg-sprite-loader options
		},
		fileLoader: {
			// file-loader options
		}
	},

	markdownit: {
		preset: 'default',
		linkify: true,
		breaks: true,
		use: [
			'markdown-it-div',
			'markdown-it-attrs'
		]
	},

	axios: {
		prefix: '/api/',
		proxy: true,
	},

	proxy: {
		'/api': {
			target: process.env.API_URL || 'https://jsonplaceholder.typicode.com',
			pathRewrite: { '^/api': '/' },
			//headers: { 'X-API-KEY': 'apiKey' },
			//logLevel: 'debug',
		},
	},

	build: {}
}

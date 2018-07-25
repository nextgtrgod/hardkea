
const product = {
	name: '',
	category: 4,
	material: 'Бетон',
	description: '',
	article: '',
	image: {
		desktop: '',
		mobile: '',
		sidebar: '',
		article: '',
		gallery: ['', '', '', '', ''],
	},
	price: 0,
	dimensions: {
		x: 0,
		y: 0,
		z: 0,
		w: 0,
	},
	sizes: {
		s:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
		m:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
		l:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
		xl: { price: 0, x: 0, y: 0, z: 0, w: 0 },
	},
	colors: {
		1: '',
		2: '',
		3: '',
		4: '',
	},
	inverted: {
		mobile: {
			main: false,
			// inner: false,
		},
		desktop: {
			main: false,
			// inner: false,
		},
	},
	sortIndex: 0,
}

export default product

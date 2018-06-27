
const products = [
	{
		id: 1,
		name: 'Stolik',
		dimensions: {
			height: 40,
			width: 30,
			depth: 20,
		},
		weight: 20,
		material: 'Бетон',
		description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
		article: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.',
		image: {
			desktop: 'desktop.jpg',
			mobile: 'mobile.jpg',
		},
		price: 4500,
		colors: [1, 2, 3, 4],
	},
	{
		id: 2,
		name: 'Samurai',
		dimensions: {
			height: 20,
			width: 30,
			depth: 40,
		},
		weight: 30,
		material: 'Бетон',
		description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
		article: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.',
		inverted: {
			mobile: {
				main: true,
				inner: false,
			},
			desktop: {
				main: true,
				inner: false,
			},
		},
		image: {
			desktop: 'desktop.jpg',
			mobile: 'mobile.jpg',
		},
		price: 2500,
		sizes: {
			s: 2500,
			m: 5500,
			l: 11700,
			xl: 20500,
		},
		colors: [1, 4],
	},
	{
		id: 3,
		name: 'Konusoobra',
		dimensions: {
			height: 100,
			width: 30,
			depth: 90,
		},
		weight: 50,
		material: 'Стекло',
		description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
		article: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.',
		inverted: {
			mobile: {
				main: true,
				inner: false,
			},
			desktop: {
				main: true,
				inner: false,
			},
		},
		image: {
			desktop: 'desktop.jpg',
			mobile: 'mobile.jpg',
		},
		price: 7500,
	},
]

export default products

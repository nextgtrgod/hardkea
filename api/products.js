
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
			desktop: 'https://image.ibb.co/iYb0SJ/desktop.jpg',
			mobile: 'https://image.ibb.co/bKGTEy/mobile.jpg',
			article: 'https://image.ibb.co/fZgpMd/article.jpg',
			gallery: [
				'https://image.ibb.co/gUWepy/1.jpg',
				'https://image.ibb.co/fR5YGd/2.jpg',
				'https://image.ibb.co/e8cDGd/3.jpg',
				'https://image.ibb.co/mTN8hJ/4.jpg',
				'https://image.ibb.co/fOYENJ/5.jpg',
			],
		},
		price: 4500,
		colors: [1, 2, 3, 4],
		inverted: {
			mobile: {
				main: false,
				inner: false,
			},
			desktop: {
				main: false,
				inner: false,
			},
		},
		category: 4,
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
			desktop: 'https://image.ibb.co/cCsbZy/desktop.jpg',
			mobile: 'https://image.ibb.co/nA1ygd/mobile.jpg',
			article: 'https://image.ibb.co/cC8GZy/article.jpg',
			gallery: [
				'https://image.ibb.co/gUWepy/1.jpg',
				'https://image.ibb.co/fR5YGd/2.jpg',
				'https://image.ibb.co/e8cDGd/3.jpg',
				'https://image.ibb.co/mTN8hJ/4.jpg',
				'https://image.ibb.co/fOYENJ/5.jpg',
			],
		},
		price: 2500,
		sizes: {
			s: 2500,
			m: 5500,
			l: 11700,
			xl: 20500,
		},
		colors: [1, 4],
		category: 1,
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
			desktop: 'https://image.ibb.co/g6EZMd/desktop.jpg',
			mobile: 'https://image.ibb.co/cziiEy/mobile.jpg',
			article: 'https://image.ibb.co/bwNz6d/article.jpg',
			gallery: [
				'https://image.ibb.co/gUWepy/1.jpg',
				'https://image.ibb.co/fR5YGd/2.jpg',
				'https://image.ibb.co/e8cDGd/3.jpg',
				'https://image.ibb.co/mTN8hJ/4.jpg',
				'https://image.ibb.co/fOYENJ/5.jpg',
			],
		},
		price: 7500,
		category: 1,
	},
]

export default products

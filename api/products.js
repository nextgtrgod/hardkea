
const products = [
	{
		id: 1,
		name: 'Stolik',
		category: 4,
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
		dimensions: {
			x: 30,
			y: 100,
			z: 90,
			w: 50,
		},
		price: 4500,
		colors: [1, 2, 3, 4],
		sizes: {
			s:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
			m:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
			l:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
			xl: { price: 0, x: 0, y: 0, z: 0, w: 0 },
		},
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
		colors: [],
	},
	{
		id: 2,
		name: 'Samurai',
		category: 1,
		dimensions: {
			x: 30,
			y: 100,
			z: 90,
			w: 50,
		},
		price: 2500,
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
		sizes: {
			s:  { price: 2500, x: 30, y: 20, z: 40, w: 40 },
			m:  { price: 5500, x: 30, y: 20, z: 40, w: 50 },
			l:  { price: 11700, x: 30, y: 20, z: 40, w: 60 },
			xl: { price: 20500, x: 30, y: 20, z: 40, w: 70 },
		},
		colors: [1, 4],
	},
	{
		id: 3,
		name: 'Konusoobra',
		category: 1,
		dimensions: {
			x: 30,
			y: 100,
			z: 90,
			w: 50,
		},
		price: 7500,
		material: 'Стекло',
		description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
		article: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.',
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
		sizes: {
			s:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
			m:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
			l:  { price: 0, x: 0, y: 0, z: 0, w: 0 },
			xl: { price: 0, x: 0, y: 0, z: 0, w: 0 },
		},
		colors: [],
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
	},
]

export default products

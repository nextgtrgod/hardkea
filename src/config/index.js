
let apiBase = process.env.NODE_ENV === 'production'
	? 'http://23.105.240.142'
	: 'http://localhost:4000'

// temp
// apiBase = 'http://23.105.240.142'
// apiBase = 'http://localhost:4000'

const API = {

	base: apiBase,

	sendOrder: apiBase + '/api/orders/new',

	products: apiBase + '/api/products',

	orders: apiBase + '/api/orders',

	categories: apiBase + '/api/categories',

	login: apiBase + '/api/login',

}

export {
	apiBase,
	API,
}

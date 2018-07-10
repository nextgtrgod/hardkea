export default {

	setProducts(state, data) {
		state.products = data
	},

	setOrders(state, data) {
		state.orders = data
	},

	setCategories(state, data) {
		state.categories = data
	},

	addToBasket(state, data) {

		// added product
		let product = Object.assign({},
			state.products.find(product => product.id === data.id),
			data,
		)

		// product with those options is exist in basket
		let index = state.basket.findIndex(bP => {
			let { id, size, color } = product

			return (bP.id === id) && (bP.size === size) && (bP.color === color)
		})

		if (index >= 0) state.basket[index].count += product.count // only inc count
		else {
			state.basket.push(Object.assign({},
				data,
				{ basketID: Date.now() }
			))
		}
	},

	deleteFromBasket(state, basketID) {
		state.basket = state.basket.filter(product => product.basketID !== basketID)
	}

}

export default {

	product: state => id => state.products.find(product => product.id === id),

}

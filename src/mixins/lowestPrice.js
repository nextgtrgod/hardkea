import Events from '@/events'

let lowestPrice = {
	methods: {
		getLowestPrice(product) {
			let nonZero = [
				product.price,
				...Object.values(product.sizes).map(value => value.price)
			].filter(price => price > 0)
		
			return nonZero.length
				? Math.min(...nonZero)
				: 0
		}	
	},
	computed: {
		lowestPrice() {
			let nonZero = [
				this.product.price,
				...Object.values(this.product.sizes).map(value => value.price)
			].filter(price => price > 0)
		
			return nonZero.length
				? Math.min(...nonZero)
				: 0
		}
	}
}

export default lowestPrice

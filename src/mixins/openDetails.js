import Events from '@/events'

let openDetails = {

	methods: {
		openDetails: id => {
			Events.$emit('modal-open', { name: 'details', productID: id })
		},
	},

}

export default openDetails

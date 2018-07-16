import Vue from 'vue'

Vue.filter('getTime', value => {
	let date = new Date(value)
	let hours = date.getHours()
	let minutes = date.getMinutes()

	return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`
})

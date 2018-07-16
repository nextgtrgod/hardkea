import Vue from 'vue'

let pad = (n, width, z = 0) => {

	n = n + ''

	return n.length >= width
		? n
		: new Array(width - n.length + 1).join(z) + n
}

Vue.filter('pad', n => pad(n, 2))

export default pad

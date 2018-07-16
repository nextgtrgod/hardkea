
const createOrderID = ({ username, phone }) => {
	let arr = [
		[...(Date.now()).toString(36)].reduce((sum, current) => sum += current.charCodeAt(), 0),
		[...username].reduce((sum, current) => sum += current.charCodeAt(), 0),
		~~(Math.random() * 1000),
		[...phone].slice(1).reduce((sum, current) => sum += +current, 0),
	]

	return [
		Math.abs(arr[0] - arr[1]),
		Math.abs(arr[2] - arr[3]),
	].join('-')
}

module.exports = createOrderID

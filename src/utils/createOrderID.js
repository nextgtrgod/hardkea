
const createOrderID = ({ username, email, rawPhone }) => {
	return [
		[...(Date.now()).toString(36)].reduce((sum, current) => sum += current.charCodeAt(), 0),
		[...username].reduce((sum, current) => sum += current.charCodeAt(), 0),
		~~(Math.random() * 1000),
		[...rawPhone].reduce((sum, current) => sum += +current, 0),
	].join('-')
}

export default createOrderID

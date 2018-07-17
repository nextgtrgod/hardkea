const fs = require('fs')
const path = require('path')
const readFile = require('../utils/readFile')
const writeFile = require('../utils/writeFile')
const sendMail = require('../utils/sendMail')
const createOrderID = require('../utils/createOrderID')

class OrderController {
	constructor() {

		this.busy = false
		this.path = path.join(__dirname, '..', 'orders.json')
	}

	async get() {
		let orders = await readFile(this.path)

		return orders
	}

	async create(data) {
		let orders = await readFile(this.path)

		let maxIndex = 0

		orders.map(order => order.id > maxIndex && (maxIndex = order.id))

		data.id = maxIndex + 1

		let { username, phone } = data
		data.orderID = createOrderID({ username, phone })
		data.status = 1 // Новый
		data.created_at = Date.now()

		orders.push(data)

		let status = await writeFile(orders, this.path)

		return status
	}

	async update(data) {
		let orders = await readFile(this.path)

		let index = orders.findIndex(order => order.id === data.id)

		orders[index] = data

		let status = await writeFile(orders, this.path)

		return status
	}


	async delete(id) {
		let orders = await readFile(this.path)

		orders = orders.filter(order => order.id !== +id)

		let status = await writeFile(orders, this.path)

		return status
	}

	// let { orderID, username, email, orders, phone, rawPhone, details } = req.body

	// let status = await sendMail({
	// 	orderID,
	// 	name: username,
	// 	email,
	// 	phone,
	// 	rawPhone,
	// 	details,
	// 	orders: JSON.parse(orders),
	// })
}

module.exports = OrderController

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

		await this.send(data)

		let status = await writeFile(orders, this.path)

		return status
	}

	async update(data) {
		let orders = await readFile(this.path)

		let index = orders.findIndex(order => order.id === data.id)

		orders[index] = data

		await writeFile(orders, this.path)

		return orders
	}


	async delete(id) {
		let orders = await readFile(this.path)

		orders = orders.filter(order => order.id !== +id)

		await writeFile(orders, this.path)

		return orders
	}

	async send(data) {
		let { orderID, products, username, email, phone, address, details, total } = data

		let status = await sendMail({
			orderID,
			username,
			email,
			phone,
			address,
			details,
			products,
			total,
		})

		return status
	}
}

module.exports = OrderController

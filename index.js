'use strict';

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.set('port', (process.env.PORT || 4000))



// all about products
let ProductController = require('./api/controllers/Product')
let productController = new ProductController()

app.get('/api/products', async (req, res) => {

	let data = await productController.get()
	res.send({ data })
})

app.post('/api/products/:id', async (req, res) => {

	let data = req.params.id === 'new'
		? await productController.create(req.body)
		: await productController.update(req.body)

	res.send({ data })
})

app.post('/api/products/', async (req, res) => {

	let data = await productController.updateAll(req.body)

	res.send({ data })
})

app.delete('/api/products/:id', async (req, res) => {

	let data = await productController.delete(req.params.id)
	res.send({ data })
})



// all about orders
let OrderController = require('./api/controllers/Order')
let orderController = new OrderController()

app.get('/api/orders', async (req, res) => {

	let data = await orderController.get()
	res.send({ data })	
})

app.post('/api/orders/:id', async (req, res) => {

	let data = req.params.id === 'new'
		? await orderController.create(req.body)
		: await orderController.update(req.body)

	res.send({ data })
})

app.delete('/api/orders/:id', async (req, res) => {

	let data = await orderController.delete(req.params.id)
	res.send({ data })
})



app.get('/api/categories', (req, res) => {

	fs.readFile(`${__dirname}/api/categories.json`, 'utf8', (err, data) => {
		if (err) throw err

		res.send({
			data: JSON.parse(data)
		})
	})

})


// auth
process.env.JWT_SECRET = 'tosin'

let users = require('./api/data/users')
let { encodeJWT, decodeJWT } = require('./api/libs/auth')

app.post('/api/login', async (req, res) => {

	let { username, password, token } = req.body

	if (token) {
		let { data } = await decodeJWT(token)

		username = data.username
		password = data.password
	}

	let user = users.find(user => (user.username === username) && (user.password === password))

	if (!user) return res.send({ auth: false, message: 'Неверный логин/пароль' })

	res.send({
		auth: true,
		token: token
			? null
			: encodeJWT({ sessionData: user }),
	})
})


// temp
// let render = require('./api/utils/render')
// let orders = require('./api/orders')

// app.get('/api/email', async (req, res) => {

// 	let orderData = {
// 		orderID: '386-221',
// 		username: 'Кирилл',
// 		email: 'KYakovlev7@gmail.com',
// 		phone: '+79266518951',
// 		address: 'г. Киев, улица Березняковская, 17А строение 58/3 лит. Б',
// 		// details: '',
// 		products:
// 		[ { id: 2,
// 			name: 'Ninja',
// 			count: 1,
// 			size: 's',
// 			color: '2',
// 			subtotal: 3500 },
// 		{ id: 3,
// 			name: 'Столик «Four three»',
// 			count: 1,
// 			size: 'm',
// 			subtotal: 7900 },
// 		{ id: 1, name: 'Столик «Square»', count: 1, subtotal: 12900 },
// 		{ id: 2,
// 			name: 'Кашпо «Samurai»',
// 			count: 2,
// 			size: 'l',
// 			color: '3',
// 			subtotal: 23400 } ],
// 		total: '47 700',
// 		siteUrl: 'http://88.212.254.100:4000/'
// 	}

// 	const formatPhone = require('./api/utils/formatPhone')

// 	orderData.phone = formatPhone(orderData.phone)

// 	let html = await render('order', orderData)
// 	res.send(html)
// })
//


// static
app.use('/images', express.static(path.join(__dirname, 'api', 'images')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))

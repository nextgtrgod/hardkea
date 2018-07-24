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


// static
app.use('/images', express.static(path.join(__dirname, 'api', 'images')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))

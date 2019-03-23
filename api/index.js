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


app.get('/', async (req, res) => {

	res.send('Hardkea')

})

// all about products
let ProductController = require('./controllers/Product')
let productController = new ProductController()

app.get('/products', async (req, res) => {

	let data = await productController.get()
	res.send({ data })
})

app.post('/products/:id', async (req, res) => {

	let data = req.params.id === 'new'
		? await productController.create(req.body)
		: await productController.update(req.body)

	res.send({ data })
})

app.post('/products/', async (req, res) => {

	let data = await productController.updateAll(req.body)

	res.send({ data })
})

app.delete('/products/:id', async (req, res) => {

	let data = await productController.delete(req.params.id)
	res.send({ data })
})



// all about orders
let OrderController = require('./controllers/Order')
let orderController = new OrderController()

app.get('/orders', async (req, res) => {

	let data = await orderController.get()
	res.send({ data })
})

app.post('/orders/:id', async (req, res) => {

	let data = req.params.id === 'new'
		? await orderController.create(req.body)
		: await orderController.update(req.body)

	res.send({ data })
})

app.delete('/orders/:id', async (req, res) => {

	let data = await orderController.delete(req.params.id)
	res.send({ data })
})



app.get('/categories', (req, res) => {

	fs.readFile(`${__dirname}/categories.json`, 'utf8', (err, data) => {
		if (err) throw err

		res.send({
			data: JSON.parse(data)
		})
	})

})


// auth
process.env.JWT_SECRET = 'cLuMNbC1qzOZFdKQds1e9MfDUjDHieRNFdEO1eJy9dJnZCysdCv4fekZ7ggyLpVKKLbrIWA9xCRdblnXjWiCpNPmpyuUjS1PahLGEcW1QMSkox2XWvhv4uZHlY2S9VX2j0kkWoOKGl1fQq62ojnoQbW3P10qLCqnRI3OH2WFZ8hEev2bhmbRgRivMN1yPL0qijEk5OEXsIA5O9bInZI3ZBbA7t1gc5BVpvqGXHa1DHngi0YrneEEJZS80G3ejZCxm4vq0ACnUuBUsyocaoxwtwa'


let users = require('./data/users')
let { encodeJWT, decodeJWT } = require('./libs/auth')

app.post('/login', async (req, res) => {

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

// app.use('/images', express.static(path.join(__dirname, 'api', 'images')))
// app.use(express.static(path.join(__dirname, 'dist')))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))

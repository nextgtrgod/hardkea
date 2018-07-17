'use strict';

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const ProductController = require('./api/controllers/Product')
const OrderController = require('./api/controllers/Order')

let productController = new ProductController()
let orderController = new OrderController()

const app = express()

app.use(cors())
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.set('port', (process.env.PORT || 4000))


// all about products
app.get('/api/products', async (req, res) => {

	let data = await productController.get()
	res.send({ data })
})

app.post('/api/products/:id', async (req, res) => {

	let data = req.params.id === 'new'
		? await productController.create(req.body)
		: await productController.update(req.body)

	res.send(data)
})

app.delete('/api/products/:id', async (req, res) => {

	let data = await productController.delete(req.params.id)
	res.send({ data })
})


// all about orders
app.get('/api/orders', async (req, res) => {

	let data = await orderController.get()
	res.send({ data })	
})

app.post('/api/orders/:id', async (req, res) => {

	let data = req.params.id === 'new'
		? await orderController.create(req.body)
		: await orderController.update(req.body)

	res.send(data)
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

app.use('/images', express.static(path.join(__dirname, 'api', 'images')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))

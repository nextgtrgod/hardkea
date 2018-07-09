'use strict';

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sendMail = require('./api/sendMail')
const cors = require('cors')

const ProductController = require('./api/controllers/Product')

let productController = new ProductController()


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
		? await productController.add(req.body)
		: await productController.save(req.body)

	res.send(data)
})

app.delete('/api/products/:id', async (req, res) => {

	let data = await productController.delete(req.params.id)
	res.send({ data })
})


// all about orders
app.get('/api/categories', (req, res) => {

	fs.readFile(`${__dirname}/api/categories.json`, 'utf8', (err, data) => {
		if (err) throw err

		res.send({
			data: JSON.parse(data)
		})
	})

})


app.post('/api/sendOrder', async (req, res) => {

	let { orderID, username, email, products, phone, rawPhone, details } = req.body

	let status = await sendMail({
		orderID,
		name: username,
		email,
		phone,
		rawPhone,
		details,
		products: JSON.parse(products),
	})

	res.send({ status })
})

app.use('/images', express.static(path.join(__dirname, 'api', 'images')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))

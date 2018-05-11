'use strict';

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sendMail = require('./api/sendMail')

const app = express()
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 4000))


app.post('/api/sendOrder', (req, res) => {

	let { orderID, username, email, products } = req.body

	sendMail({
		orderID,
		name: username,
		email,
		products: JSON.parse(products),
	})

})


app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))

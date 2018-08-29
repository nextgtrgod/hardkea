const nodemailer = require('nodemailer')
const auth = require('../data/auth')
const render = require('../utils/render')

let { host, port, user, pass } = auth

let transporter = nodemailer.createTransport({
	host,
	port,
	secure: true,
	auth: {
		user,
		pass,
	}
})

let sendMail = data => new Promise(async (resolve, reject) => {

	let { email } = data

	let html = await render('order', data)

	let mailOptions = {
		from: user,
		to: email,
		subject: 'hardkea',
		html,
	}

	transporter.sendMail(mailOptions, (err, info) => {
		let message

		if (err) {
			message = 'Произошла ошибка :('
			console.log(err)
		}
		else {
			message = 'Ваш заказ принят!'
			console.log(`Email sent: ${info.response}`)
		}

		resolve(message)
	})

})


module.exports = sendMail

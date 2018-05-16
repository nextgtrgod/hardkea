const nodemailer = require('nodemailer')
const auth = require('./auth')
const render = require('./render')

let { host, port, user, pass } = auth

let transporter = nodemailer.createTransport({
	host,
	port,
	secure: false,
	auth: {
		user,
		pass,
	}
})

let sendMail = data => new Promise((resolve, reject) => {

	let { email } = data

	let mailOptions = {
		from: user,
		to: email,
		subject: 'hardkea',
		html: render('order', data)
	}

	transporter.sendMail(mailOptions, (err, info) => {
		let status

		if (err) {
			status = 'Произошла ошибка :('
			console.log(err)
		}
		else {
			status = 'Ваш заказ принят!'
			console.log(`Email sent: ${info.response}`)
		}

		resolve(status)
	})

})


module.exports = sendMail

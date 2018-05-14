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

let sendMail = ({ orderID, name, email, products }) => {

	let mailOptions = {
		from: user,
		to: email,
		subject: 'hardkea',
		html: render('order', {
			name,
			orderID,
			products,
		})
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) console.log(err)
		else console.log(`Email sent: ${info.response}`)
	})
}

module.exports = sendMail

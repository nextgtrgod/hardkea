let nodemailer = require('nodemailer')
let auth = require('./auth')

let { host, port, user, pass } = auth

let transporter = nodemailer.createTransport({
	host,
	port,
	secure: false,
	auth: {
		user,
		pass,
	}
});

let sendMail = ({ orderID, name, email, products }) => {

	console.log(`
orderID: ${orderID}
username: ${name}
email: ${email}
products: ${products}
`)

	let htmlList = ''
	products.map(product => {
		let { name, count, color, description } = product

		htmlList += `
			<li>
				<h3>${name} × ${count}</h3>
				${color ? '<p><b>Цвет: ' + color + '</b></p>' : ''}
				<p>${description}</p>
			</li>
		`
	})

	let mailOptions = {
		from: user,
		to: email,
		subject: 'hardkea',
		html: `
			<h2>Привет, ${name}</h2>
			<h1>Ваш заказ #${orderID}</h1>
			<ul>
				${htmlList}
			</ul>
		`
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) console.log(err)
		else console.log(`Email sent: ${info.response}`)
	})
}


module.exports = sendMail

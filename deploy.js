const FtpDeploy = require('ftp-deploy')
let ftpDeploy = new FtpDeploy()

let auth = require('./ftpAuth')

ftpDeploy.deploy({
    user: auth.username,
    password: auth.password,
    host: auth.host,
    port: 21,
    localRoot: __dirname,
	remoteRoot: '/web/',
	include: ['*', '**/*'],
	exclude: ['node_modules/', 'backup/', 'ftpAuth.js'],
    deleteRemote: true
})
    .then(res => console.log('deploy finished'))
    .catch(err => console.log(err))

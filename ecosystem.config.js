module.exports = {
	apps: [{
		name: 'api',
		script: './api/index.js',
		env_production: {
			NODE_ENV: 'production',
		},
		instances: 1,
		exec_mode: 'cluster',
		out_file: 'combined.log',
		error_file: 'combined.log',
		combine_logs: true,
	}, ],

	deploy: {
		production: {
			user: 'hardkea',
			password: 'jIdJkTYOtVBe8Y8dQwc6MddnpNkKiu',
			host: '23.105.248.235',
			port: '53100',
			ssh_options: 'ForwardAgent=yes',
			ref: 'origin/master',
			repo: 'git@github.com:nextgtrgod/hardkea',
			path: '/web/production',
			'post-deploy': 'yarn && pm2 reload ecosystem.config.js --env production',
		},
	},
}

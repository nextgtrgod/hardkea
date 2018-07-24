import makeRequest from '@/utils/makeRequest'
import { API } from '@/config/index'


let login = (username, password) => new Promise(async (resolve, reject) => {

	let res = await makeRequest({
		method: 'POST',
		url: API.login,
		data: {
			username,
			password,
			token: localStorage.getItem('token')
		},
	})

	if (res.token) localStorage.setItem('token', res.token)

	return resolve(res)
})


export default login

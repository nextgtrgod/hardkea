import Events from '@/events'

export default function makeRequest({ method = 'POST', url, data }) {

	return new Promise((resolve, reject) => {

		Events.$emit('api-loading')

		const xhr = new XMLHttpRequest()

		if (method === 'GET') {
			xhr.open('GET', url + ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime(), true)
		} else {
			xhr.open(method, url)
		}
		
		if (method === 'POST') {
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
		}

		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {

				Events.$emit('api-loaded')
	
				resolve(JSON.parse(xhr.response))

			} else {

				Events.$emit('api-loaded')

				reject({
					status: xhr.status,
					statusText: xhr.statusText
				})
			}
		}

		xhr.onerror = () => {
			Events.$emit('api-loaded')
			reject({
				status: xhr.status,
				statusText: xhr.statusText
			})
		}

		method === 'POST'
			? data
				? xhr.send(JSON.stringify(data))
				: xhr.send()

			: xhr.send() // GET
	})
}

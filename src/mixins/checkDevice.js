
let checkDevice = {
	data() {
		return {
			device: 'desktop',
			reqAnimFrameID: null,
		}
	},
	created() {
		this.reqAnimFrameID = this.checkDevice()
	},
	methods: {
		checkDevice() {
			this.device = (window.innerWidth >= 960) ? 'desktop' : 'mobile'

			return requestAnimationFrame(this.checkDevice)
		},
	},
	beforeDestroy() {
		cancelAnimationFrame(this.reqAnimFrameID)
	},
}

export default checkDevice

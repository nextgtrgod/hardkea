<template>
<div
	class="drop"
	:class="{ highlighted, inverted }"
	@dragenter.prevent.stop="highlight"
	@dragover.prevent.stop="highlight"
	@dragleave.prevent.stop="unhighlight"
	@drop.prevent.stop="e => {
		unhighlight()
		handleFiles(e.dataTransfer.files)
	}"
	@dblclick="openFile"
>
	<div class="slot-wrap" @click="openFile">
		<slot name="button"/>
	</div>

	<slot/>

	<button
		class="upload"
		type="button"
		:class="{ visible: !value.length }"
		@click="openFile"
		:style="buttonStyle"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 448">
			<path d="M480 64H96c-17.7 0-32 14.3-32 32v320c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm10.7 352c0 5.9-4.8 10.7-10.7 10.7H96c-5.9 0-10.7-4.8-10.7-10.7V96c0-5.9 4.8-10.7 10.7-10.7h384c5.9 0 10.7 4.8 10.7 10.7v320z"/>
			<path d="M437.3 0H32C14.3 0 0 14.3 0 32v341.3c0 17.7 14.3 32 32 32h10.7V384H32c-5.9 0-10.7-4.8-10.7-10.7V32c0-5.9 4.8-10.7 10.7-10.7h405.3c5.9 0 10.7 4.8 10.7 10.7v10.7h21.3V32c0-17.7-14.3-32-32-32z"/>
			<path d="M242.2 216.5c-4.2-4.2-10.9-4.2-15.1 0l-160 160 15.1 15.1 152.5-152.5 163.1 163.1 15.1-15.1-170.7-170.6zM391.5 216.5c-4.2-4.2-10.9-4.2-15.1 0l-53.3 53.3 15.1 15.1 45.8-45.8 109.8 109.8 15.1-15.1-117.4-117.3zM309.3 106.7c-29.5 0-53.3 23.9-53.3 53.3s23.9 53.3 53.3 53.3 53.3-23.9 53.3-53.3c.1-29.5-23.8-53.3-53.3-53.3zm0 85.3c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
		</svg>
	</button>

	<span v-if="!value.length" class="placeholder">{{ placeholder }}</span>

	<input
		type="file"
		ref="input"
		:accept="allowedTypes.join(',')"
		@change="e => handleFiles(e.target.files)"
	>
</div>
</template>


<script>
import Events from '@/events'

export default {
	name: 'Drop',
	props: {
		value: {
			type: [String, File],
			default: ''
		},
		inverted: {
			type: Boolean,
			default: false,
		},
		maxSize: {
			type: Number,
			default: 5 * 1024 * 1024, // 5mb
		},
		maxCount: {
			type: Number,
			default: 1,
		},
		allowedTypes: {
			type: Array,
			default() {
				return [
					'image/png',
					'image/jpeg',
				]
			},
		},
		buttonOffset: {
			type: Array,
			default() {
				return [0, 0] // x, y
			},
		},
		placeholder: {
			type: String,
			default: '',
		}
	},
	data() {
		return {
			highlighted: false,
		}
	},
	methods: {
		highlight() {
			this.highlighted = true

			Events.$emit('drag-start')
		},
		unhighlight() {
			this.highlighted = false
			
			Events.$emit('drag-stop')
		},
		openFile() {
			this.$refs['input'].click()
		},
		async handleFiles(files) {

			let allowedFiles = [];

			for (let file of [...files].slice(0, this.maxCount)) {
				if (this.allowedTypes.includes(file.type) && file.size <= this.maxSize) {
					
					file.preview = await this.previewFile(file)

					allowedFiles.push(file)
				}
			}

			if (allowedFiles.length) {
				// console.log(allowedFiles[0])
				this.$emit('input', allowedFiles[0].preview)
			} else {
				alert('Этот файл не годится')
			}
		},
		previewFile: file => new Promise((resolve, reject) => {
			let reader = new FileReader()

			reader.readAsDataURL(file)

			reader.onloadend = () => resolve(reader.result)
		}),
	},
	computed: {
		buttonStyle() {
			return { transform: `translate(${this.buttonOffset[0]}px, ${this.buttonOffset[1]}px)` }
		}
	},
}
</script>


<style lang="less" scoped>

@color-light: #EFEFEF;

.drop {
	position: relative;
	width: 100%;
	height: 100%;

	&.highlighted {
		&:before {
			opacity: .75;
		}
	}

	&.inverted {
		svg {
			fill: #FFF
		}
	}


	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		transition: opacity .2s;
		background: repeating-linear-gradient(
  			-45deg,
  			#FFF,
  			#FFF 10px,
  			@color-light 10px,
  			@color-light 20px
		);
	}
}

input {
	display: none;
}

button.upload {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 40px;
	height: 40px;
	opacity: 0;
	transition: opacity .2s;
	pointer-events: none;

	&.visible {
		opacity: .75;
		pointer-events: all;
	}

	&:hover {
		opacity: 1;
	}

	svg {
		width: 100%;
		fill: #333;
	}
}

span.placeholder {
	position: absolute;
	right: 20px;
	bottom: 15px;
	font-size: 14px;
	pointer-events: none;
	opacity: .75;
}

</style>
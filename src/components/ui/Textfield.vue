<template>
<textarea
	v-if="typeof this.onEnter === 'function'"
	v-model.trim="innerValue"
	:placeholder="placeholder"
	@keydown.enter.exact.prevent="handleEnter"
	@keydown.ctrl.enter="breakLine"
	rows='1'
	ref="node"
	:readonly="readonly"
/>
<textarea
	v-else
	v-model.trim="innerValue"
	:placeholder="placeholder"
	rows='1'
	ref="node"
	:readonly="readonly"
/>
</template>


<script>
import autosize from '@/utils/autosize'

export default {
	name: 'uiTextfield',
	props: {
		value: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		onResize: {
			type: Function,
		},
		onEnter: {
			type: Function,
		},
		minRows: {
			type: Number,
			default: 1,
		},
		readonly: {
			type: Boolean,
			default: false,
		}, 
	},
	data() {
		return {
			innerValue: this.value,
		}
	},
	mounted() {
		let node = this.$el

		autosize(node)

		node.addEventListener('autosize:resized', () => {
			if (typeof this.onResize === 'function') this.onResize()
		})
	},
	methods: {
		handleEnter() {
			if (typeof this.onEnter === 'function') {
				this.onEnter()
			}
		},
		breakLine() {
			this.innerValue += '\n'
		},
	},
	watch: {
		value(newVal) {
			this.innerValue = newVal

			this.$nextTick(() => autosize.update(this.$el))
		},
		innerValue(newVal) {
			if (!this.$refs['node']) return

			this.$emit('input', newVal)
		},
	},
}
</script>


<style lang="less" scoped>

@color-dark: #333;
@color-light: #EFEFEF;

.ui-textarea {
	display: flex;
}

textarea {
	resize: none;
	width: 100%;
	font-family: 'SF', sans-serif;
	font-size: 17px;
	line-height: 19px;
	padding: 6px 0;
	// overflow: auto;
	background: transparent;
	color: @color-dark;
	border: none;
	border-bottom: 1px solid;
	outline: none;
	overflow: hidden;
	box-sizing: border-box;

	&::placeholder {
		color: fade(@color-dark, 30%);
		transition: color .2s;
	}

	&:focus {
		&::placeholder {
			color: transparent;
		}
	}
}

</style>

<template>
<div class="ui-input">
	<input
		v-if="type === 'phone'"
		type="tel"
		v-mask="phoneMask"
		v-model="innerValue"
		:class="{ error }"
		:required="required"
	>
	<input
		v-else
		:type="type"
		v-model="innerValue"
		:class="{ error }"
		:maxlength="maxlength"
		:required="required"
		:spellcheck="spellcheck"
		@blur="onBlur"
	>
	<span class="placeholder">
		{{ error ? placeholderError : placeholder }}
	</span>
	<span class="line"/>
</div>
</template>


<script>
import Events from '@/events'

export default {
	name: 'uiInput',
	props: {
		value: {
			type: [String, Number],
		},
		type: {
			type: String,
			default: 'text',
		},
		error: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: ''
		},
		maxlength: {
			type: Number,
			default: 1000,
		},
		required: {
			type: Boolean,
			default: true,
		},
		spellcheck: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			innerValue: this.value,

			phoneMask: {
				mask:'+7 999 999 99 99',
				placeholder: ' ',
				showMaskOnHover: false,
			},
		}
	},
	methods: {
		onBlur() {
			if (this.type !== 'number') {
				this.innerValue = (this.innerValue + '').trim()
			}
		}
	},
	computed: {
		placeholderError() {
			return `Введите ${this.placeholder.toLowerCase()}`
		},
	},
	watch: {
		value(newVal) {
			if (this.type === 'number') {
				this.innerValue = +newVal
			} else {
				this.innerValue = newVal
			}
			
		},
		innerValue(newVal) {
			if (this.type === 'number') {	
				this.$emit('input', +newVal)
			} else {
				this.innerValue = +newVal
			}
		},
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'


.ui-input
	position relative
	width 100%
	margin 25px 0


input
	width 100%
	padding 6px 0
	color #333
	text-align left
	font-size 17px
	line-height 19px
	border-bottom 1px solid
	transition all .2s
	box-sizing border-box

	&.error
		color: #F00

		&~span.line
			background-color: alpha(#F00, .5)

		&~span.placeholder
			color: alpha(#F00, .5)

	&:focus
	&:valid
		&~span.line
			width 100%

		&~span.placeholder
			transform: translateY(-125%) scale(0.75)


span
	position absolute
	pointer-events none

	&.placeholder
		left: 0
		bottom: 8px
		font-size: 17px
		line-height: 1
		color: alpha(#333, .5)
		transition: all .2s, color .3s
		transform-origin: 0 0
		white-space: nowrap

	&.line
		left 0
		right 0
		bottom 0
		height 2px
		width 0
		margin auto
		background-color #333
		transition: width .3s, background-color .3s


</style>

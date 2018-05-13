<script>
import Events from '@/events'

export default {
	name: 'Count',
	props: {
		value: {
			type: Number,
			default: 1,
		},
		min: {
			type: Number,
			default: 1,
		},
		max: {
			type: Number,
			default: 99,
		},
		onLowest: {
			type: Function,
		}
	},
	data() {
		return {
			innerValue: this.value,
		}
	},
	methods: {
		decrease() {
			if (this.innerValue === this.min) return
			--this.innerValue
		},
		increase() {
			if (this.value === this.max) return
			++this.innerValue
		},
	},
	watch: {
		value(newVal) {
			this.innerValue = newVal
		},
		innerValue(newVal) {
			if (this.innerValue < this.min) this.innerValue = this.min
			if (this.innerValue >= this.max) this.innerValue = this.max

			this.$emit('input', this.innerValue);

			(this.onLowest) && (newVal === this.min) && (this.onLowest());
		}
	}
}
</script>


<template lang="pug">
	.count
		button(@click="decrease") -
		span {{ innerValue }}
		button(@click="increase") +
</template>


<style lang="stylus" scoped>

	@import '../styles/variables.styl'
	
	.count
		display inline-flex
		align-items center
		justify-content center
		color: #333;
		font-size: 16px;
		border: 1px solid #333
		border-radius: 6px

		&>*
			width 40px
			height 30px
			padding 0
			margin 0
			font-size 16px
			line-height 30px
			text-align center
			background-color transparent
			border none
			outline none
			user-select none

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button
				-webkit-appearance: none
				margin 0

</style>

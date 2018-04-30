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
		}
	},
	methods: {
		decrease() {
			if (this.value === 1) return
			--this.value
		},
		increase() {
			if (this.value === this.max - 1) return
			++this.value
		},
	},
	watch: {
		value() {
			if (this.value < this.min) this.value = this.min
			if (this.value > this.max) this.value = this.max
		}
	}
}
</script>


<template lang="pug">
	.count
		button(@click="decrease") -
		input(
			type="number"
			v-model="value"
			:min="min"
			:max="max"
		)
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

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button
				-webkit-appearance: none
				margin 0
		
		button
			user-select none


</style>

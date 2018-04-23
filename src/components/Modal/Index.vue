<script>
import Events from '@/events'
import Delivery from './Delivery'
import Payment from './Payment'
import Basket from './Basket'

export default {
	name: 'Modal',
	components: {
		Delivery,
		Payment,
		Basket,
	},
	data() {
		return {
			visible: false,
			section: '',
		}
	},
	created() {
		Events.$on('modal-open', ({ name }) => {
			this.section = name
			this.visible = true
		})
		Events.$on('modal-close', () => this.visible = false)
	},
	methods: {
		close: () => Events.$emit('modal-close')
	},
	watch: {
		'visible'(to, from) {
			this.$refs['content'] && to && (this.$refs['content'].scrollTop = 0)
		}
	}
}
</script>


<template lang="pug">
	.modal(:class="{ visible }")
		.overlay(@click="close")
		.content(ref="content")
			button.close(@click="close")
				img(src="../../assets/images/close.svg")

			delivery(v-if="section === 'delivery'")
			payment(v-if="section === 'payment'")
			basket(v-if="section === 'basket'")

</template>


<style lang="stylus" scoped>

	@import '../../styles/variables.styl'


	.modal
		position fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index 100
		pointer-events none

		&.visible
			pointer-events all
			.overlay
				opacity 1

			.content
				transform translate3d(0, 0, 0)

		.overlay
			position absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			background-color: alpha(#111, .5)
			opacity 0
			transition opacity .2s

		.content
			position absolute
			top 0
			bottom 0
			right 0
			width 100%
			padding 20px
			background-color #FFF
			transform translate3d(100%, 0, 0)
			transition transform .4s
			overflow-y auto

			@media (min-width 960px)
				width 500px
				padding 50px
		
		button.close
			position absolute
			top: 0
			right: 0
			width 50px
			height 50px
			background-color #333
			img
				width 35px

</style>
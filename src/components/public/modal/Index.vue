<script>
import Events from '@/events'
import { Tween, autoPlay } from 'es6-tween'
autoPlay(true)

import Delivery from './Delivery'
import Payment from './Payment'
import Basket from './Basket'
import About from './About'
import productDetails from './Details'

export default {
	name: 'Modal',
	components: {
		Delivery,
		Payment,
		Basket,
		About,
		productDetails,
	},
	data() {
		return {
			visible: false,
			formVisible: false,
			section: '',
		}
	},
	created() {
		Events.$on('modal-open', ({ name, productID }) => {
			this.section = name
			this.visible = true
		})
		Events.$on('modal-close', () => {
			this.visible = false
			this.formVisible = false
		})

		Events.$on('form-open', () => this.formVisible = true)
		Events.$on('form-close', () => this.formVisible = false)

		document.addEventListener('keyup', ({ keyCode }) => {
			keyCode === 27 && Events.$emit('modal-close')
		})
	},
	methods: {
		close: () => Events.$emit('modal-close')
	},
	watch: {
		'visible'(to, from) {
			this.$refs['content'] && to && (this.$refs['content'].scrollTop = 0)
		},
		'formVisible'(to, from) {
			if (to) {
				let node = this.$refs['content']

				new Tween({ height: node.scrollTop })
					.to({ height: node.scrollHeight }, 1000)
					.on('update', ({ height }) => node.scrollTop = height)
					.start()
			}
		},
	}
}
</script>


<template lang="pug">
	.modal(:class="{ visible }")
		.overlay(@click="close")
		.content(ref="content", :class="{ 'form-visible': formVisible }")
			button.close(@click="close")
				img(src="../../../assets/images/close.svg")

			delivery(:class="{ visible: section === 'delivery' }")
			payment(:class="{ visible: section === 'payment' }")
			basket(:class="{ visible: section === 'basket' }")
			about(:class="{ visible: section === 'about' }")
			product-details(:class="{ visible: section === 'details' }")

</template>


<style lang="stylus" scoped>
@import '../../../styles/variables.styl'

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
	transition all .2s

	@media (min-width: 960px)
		@supports (-webkit-backdrop-filter: blur(10px))
			-webkit-backdrop-filter: blur(10px)


.content
	position absolute
	top 0
	bottom 0
	right 0
	width 100%
	background-color #FFF
	transform translate3d(100%, 0, 0)
	transition transform .4s
	overflow-y auto

	&.form-visible
		overflow-y hidden

	section
		display none
		&.visible
			display block

	@media (min-width 960px)
		width 500px

	
button.close
	position absolute
	top: 0
	right: 0
	width 50px
	height 50px
	background-color #333
	z-index 1
	img
		width 35px


</style>
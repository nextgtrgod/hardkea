<template>
<aside>
	<router-link :to="{ name: 'List' }">
		<img src="../../assets/images/logo.svg">
	</router-link>
	<router-link :to="{ name: 'ProductList' }">
		<img src="../../assets/images/icons/product.svg">
	</router-link>
	<router-link
		:to="{ name: 'OrderList' }"
		class="orders"
		:data-label="newOrders"
	>
		<img src="../../assets/images/icons/order.svg">
	</router-link>
</aside>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'

export default {
	name: 'Aside',
	computed: {
		...mapState({
			newOrders: state => state.orders.length
		}),
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'


aside
	position fixed
	top 0
	left 0
	bottom 0
	width 50px
	flex-direction column
	background-color: #FFF
	box-shadow: -7px 0 40px alpha(#111, .1)


a
	position: relative
	display: inline-flex
	align-items: center
	justify-content: center
	width: 100%
	height: 50px
	margin-bottom: 5px
	transition: all .2s

	&:first-child
		margin-bottom: 40px

		img
			max-width: 40px


	&.router-link-active
	&:hover
		&:not(:first-child)
			background-color #EEE

	img
		max-width: 35px


a.orders
	&:after
		content: attr(data-label)
		position: absolute
		bottom: 0
		right: -2px
		width: 22px
		height: 22px
		font-size: 11px
		text-align: center
		line-height: 23px
		background-color: #333
		border-radius: 50%
		color: #FFF
		pointer-events: none


</style>

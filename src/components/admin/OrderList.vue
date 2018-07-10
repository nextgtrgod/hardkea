<template>
<div id="order-list" v-if="orders.length">
	<h2>Заказы</h2>

	<ul class="head">
		<li>#id</li>
		<li>Имя</li>
		<li>E-mail</li>
		<li>Телефон</li>
		<li>Адрес</li>
	</ul>

	<transition-group tag="ul" name="list" class="list">
		<li
			v-for="order in orders"
			:key="order.id"
			class="order"
		>
			<span>{{ order.orderID }}</span>
			<span>{{ order.username }}</span>
			<span>{{ order.email }}</span>
			<span>{{ order.phone }}</span>
			<span>{{ order.address }}</span>
		</li>
	</transition-group>
</div>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import uiDropdown from '@/components/ui/Dropdown'

export default {
	name: 'OrderList',
	components: {
		uiDropdown,
	},
	methods: {

	},
	computed: {
		...mapState({
			orders: state => state.orders
		}),
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#order-list
	opacity 0
	animation fade-in .4s forwards


h2
	font-size: 30px
	margin-bottom: 25px


ul.head
	display: flex
	align-items: center
	font-weight: bold

	li
		flex: 0 0 20%
		padding: 20px
		box-sizing: border-box


ul.list
	display: flex
	flex-direction: column

li.order
	display: inline-flex
	align-items: center
	height: 50px
	margin-bottom: 30px
	background-color: #FFF
	box-shadow: 0 4px 40px -10px rgba(0,0,0, .05)
	cursor: pointer

	&>span
		flex: 0 0 20%
		padding: 0 20px
		box-sizing: border-box


// transition-group
.order {
	transition: transform .4s, opacity .4s
}

.list-enter, .list-leave-to {
	transform: translateX(100%)
	opacity: 0
}


</style>

<template>
<div id="order-list" v-if="orders.length">
	<h2>Заказы</h2>

	<ul class="head grid">
		<li class="order-id">#id</li>
		<li class="status">Статус</li>
		<li class="price">Стоимость</li>
		<li>Имя</li>
		<li>E-mail</li>
		<li class="phone">Телефон</li>
		<li class="address">Адрес</li>
	</ul>

	<transition-group tag="ul" name="list" class="list">
		<order
			v-for="order in orders"
			:key="order.id"
			:id="order.id"
			class="order"
		/>
	</transition-group>
</div>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import Order from '@/components/admin/Order'
import uiDropdown from '@/components/ui/Dropdown'

import statuses from '../../../api/data/orderStatus'

export default {
	name: 'OrderList',
	components: {
		Order,
	},
	data() {
		return {
			statuses,
			expanded: null,
		}
	},
	methods: {
		openDetails(id) {
			this.expanded = id
		}
	},
	computed: {
		...mapState({
			orders: state => state.orders
		}),

		statusList() {
			return Object.values(this.statuses)
		},
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'
@import '../../styles/order.styl'


#order-list
	opacity 0
	animation fade-in .4s forwards


h2
	font-size: 30px
	margin-bottom: 25px


ul.head
	font-weight: bold
	font-family: $font.family.fira
	letter-spacing: .5px


ul.list
	display: flex
	flex-direction: column


// transition-group
.order {
	transition: transform .4s, opacity .4s
}

.list-enter, .list-leave-to {
	transform: translateX(100%)
	opacity: 0
}


</style>

<template>
<div id="order-list" v-if="orders.length">
	<h2>Заказы</h2>

	<div class="filter">
		<ui-dropdown
			v-model="statusName"
			:options="statusList"
			placeholder="Показать"
			class="dropdown"
		/>

		<ui-input
			placeholder="Поиск"
			v-model="search"
			class="field"
		/>
	</div>

	<ul class="head grid">
		<li class="order-id">#id</li>
		<li class="status">Статус</li>
		<li class="price">Стоимость</li>
		<li>Имя</li>
		<li>E-mail</li>
		<li class="phone">Телефон</li>
		<li class="date">Дата</li>
	</ul>

	<ul class="list">
		<order
			v-for="order in filteredOrders"
			:key="order.id"
			:id="order.id"
			class="order"
		/>
	</ul>
</div>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import Order from '@/components/admin/Order'
import uiInput from '@/components/ui/Input'
import uiDropdown from '@/components/ui/Dropdown'

import statuses from '../../../api/data/orderStatus'

export default {
	name: 'OrderList',
	components: {
		Order,
		uiDropdown,
		uiInput,
	},
	data() {
		return {
			statuses,
			search: '',
			status: 0,
			statusName: 'Все',
		}
	},
	methods: {

	},
	computed: {
		...mapState({
			orders: state => state.orders
		}),

		filteredOrders() {
			let q = this.search.toLowerCase()
			
			return this.orders.filter(({ orderID, username, email, phone, address, status }) => {
				return (orderID.includes(q) ||
					username.toLowerCase().includes(q) ||
					email.includes(q) ||
					phone.includes(q) ||
					address.toLowerCase().includes(q)) &&
					(this.status !== 0 ? status === this.status : true)
			}).sort((a, b) => b.created_at - a.created_at)
		},

		statusList() {
			let list = Object.values(this.statuses)

			list.push('Все')

			return list
		},

	},
	watch: {
		// search(to, from) {
		// 	console.log(to)
		// },

		statusName() {
			this.status = this.statusName === 'Все'
				? 0
				: +Object.keys(this.statuses).find(key => this.statuses[key] === this.statusName)
		},
	},
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


.filter
	display: flex
	align-items: center
	margin: 40px 0
	margin-bottom: 40px

	.field
		margin: 0 30px
		width: 220px

	.dropdown
		width: 150px


ul.head
	font-weight: bold
	font-family: $font.family.fira
	letter-spacing: .5px


ul.list
	display: flex
	flex-direction: column


// transition-group
.order
	transition: transform .4s, opacity .4s

.list-enter
.list-leave-to
	transform: translateX(100%)
	opacity: 0


</style>

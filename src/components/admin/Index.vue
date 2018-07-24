<template>
<div id="admin">
	<template v-if="auth">
		<aside-menu/>

		<main>
			<router-view/>
		</main>

		<modal/>

		<ui-spinner v-if="loading" class="loading"/>
	</template>
</div>
</template>


<script>
import Events from '@/events'
import Store from '@/store'

import AsideMenu from '@/components/admin/Aside'
import Modal from '@/components/admin/Modal'
import uiSpinner from '@/components/ui/Spinner'

import login from '@/utils/login'

export default {
	name: 'Admin',
	components: {
		AsideMenu,
		Modal,
		uiSpinner,
	},
	data() {
		return {
			auth: false,
			loading: false,
		}
	},
	async created() {

		let res = await login()

		this.auth = res.auth

		if (!this.auth) {
			this.$router.replace({ name: 'Auth' })
			return
		}

		Events.$on('logout', () => {
	
			localStorage.removeItem('token')

			this.$router.replace({ name: 'Auth' })
		})

		Events.$on('api-loading', () => this.loading = true)
		Events.$on('api-loaded', () => this.loading = false)

		await Store.dispatch('loadOrders')
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#admin
	position: relative
	min-height: 100vh

main
	position: relative
	left: 50px
	width: calc(100% - 50px)
	// min-width: 1090px
	padding: 30px
	padding-bottom: 0
	box-sizing: border-box

.loading
	position: absolute
	right: 10px
	bottom: 10px

</style>

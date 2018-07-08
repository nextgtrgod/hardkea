<template>
<div id="admin">
	<aside-menu/>

	<main>
		<router-view/>
	</main>

	<modal/>

	<ui-spinner v-if="loading" class="loading"/>
</div>
</template>


<script>
import Events from '@/events'
import AsideMenu from '@/components/admin/Aside'
import Modal from '@/components/admin/Modal'
import uiSpinner from '@/components/ui/Spinner'

export default {
	name: 'Admin',
	components: {
		AsideMenu,
		Modal,
		uiSpinner,
	},
	created() {
		Events.$on('api-loading', () => this.loading = true)
		Events.$on('api-loaded', () => this.loading = false)
	},
	data() {
		return {
			loading: false,
		}
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#admin
	position: relative

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

<template>
<div id="public">
	<aside-menu/>

	<main>
		<router-view/>
	</main>

	<modal/>
</div>
</template>


<script>
import Events from '@/events'
import AsideMenu from '@/components/public/Aside'
import Modal from '@/components/public/Modal'

export default {
	name: 'Public',
	components: {
		AsideMenu,
		Modal,
	},
	data() {
		return {
			scrollPos: 0,
		}
	},
	watch: {
		'$route'(to, from) {
			if (from.name === 'List' && to.name === 'Product') {
				this.scrollPos = document.body.scrollTop
				document.body.scrollTop = 0
			}
			if (from.name === 'Product' && to.name === 'List') {
				document.body.scrollTop = this.scrollPos
			}
		}
	}
}
</script>


<style lang="stylus">

main
	@media (min-width 960px)
		width: calc(100% - 50px) // menu width

</style>

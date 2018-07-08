<template>
<div id="admin">
	<aside-menu/>

	<main>
		<router-view/>
	</main>

	<modal/>
</div>
</template>


<script>
import Events from '@/events'
import AsideMenu from '@/components/admin/Aside'
import Modal from '@/components/admin/Modal'

export default {
	name: 'Admin',
	components: {
		AsideMenu,
		Modal,
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

main
	position: relative
	left: 50px
	width: calc(100% - 50px)
	// min-width: 1090px
	padding: 30px
	padding-bottom: 0
	box-sizing: border-box

</style>

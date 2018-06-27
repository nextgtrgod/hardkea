<template>
<div id="admin">
	<aside-menu/>
	<main>
		<router-view/>
	</main>
</div>
</template>


<script>
import Events from '@/events'
import AsideMenu from '@/components/admin/Aside'

export default {
	name: 'Admin',
	components: {
		AsideMenu,
	},
	created() {
		this.$router.replace({ name: 'ProductList' }) // temp
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

main
	position: relative
	left: 50px
	width: calc(100% - 60px)
	padding: 30px
	padding-bottom: 0
	box-sizing: border-box

</style>

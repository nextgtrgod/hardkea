<template>
<div id="app">

	<ui-spinner v-if="!loaded" class="preload"/>
	<router-view v-else/>

</div>
</template>


<script>
import Events from '@/events'
import Store from '@/store'
import uiSpinner from '@/components/ui/Spinner'

// import obj from '../backup/orders.js'
// console.log(JSON.stringify(obj))

export default {
	name: "App",
	components: {
		uiSpinner
	},
	data() {
		return {
			loaded: false,
		}
	},
	async mounted() {

		await Store.dispatch('loadProducts')
		// await Store.dispatch('loadCategories')
		this.loaded = true

	},
}
</script>


<style lang="stylus">
@import './styles/normalize.styl'
@import './styles/fonts.styl'
@import './styles/variables.styl'

body
	font-family: $font.family.default
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	color: $color.dark
	background-color: #EEE

	-ms-overflow-style: none
	// overflow: -moz-scrollbars-none

	&::-webkit-scrollbar
		display: none


h1, h2, h3
	font-family: $font.family.fira

.preload
	position: absolute !important
	top: 0
	left: 0
	right: 0
	bottom: 0
	margin: auto

</style>

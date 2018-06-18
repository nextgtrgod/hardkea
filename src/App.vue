<template>
<div id="app">
	<router-view/>
</div>
</template>


<script>
export default {
	name: "App",
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

h1, h2, h3
	font-family: $font.family.fira

</style>

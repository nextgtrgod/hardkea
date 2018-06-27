<template>
<div id="product">
	<h2>Тут товар #{{ $route.params.id }}</h2>
</div>
</template>


<script>
export default {
	name: 'ProductList'
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#product
	opacity 0
	animation fade-in .4s forwards

</style>
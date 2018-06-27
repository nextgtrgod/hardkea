<template>
<div id="order">
	<h2>Тут заказ #{{ $route.params.id }}</h2>
</div>
</template>


<script>
export default {
	name: 'Order'
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#order
	opacity 0
	animation fade-in .4s forwards

</style>
<template>
<div id="order-list">
	<h2>Заказы</h2>
</div>
</template>


<script>
export default {
	name: 'OrderList'
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#order-list
	opacity 0
	animation fade-in .4s forwards

</style>

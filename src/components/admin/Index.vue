<template>
<div id="admin">
	<h2>Админочка</h2>
	<router-link to='admin/products'>Товары</router-link>
	<br>
	<router-link to='admin/orders'>Заказы</router-link>
	<router-view/>
</div>
</template>


<script>
export default {
	name: 'Admin',
}
</script>


<style lang="stylus" scoped>

a.active
	border-bottom 1px solid
	

</style>

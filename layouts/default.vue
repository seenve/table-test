<template>
	<div class="layout">
		<Nuxt />
	</div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.layout {
	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
		section {
			width: 100%;
		}
	}
}
</style>
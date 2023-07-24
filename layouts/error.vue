<template>
	<section>
		<blocks-header></blocks-header>
		<main>
			<base-breadcrumbs :items="items" :title="''"></base-breadcrumbs>
			<section class="error">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<h1 class="mb-4">{{error.statusCode}}</h1>
							<p>{{error.message}}</p>
						</div>
					</div>
				</div>
			</section>
		</main>
		<blocks-footer></blocks-footer>
	</section>
</template>
<script>
export default {
	layout: "clear",
	props: ["error"],
};
</script>
<style lang="scss" scoped>
.error {
	background-color: $color-7;
	min-height: calc(100vh - 320px - 227px + 10px);
	padding: 50px 0;
	h1,
	p {
		color: $text-color-primary-i;
	}
}
</style>
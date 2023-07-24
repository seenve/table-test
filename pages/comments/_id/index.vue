<template>
	<main>
		<section class="article pb-s pt-s">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<div class="article__loading" v-if="$fetchState.pending">
							<div class="loading x3"></div>
						</div>
						<div class="article__body" v-else>
							<article>
								<h1 class="article__title mb-5">{{article.name}}</h1>
								<div class="article__content" v-html="$md.render(article.body)"></div>
							</article>
							<p class="article__info">Comment №{{article.id}} under post #{{article.postId}} by {{article.email}}</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<nuxt-link :to="prevUrl" class="btn btn-primary mt-5">
							<base-icon name="arrow-left" class="icon me-2"></base-icon>
							<span>Вернуться назад</span>
						</nuxt-link>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script>
export default {
	//head()
	data() {
		return {
			article: {
				postId: 0,
				id: 0,
				name: "",
				email: "",
				body: "",
			},
		};
	},
	computed: {
		prevUrl() {
			let url = "/";
			if (process.client) {
				url = localStorage.getItem("url_prev")
					? localStorage.getItem("url_prev")
					: "/";
			}
			return url;
		},
	},
	async fetch() {
		await this.$axios
			.get(`${this.$nuxt.$route.path}`)
			.then((res) => {
				this.article = res.data;
			})
			.catch((e) => {
				console.log(e);
				error({ statusCode: 404, message: "Post not found" });
			});
	},
	fetchOnServer: true,
};
</script>
<style lang="scss" scoped>
.article {
	&__title {
		&:first-letter {
			text-transform: capitalize;
		}
	}
	&__content {
		padding: 30px;
		background: linear-gradient(10deg, $color-4, $color-5, $color-4);
		color: $color-7;
		border-radius: 8px;
		border-bottom-left-radius: 0px;
		line-height: 22px;
		box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
		&:first-letter {
			text-transform: capitalize;
		}
	}
	&__info {
		display: inline-flex;
		padding: 10px 20px;
		font-size: 14px;
		line-height: 18px;
		background: linear-gradient(0deg, $color-5, $color-4);
		color: $color-7;
		opacity: 0.5;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		margin-right: 50px;
	}
	&__loading {
		background: linear-gradient(10deg, $color-4, $color-5, $color-4);
		width: 100%;
		min-height: 150px;
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
}
</style>
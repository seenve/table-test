<template>
	<main>
		<section class="table-section pt-s pb-s">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<h1 class="title pb-s">Comments List</h1>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<table class="table">
							<thead>
								<tr>
									<th>
										<base-sort class="table__sort" name="id">
											<span>ID</span>
										</base-sort>
									</th>
									<th>
										<base-sort class="table__sort" name="name">
											<span>Name</span>
										</base-sort>
									</th>
									<th>
										<base-sort class="table__sort" name="email">
											<span>E-mail</span>
										</base-sort>
									</th>
								</tr>
							</thead>
							<tbody v-if="$fetchState.pending">
								<template v-for="(item, i) in pageItems">
									<tr :key="`comment-loading${i}`" class="table__loading">
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
								</template>
							</tbody>
							<tbody v-else>
								<template v-for="(comment, i) in comments">
									<tr :key="`comment-${i}`">
										<!-- В задании указано "при клике на строку с записей, открывать новую страницу..." target="_blank" ? Оставил без него :) -->
										<td>
											<nuxt-link :to="`/comments/${comment.id}`" :key="`comment-${i}`" :title="`Comment ID`">{{comment.id}}</nuxt-link>
										</td>
										<td>
											<nuxt-link :to="`/comments/${comment.id}`" :key="`comment-${i}`" :title="`Comment Name`">{{comment.name}}</nuxt-link>
										</td>
										<td>
											<nuxt-link :to="`/comments/${comment.id}`" :key="`comment-${i}`" :title="`Comment E-mail`">{{comment.email}}</nuxt-link>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
		<section class="pagination">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<base-pagination v-if="comments.length > 0" v-show="totalPages > 1" :current="typeof $route.query.page === 'undefined' ? 1:parseInt($route.query.page)" :total="totalPages"></base-pagination>
						<h5 v-else>По вашему запросу ничего не найдено.</h5>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script>
export default {
	data() {
		return {
			comments: [
				{
					id: 1,
					name: "Seenve",
					email: "seenve@example.com",
				},
			],
			totalPages: 1,
			pageItems: 10,
		};
	},
	watch: {
		$route(to, from) {
			this.$fetch();
		},
	},
	beforeRouteLeave(to, from, next) {
		if (process.client) {
			localStorage.setItem("url_prev", from.fullPath);
		}
		next();
	},
	computed: {
		query() {
			let query = {};
			query._limit = this.pageItems;
			if (typeof this.$nuxt.$route.query.page != "undefined") {
				query._page = this.$nuxt.$route.query.page;
			}
			if (typeof this.$nuxt.$route.query.sort != "undefined") {
				query._sort = this.$nuxt.$route.query.sort.replace(
					/\-|\$/g,
					""
				);
				if (this.$nuxt.$route.query.sort.indexOf("-") == -1) {
					query._order = "asc";
				} else {
					query._order = "desc";
				}
			}
			return query;
		},
	},
	async fetch() {
		await this.$axios
			.get(`/comments/?${new URLSearchParams(this.query).toString()}`)
			.then((res, req, headers) => {
				this.comments = res.data;
				this.totalPages = res.headers["x-total-count"]/this.pageItems;
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
.title {
	font-size: 50px;
	font-weight: 900;
	font-family: $font-primary;
}
.table {
	width: 100%;
	box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
	thead {
		padding-bottom: 10px;
		tr {
			th {
				border-right: 1px solid rgba(0, 0, 0, 0.2);
				background-color: #222;
				&:first-child {
					border-top-left-radius: 8px;
				}
				&:last-child {
					border-top-right-radius: 8px;
				}
			}
		}
	}
	tbody {
		position: relative;
		overflow: hidden;
		tr {
			position: relative;
			background-color: $color-4;
			overflow: hidden;
			td {
				border-right: 1px solid rgba(0, 0, 0, 0.1);
				a {
					display: flex;
					padding: 12px 20px;
					font-size: 15px;
					font-weight: 400;
					font-family: $font-default;
					color: #bbb;
				}
			}
			&:nth-child(2n) {
				background-color: $color-5;
			}
			&:last-child {
				td {
					&:first-child {
						border-bottom-left-radius: 8px;
					}
					&:last-child {
						border-bottom-right-radius: 8px;
					}
				}
			}
			&:hover {
				background-color: $color-3;
				td {
					a {
						color: $color-7;
					}
				}
			}
		}
	}
	tfoot {
		tr {
			background-color: #222;
			padding: 8px 12px;
			th {
				font-size: 13px;
				font-weight: 400;
				font-family: $font-default;
			}
		}
	}
	&__loading {
		td {
			padding: 11px 20px;
			position: relative;
			&:before {
				opacity: 0.05;
				display: inline-flex;
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(
					110deg,
					rgba(255, 255, 255, 0) 8%,
					rgba(255, 255, 255, 1) 18%,
					rgba(255, 255, 255, 0) 33%
				);
				background-size: 200% 100%;
				animation: 1.5s shine linear infinite;
			}
		}
	}
	&__sort {
		display: flex;
		justify-items: center;
		justify-content: flex-start;
		padding: 16px 20px;
		span {
			display: inline-flex;
			text-align: left;
			font-size: 15px;
			font-weight: 700;
			font-family: $font-default;
			color: $color-7;
			margin-right: 15px;
		}
	}
}
</style>
<template>
	<ul class="pagination" v-if="total > 1">
		<li v-if="current != 1">
			<nuxt-link class="pagination__link" :to="`${url}&page=1`">
				<base-icon name="angles-left" class="icon"></base-icon>
			</nuxt-link>
		</li>
		<li v-if="current != 1">
			<nuxt-link class="pagination__link" :to="`${url}&page=${current-1}`">
				<base-icon name="angle-left" class="icon"></base-icon>
			</nuxt-link>
		</li>
		<li v-if="current - 1 > 0">
			<nuxt-link class="pagination__link" :to="`${url}&page=${current-1}`">{{current-1}}</nuxt-link>
		</li>
		<li>
			<nuxt-link class="pagination__link current" :to="`${url}&page=${current}`">{{current}}</nuxt-link>
		</li>
		<li v-if="current + 1 <= total">
			<nuxt-link class="pagination__link" :to="`${url}&page=${current+1}`">{{current+1}}</nuxt-link>
		</li>
		<li v-if="current != total">
			<nuxt-link class="pagination__link" :to="`${url}&page=${current+1}`">
				<base-icon name="angle-right" class="icon"></base-icon>
			</nuxt-link>
		</li>
		<li v-if="current != total">
			<nuxt-link class="pagination__link" :to="`${url}&page=${total}`">
				<base-icon name="angles-right" class="icon"></base-icon>
			</nuxt-link>
		</li>
	</ul>
	<ul class="pagination" v-else>
		<li>
			<nuxt-link class="pagination__link current" :to="`${url}&page=${current}`">{{current}}</nuxt-link>
		</li>
		<li>
			<a href="#" class="pagination__link disabled">></a>
		</li>
	</ul>
</template>
<script>
export default {
	props: {
		total: {
			type: Number,
			default: () => 0,
		},
		current: {
			type: Number,
			default: () => 1,
		},
	},
	methods: {
		serialize(obj = null, exclude = Array, clear = false) {
			var str = [];
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					for (let index = 0; index < exclude.length; index++) {
						if (p !== exclude[index]) {
							if (clear) {
								if (obj[p] !== null) {
									str.push(
										encodeURIComponent(p) +
											"=" +
											encodeURIComponent(obj[p])
									);
								}
							} else {
								str.push(
									encodeURIComponent(p) +
										"=" +
										encodeURIComponent(obj[p])
								);
							}
						}
					}
				}
			}
			return str.join("&");
		},
	},
	computed: {
		url() {
			let url = this.$route.path;
			url += "?";
			url += this.serialize(this.$route.query, ["page"], true);
			return url;
		},
	},
};
</script>
<style lang="scss" scoped>
.pagination {
	background: transparent;
	display: flex;
	flex-wrap: wrap;
	user-select: none;
	li {
		margin-right: 9px;
	}
	&__link {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 35px;
		height: 35px;
		line-height: 32px;
		font-size: 15px;
		font-weight: 700;
		font-family: $font-primary;
		border: 2px solid $color-5;
		border-radius: 8px;
		text-align: center;
		color: $color-6;
		.icon {
			display: inline-flex;
			:deep() svg {
				fill: $color-6;
				max-width: 14px;
				max-height: 14px;
			}
		}
		&:hover {
			border-color: $color-5;
			color: $color-7;
			background-color: $color-5;
			.icon {
				:deep() svg {
					fill: $color-7;
				}
			}
		}
		&.current {
			background-color: $color-1;
			border-color: $color-1;
			color: $color-7;
		}
		&.disabled {
			color: $color-6;
			border: 1px solid #d6d6d6;
			background-color: #f6f6f6;
			cursor: default;
			opacity: 0.5;
		}
	}
}
</style>
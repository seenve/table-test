<template>
	<nuxt-link :to="`${url}&sort=${sort.query}`" class="sort" :class="{active: sort.active, invert: sort.active && sort.invert}">
		<slot />
		<base-icon name="arrow-up-short-wide" class="icon"></base-icon>
	</nuxt-link>
</template>
<script>
export default {
	props: {
		name: {
			type: String,
			default: () => "",
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
		sort() {
			let sort = "";
			let active = false;
            let invert = false
			if (typeof this.$route.query.sort != "undefined") {
				if (this.$route.query.sort.indexOf("-") != -1) {
					sort = `${this.name}`;
                    invert = true;
				} else {
					sort = `-${this.name}`;
				}
				if (this.$route.query.sort.replace(/\-|\$/g, "") == this.name) {
					active = true;
				}
			} else {
				sort = `-${this.name}`;
			}
			return { query: sort, active: active, invert: invert};
		},
		url() {
			let url = this.$route.path;
			url += "?";
			url += this.serialize(this.$route.query, ["sort"], true);
			return url;
		},
	},
};
</script>
<style lang="scss" scoped>
.sort {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	.icon {
		:deep() svg {
			opacity: 0.25;
			fill: $color-7;
			max-width: 16px;
			max-height: 16px;
		}
	}
	&.active {
		.icon {
			:deep() svg {
				opacity: 1;
			}
		}
	}
    &.invert {
        .icon {
            :deep() svg {
                transform: rotate(180deg);
            }
        }
    }
}
</style>
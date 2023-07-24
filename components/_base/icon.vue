<template>
	<div v-html="src"></div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: () => "solid/user",
        },
        type: {
            type: String,
            default: () => "font-awesome",
        },
    },
    data() {
        return {
            icon: null
        }
    },
    mounted() {
        //const src = require(`~/assets/icons/${this.type}/${this.name.split('/')[0]}/${this.name.split('/')[1]}.svg?raw`)
        //this.icon = src
        //console.log(this.name.split('/')[0]+'/'+this.name.split('/')[1]);
    },
    computed: {
        src() {
            const src = require(`assets/icons/ui/${this.name}.svg?raw`)
            return src
        }
    }
}
</script>
<style lang="scss" scoped>
:deep() svg {
	max-width: 20px;
	max-height: 20px;
	width: 100%;
	height: auto;
}
</style>
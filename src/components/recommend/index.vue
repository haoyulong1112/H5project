<template>
  <div :class="$style.recommendComp">
    商城推荐 todo
  </div>
</template>

<script>
/*
@props
*/
const userAvatar = config.userAvatar
export default {
    name: 'recommend',
    props: {
        recommendData: {
            type: Array,
            default (data) {
                return data || []
            }
        }
    },
    data () {
        return {
            userAvatar
        }
    }
}
</script>

<style lang="stylus" module>
@import '~@/assets/style/mixins.styl'
.recommend-comp
    font-family PingFangSC-Regular

</style>

<template>
  <div :class="$style.star">
    <span v-for="(item, index) in starList" :key="`a${index}`" :class="{half: item.half}">
        <img :style="propStyle" src="@static/images/icons/star.png">
    </span>
  </div>
</template>

<script>
/*
@props
score 分数
width 星星宽度
margin 间距
注意：分数不为整数，会向上取整
*/
export default {
    name: 'star',
    props: {
        score: {
            type: Number,
            default: 0
        },
        width: {
            type: String,
            default: '0.22rem'
        },
        margin: {
            type: String,
            default: '0.04rem'
        }
    },
    computed: {
        starList () {
            let ret = []
            if (this.score) {
                for (let i = 1; i < Math.ceil(this.score) + 1; ++i) {
                    ret.push({
                        half: i > this.score
                    })
                }
            }
            return ret
        },
        propStyle () {
            return {
                width: this.width,
                marginRight: this.margin
            }
        }
    }
}
</script>

<style lang="stylus" module>
.star > span
    display inline-block

</style>

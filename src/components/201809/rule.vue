<template>
    <!-- 弹窗组件 -->
    <mt-popup v-model="showPopup" zIndex="990">
        <div class="rule-popup">
            <div @click="showPopup = false" class="rule-btn">
                <img src="@static/images/icons/clear.png">
            </div>
            <div class="rule-content">
                <div class="rule-title">
                    <div>活动规则</div>
                </div>
                <div class="rule-text" v-html="text"></div>
            </div>
        </div>
    </mt-popup>
</template>

<script>
/*
@props
text 富文本内容
*/
import Vue from 'vue'
import { Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)

export default {
    name: 'rule',
    props: {
        text: {
            type: String,
            default: ''
        },
        value: {
            default: false
        }
    },
    watch: {
        showPopup (val) {
            this.$emit('input', val)
        },
        value (val) {
            this.showPopup = val
        }
    },
    data () {
        return {
            showPopup: false
        }
    }
}
</script>

<style lang="stylus">

@import '~@/assets/style/mixins.styl'

// 重置popup组件默认样式
.v-modal
    opacity 0.7
.mint-popup
    background none!important
.rule-popup
    width 5.4rem
.rule-btn
    display flex
    justify-content flex-end
    margin-bottom 0.3rem
    > img
        width 0.43rem
        height 0.43rem
.rule-content
    max-height 8rem
    -webkit-overflow-scrolling touch
    overflow auto
    background #fff
    border-radius 0.2rem
    &::-webkit-scrollbar
        display none
.rule-title
    display flex
    justify-content center
    align-items center
    height 1.1rem
    font-size 0.32rem
    color #333
    font-Medium-bold()
    &:before
        margin-right 0.3rem
        content ''
        width 1rem
        height 0.51rem
        background-image url('~@static/images/201809/bargainshare/title-left.png')
        background-size 100%
    &:after
        margin-left 0.3rem
        content ''
        width 0.75rem
        height 0.47rem
        background-image url('~@static/images/201809/bargainshare/title-right.png')
        background-size 100%
.rule-text
    padding 0 0.3rem 0.6rem 0.3rem
    font-size 0.28rem
    color #2a2a2a
    line-height 0.48rem

</style>

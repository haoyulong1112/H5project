<template>
    <div class="contBox" v-show="showRule">
        <div class="bgcBox">
            <img class="imgurl" :src="imgurl" alt="">
            <img class="topimg" v-show="topimgshow" :src="topimg" alt="">
            <img class="iconimg" v-show="iconimgshow" :src="iconimg" alt="">
            <div class="popuptext" v-html="popuptext" v-show="popuptextshow"></div>
            <div class="rule-text" v-show="textshow" v-html="text"></div>
            <input v-show="inputShow" v-model="inputText" class="input" type="text" :placeholder="plseholder">
            <div class="close-rule" @click="closeRule">
                <img src="http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15592161700835064788.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
/*
@props
imgurl 弹窗的背景图
topimg 和 iconimg 为弹窗的顶部图 可通过topimgshow 或者 iconimgshow 来控制显示隐藏
popuptext 是字数较少弹窗文案 popuptextshow控制显示隐藏
text 是 字数较多的弹窗文案 textshow 控制显示隐藏
*/

export default {
    name: 'rule',
    data () {
        return {
            inputText: ''
        };
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        textshow: {
            default: false
        },
        showRule: {
            default: false
        },
        imgurl: {
            default: 'http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/html5/15592143041935800891.png'
        },
        topimg: {
            default: ''
        },
        iconimg: {
            default: ''
        },
        popuptext: {
            default: ''
        },
        plseholder: {
            default: '请输入宠物名字'
        },
        popuptextshow: {
            default: false
        },
        inputShow: {
            default: false
        },
        topimgshow: {
            default: false
        },
        iconimgshow: {
            default: false
        }
    },
    methods: {
        closeRule () {
            this.$emit('closeRule');
            this.$emit('getInput', {
                inputText: this.inputText
            })
        }
    }
}
</script>

<style lang="stylus">

@import '~@/assets/style/mixins.styl'
.contBox
    position fixed;
    top:0;
    left:0;
    width 100%;
    height 100%;
    // display:none;
    background-color rgba(0,0,0,0.5)
.bgcBox
    position absolute;
    top:2.6rem;
    left:50%;
    margin-left: -3.2rem;
    width 6.4rem;
    height 6rem;
    > .imgurl
        width 100%;
        height 100%;
    > .topimg
        width 2.9rem;
        height 1.8rem;
        display inline-block;
        position absolute;
        top: -0.25rem;
        left: 50%;
        margin-left -1.45rem;
    > .iconimg
        width 1.76rem;
        height 1.87rem;
        display inline-block;
        position absolute;
        top: -0.25rem;
        left: 50%;
        margin-left -0.88rem;
    > .rule-text
        position absolute;
        top:1.53rem;
        width 5rem;
        height 2.85rem;
        left 50%;
        margin-left: -2.5rem;
        overflow-y scroll;
        ont-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #000000;
        letter-spacing: 0;
        line-height: 0.48rem;
    > .popuptext
        position absolute;
        top:2.53rem;
        width 4.67rem;
        left 50%;
        margin-left: -2.335rem;
        ont-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #000000;
        letter-spacing: 0;
        line-height: 0.48rem;
        text-align center;
    > .close-rule
        width 3rem;
        height 0.94rem;
        position absolute;
        bottom 0.35rem;
        left: 50%;
        margin-left: -1.5rem;
        > img
            width 100%;
            height 100%;
    .input
        display:inline-block;
        position: absolute;
        width 2.8rem;
        height 0.56rem;
        top 2.5rem;
        left 50%;
        margin-left -1.4rem;
        background-color #a77437;
        font-family: PingFangSC-Semibold;
        font-size: 0.4rem;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align center;
.input::-webkit-input-placeholder
        color: #FFFFFF!important;

</style>

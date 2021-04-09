<template>
    <div class="toastbox" :style="top" v-show="showRule">
        <div class="toast" :style="bgc">{{text}}</div>
    </div>
</template>
<script>
export default {
    name: 'showtoast',
    data () {
        return {
            showRule: false
        }
    },
    created () {
        // this.showtime();
    },
    methods: {
        showtime () {
            this.showRule = true;
            setTimeout(() => {
                if (this.showRule) {
                    this.showRule = false
                }
            }, 2000)
        }
    },
    props: {
        text: {
            type: String,
            default: '请注意格式'
        },
        bgc: {
            type: String,
            default: 'background-color: #000; color: #fff;opacity: 0.8;'
        },
        height: {
            type: Number,
            default: 1.4
        },
        top: {
            type: String,
            default: 'top: 5rem;'
        }
    }
}
</script>
<style scoped lang="stylus">
@import '~@/assets/style/mixins.styl'
    .toastbox
        position fixed;
        // top: 4rem;
        left: 50%;
        margin-left -3.35rem;
        z-index 999;
        > .toast
            width: 6.7rem;
            height: 1.4rem;
            line-height: 1.4rem;
            border-radius: 0.2rem;
            // opacity: 0.8;
            // background-color: #000;
            // color: #fff;
            font-size: 0.36rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            text-align center;
</style>

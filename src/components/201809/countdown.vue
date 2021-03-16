<template>
    <div :style="style" :class="$style.countdown" v-html="countDownTip"></div>
</template>

<script>
/*
@props
milliseconds 剩余时间
speed 速度
text 文案（后过期，加速砍起来~)(后结束)
fontSize 字体大小
color 字体颜色
*/
export default {
    name: 'countdown',
    props: {
        milliseconds: {
            type: Number,
            default: 0
        },
        speed: {
            type: Number,
            default: 1000
        },
        text: {
            type: String,
            default: '后结束'
        },
        fontSize: {
            type: String,
            default: '0.24rem'
        },
        color: {
            type: String,
            default: '#3A3636'
        }
    },
    data () {
        return {
            countdown: this.milliseconds,
            countDownTip: ''
        }
    },
    computed: {
        style () {
            return {
                fontSize: this.fontSize,
                color: this.color
            }
        }
    },
    created () {
        this.loop()
    },
    methods: {
        loop () {
            if (this.countdown > this.speed) {
                // 倒计时不小于最小单位且循环开关未关闭 开启倒计时循环
                setTimeout(() => {
                    this.countdown -= this.speed
                    this.loop()
                }, this.speed)
            } else {
                this.countdown = 0
                // 倒计时结束
                this.$emit('over')
            }
            const times = [parseInt(this.countdown / 1000 / 60 / 60), parseInt(this.countdown / 1000 / 60 % 60), parseInt(this.countdown / 1000 % 60)]
            for (let i = 0, len = times.length; i < len; ++i) {
                times[i] = times[i] > 9 ? `${times[i]}` : `0${times[i]}`
            }
            const hour = times[0]
            const minute = times[1]
            const second = times[2]
            // 倒计时提示文案
            this.countDownTip = this.countdown ? `<span>${hour}</span>&nbsp;:&nbsp;<span>${minute}</span>&nbsp;:&nbsp;<span>${second}</span>${this.text}` : ''
        }
    }
}
</script>

<style lang="stylus" module>
.countdown
    display flex
    justify-content center
    align-items center
    > span
        display flex
        justify-content center
        align-items center
        width 0.5rem
        height 0.34rem
        border-radius 0.04rem
        background #3A3636
        color #fff
    > span:last-of-type
        margin-right 0.1rem
</style>
